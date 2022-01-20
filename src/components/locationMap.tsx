import React, { useEffect, useRef } from 'react';

import NaverMap from '../lib/custom/naverMap';

import env from '../../env';

interface LocationMapProps {

}

const LocationMap: React.FC<LocationMapProps> = () => {
    const mapBox = useRef(null);
    const naverMap = NaverMap({
        url: `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${env.naverMap}`,
        ref: mapBox
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