'use client';

import React from 'react';
import GoogleMapReact from 'google-map-react';
import { CutecraftMarker } from './CutecraftMarker';
import { Locale } from '@/lib/i18n-config';

interface CutecraftMapProps {
    markerText: string;
    lang: Locale;
    /**
     * Google Maps API Key. We can't access env variables in the client,
     * so server component must pass it down to us.
     */
    apiKey: string;
}

export default function CutecraftMap({
    markerText,
    lang,
    apiKey,
}: CutecraftMapProps) {
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
                version: '3.31',
                language: lang,
                key: apiKey,
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
