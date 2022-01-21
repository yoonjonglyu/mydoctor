import React, { useEffect, useState, useRef } from 'react';

import NaverMap from '../lib/custom/naverMap';

import env from '../../env';

interface LocationMapProps {
    x: number
    y: number
    handleSelect: (address: string, x: number, y: number) => void
}

const LocationMap: React.FC<LocationMapProps> = ({ x, y, handleSelect }) => {
    const [currentLocation, setCurrentLocation] = useState<{ addressName: string, x: number, y: number }>({
        addressName: '',
        x: 0,
        y: 0
    });
    const mapBox = useRef(null);
    const naverMap = NaverMap({
        url: `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${env.naverMap}`,
        ref: mapBox,
        x: x,
        y: y,
    });

    const naverSelect = (address: { jibunAddress: string, roadAddress: string }, xy: { x: number, y: number }) => {
        const addressName = address.roadAddress ? address.roadAddress : address.jibunAddress;
        setCurrentLocation({
            addressName,
            x: xy.x,
            y: xy.y
        });
    }
    const confirmLocation = () => {
        handleSelect(currentLocation.addressName, currentLocation.x, currentLocation.y);
    }
    useEffect(() => {
        const initMap = setTimeout(() => {
            naverMap(naverSelect);
        }, 100);
        return () => {
            clearTimeout(initMap);
        }
    }, []);

    return (
        <article
            data-testid="location-box"
            style={{
                position: "relative"
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "400px"
                }}
                ref={mapBox}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "100px",
                    textAlign: "center",
                    color: "#fff",
                    background: "rgb(1, 1, 1, 50%)",
                }}
            >
                <p>
                    {currentLocation.addressName}<br />
                    해당 주소가 맞습니까?
                </p>
                <button
                    type="button"
                    onClick={confirmLocation}
                >
                    확인
                </button>
            </div>
        </article>
    );
}

export default LocationMap;