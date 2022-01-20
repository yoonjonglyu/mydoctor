import React from "react";

declare global {
    let naver: any
}

interface NaverMapProps {
    url: string
    ref: React.MutableRefObject<null>
    x: number
    y: number
}

function NaverMap(props: NaverMapProps) {
    const {
        url,
        ref,
        x,
        y,
    } = props;

    if (!document.getElementById("naverMap")) {
        const naverMapSciprt = document.createElement('script');
        naverMapSciprt.id = "naverMap";
        naverMapSciprt.src = url;
        document.body.appendChild(naverMapSciprt);
    }

    const initMap = () => {
        const map = new naver.maps.Map(ref.current, {
            center: new naver.maps.LatLng(y, x),
            zoom: 14
        });
    }

    return initMap;
}

export default NaverMap;