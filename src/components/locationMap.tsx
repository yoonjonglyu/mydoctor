import React, { useEffect, useRef } from 'react';

import NaverMap from '../lib/custom/naverMap';

import env from '../../env';

interface LocationMapProps {
    x: number
    y: number
    handleSelect: (address: string, x: number, y: number) => void
}

const LocationMap: React.FC<LocationMapProps> = ({ x, y, handleSelect }) => {
    const mapBox = useRef(null);

    const naverMap = NaverMap({
        url: `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${env.naverMap}`,
        ref: mapBox,
        x: x,
        y: y,
    });

    useEffect(() => {
        setTimeout(naverMap, 100);
    }, []);

    return (
        <div
            id="map"
            style={{
                width: "100%",
                height: "400px"
            }}
            ref={mapBox}
        >
        </div>
    );
}

export default LocationMap;