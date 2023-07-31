import {
    DocumentType,
    PropType,
    defaultClasses,
    getModelForClass,
    modelOptions,
    mongoose,
    post,
    pre,
    prop,
} from '@typegoose/typegoose';
import '@/lib/mongodb'; // Importing library to connect to MongoDB
import { ItemClass } from './Item';
import type { LocalizedString } from '@/lib/i18n-config';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export type SimpleCategory = {
    _id: string;
    name: LocalizedString;
    slug: string;
    index?: number;
    depth?: number;
    items?: ItemClass[];
    image?: string;
};

@pre<CategoryClass>('save', function (next) {
    this.slug = slugify(this.name.get('en') ?? this._id.toString(), {
        lower: true,
    });
    next();
})
@post<CategoryClass>('save', () => {
    revalidatePath('/[lang]');
})
@modelOptions({
    schemaOptions: {
        /**
         * Used by API
         */
        toJSON: {
            transform: (_doc, ret) => {
                delete ret.__v;
                ret._id = ret._id.toString();
            },
        },
        /**
         * Used for generating static pages
         */
        toObject: {
            transform: (_doc, ret) => {
                delete ret.__v;
                ret._id = ret._id.toString();
                delete ret.id;
            },
        },
    },
})
export class CategoryClass implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;
    public id!: string;

    public static fields = ['name', 'index', 'slug', 'items', 'depth'];

    @prop({ type: () => String }, PropType.MAP)
    public name!: LocalizedString;

    @prop({ required: true, unique: true, index: true })
    public slug!: string;

    @prop()
    public image?: string;

    /**
     * More like priority actually. Higher index means higher priority, so it's on the top of the screen. Bottom is always 0.
     */
    @prop({ default: 0 })
    public priority?: number;

    @prop({ type: () => [ItemClass], default: [] }, PropType.ARRAY)
    public items?: ItemClass[];

    /**
     * Depth of the category. 0 means it's on the top level, 1 means it's in the first subcategory, etc.
     */
    @prop({ default: 0 })
    public depth?: number;

    public async addItem(this: DocumentType<CategoryClass>, item: ItemClass) {
        this.items?.push(item);
        await this.save();
    }

    public async removeItem(
        this: DocumentType<CategoryClass>,
        item: ItemClass
    ) {
        this.items?.splice(this.items.indexOf(item), 1);
        await this.save();
    }
}

export const CategoryModel = getModelForClass(CategoryClass);
