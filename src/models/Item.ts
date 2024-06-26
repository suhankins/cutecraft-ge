import { PropType, modelOptions, pre, prop } from '@typegoose/typegoose';
import '@/lib/mongodb'; // Importing library to connect to MongoDB
import type { LocalizedString } from '@/lib/i18n-config';
import slugify from 'slugify';

@pre<ItemClass>('save', function (next) {
    this.slug = slugify(this.name.get('en') ?? this._id.toString(), {
        lower: true,
    });
    next();
})
@modelOptions({
    schemaOptions: {
        _id: false,
    },
})
export class ItemClass {
    static readonly fields = ['name', 'description', 'price', 'image'];

    @prop({ type: () => String }, PropType.MAP)
    public name!: LocalizedString;

    /**
     * Description. Will be formatted as markdown on the front-end
     */
    @prop({ type: () => String }, PropType.MAP)
    public description?: LocalizedString;

    /**
     * Price in lari.
     */
    @prop({ default: 0 })
    public price!: number;

    @prop()
    public slug!: string;

    @prop({ type: () => [String], default: [] }, PropType.ARRAY)
    public images!: string[];
}
