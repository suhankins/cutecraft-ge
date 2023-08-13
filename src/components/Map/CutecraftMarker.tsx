import { MapPinIcon } from '@heroicons/react/24/outline';

export function CutecraftMarker({
    text,
}: {
    lat: number;
    lng: number;
    text: string;
}) {
    return (
        <div className="relative">
            <MapPinIcon className="h-6 w-6" />
            <span className="absolute left-8 -top-1 whitespace-nowrap text-2xl font-bold">
                {text}
            </span>
        </div>
    );
}
