import React from "react";

declare global {
    let naver: any
}

interface NaverMapProps {
    url: string
    ref: React.MutableRefObject<null>
}

function NaverMap(props: NaverMapProps) {
    const {
        url,
        ref
    } = props;

    if (!document.getElementById("naverMap")) {
        const naverMapSciprt = document.createElement('script');
        naverMapSciprt.id = "naverMap";
        naverMapSciprt.src = url;
        document.body.appendChild(naverMapSciprt);
    }

    const initMap = () => {
        const map = new naver.maps.Map(ref.current, {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10
        });
    }

    return initMap;
}

export default NaverMap;