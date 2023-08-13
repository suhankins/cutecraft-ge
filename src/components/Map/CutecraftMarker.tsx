import { MapPinIcon } from '@heroicons/react/24/solid';

export function CutecraftMarker({
    text,
}: {
    lat: number;
    lng: number;
    text: string;
}) {
    return (
        <div
            className="tooltip-open tooltip tooltip-right absolute -translate-x-1/2 -translate-y-full text-primary"
            data-tip="We are here!"
        >
            <MapPinIcon className=" h-8 w-8" />
        </div>
    );
}
