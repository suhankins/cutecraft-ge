'use client';

import React from 'react';
import GoogleMapReact from 'google-map-react';
import { CutecraftMarker } from './CutecraftMarker';
import { Locale } from '@/lib/i18n-config';

export default function CutecraftMap({
    markerText,
    lang,
}: {
    markerText: string;
    lang: Locale;
}) {
    const defaultProps = {
        center: {
            lat: 41.818437,
            lng: 41.774938,
        },
        zoom: 18,
    };

    return (
        <GoogleMapReact
            options={{
                clickableIcons: false,
                styles: [
                    {
                        featureType: 'poi.business',
                        elementType: 'labels.text',
                        stylers: [
                            {
                                visibility: 'off',
                            },
                        ],
                    },
                    {
                        featureType: 'poi.government',
                        elementType: 'labels',
                        stylers: [
                            {
                                visibility: 'off',
                            },
                        ],
                    },
                ],
                mapTypeId: 'roadmap',
            }}
            bootstrapURLKeys={{
                language: lang,
                key: process.env.GOOGLE_MAPS_API_KEY ?? '',
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            <CutecraftMarker
                lat={defaultProps.center.lat}
                lng={defaultProps.center.lng}
                text={markerText}
            />
        </GoogleMapReact>
    );
}
