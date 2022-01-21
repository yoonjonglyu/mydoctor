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
type handleSelect = (address: { jibunAddress: string, roadAddress: string }, xy: { x: number, y: number }) => void

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
        naverMapSciprt.src = `${url}&submodules=geocoder`;
        document.body.appendChild(naverMapSciprt);
    }


    const initMap = (handleSelect: handleSelect) => {
        const map = setMap();
        const marker = setMarker();
        const infoWindow = new naver.maps.InfoWindow({
            anchorSkew: true
        });
        initGeocoder();

        function setMap() {
            const result = new naver.maps.Map(ref.current, {
                center: new naver.maps.LatLng(y, x),
                zoom: 16,
                mapTypeControl: true
            });
            result.setCursor('pointer');

            return result;
        }
        function setMarker() {
            const result = new naver.maps.Marker({
                position: new naver.maps.LatLng(y, x),
                map: map
            });
            naver.maps.Event.addListener(map, 'click', function (e: any) {
                marker.setPosition(e.latlng);
            });
            return result;
        }

        function searchCoordinateToAddress(latlng: { x: number, y: number }) {
            infoWindow.close();

            naver.maps.Service.reverseGeocode({
                coords: latlng,
                orders: [
                    naver.maps.Service.OrderType.ADDR,
                    naver.maps.Service.OrderType.ROAD_ADDR
                ].join(',')
            }, (status: number, response: any) => {
                if (status === naver.maps.Service.Status.ERROR) {
                    if (!latlng) {
                        return alert('ReverseGeocode Error, Please check latlng');
                    }
                    if (latlng.toString) {
                        return alert('ReverseGeocode Error, latlng:' + latlng.toString());
                    }
                    if (latlng.x && latlng.y) {
                        return alert('ReverseGeocode Error, x:' + latlng.x + ', y:' + latlng.y);
                    }
                    return alert('ReverseGeocode Error, Please check latlng');
                }

                const address = response.v2.address,
                    htmlAddresses = [];

                if (address.jibunAddress !== '') {
                    htmlAddresses.push('[지번 주소] ' + address.jibunAddress);
                }

                if (address.roadAddress !== '') {
                    htmlAddresses.push('[도로명 주소] ' + address.roadAddress);
                }
                handleSelect(address, { x: latlng.x, y: latlng.y });

                infoWindow.setContent([
                    '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                    htmlAddresses.join('<br />'),
                    '</div>'
                ].join('\n'));

                infoWindow.open(map, latlng);
            });
        }
        function initGeocoder() {
            map.addListener('click', function (e: any) {
                searchCoordinateToAddress(e.coord);
            });
            searchCoordinateToAddress({ x, y });
        }
    }
    return initMap;
}
export default NaverMap;