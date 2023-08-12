'use client';

import React from 'react';
import GoogleMapReact from 'google-map-react';
import { CutecraftMarker } from './CutecraftMarker';

export default function CutecraftMap() {
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
                styles: [
                    {
                        featureType: 'landscape',
                        stylers: [{ saturation: -100 }, { lightness: 60 }],
                    },
                    {
                        featureType: 'road.local',
                        stylers: [
                            { saturation: -100 },
                            { lightness: 40 },
                            { visibility: 'on' },
                        ],
                    },
                    {
                        featureType: 'transit',
                        stylers: [
                            { saturation: -100 },
                            { visibility: 'simplified' },
                        ],
                    },
                    {
                        featureType: 'administrative.province',
                        stylers: [{ visibility: 'off' }],
                    },
                    {
                        featureType: 'water',
                        stylers: [{ visibility: 'on' }, { lightness: 30 }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.fill',
                        stylers: [{ color: '#ef8c25' }, { lightness: 40 }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{ visibility: 'off' }],
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'geometry.fill',
                        stylers: [
                            { color: '#b6c54c' },
                            { lightness: 40 },
                            { saturation: -40 },
                        ],
                    },
                ],
                mapTypeId: 'roadmap',
            }}
            bootstrapURLKeys={{
                key: process.env.GOOGLE_MAPS_API_KEY ?? '',
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            <CutecraftMarker
                lat={defaultProps.center.lat}
                lng={defaultProps.center.lng}
                text={'We are here!!!'}
            />
        </GoogleMapReact>
    );
}
