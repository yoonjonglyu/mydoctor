import React, { useEffect, useState, useRef } from 'react';

import Local from '../lib/api/kakaoLocal';
import NaverMap from '../lib/custom/naverMap';

import env from '../../env';

interface SearchLocationProps {

}

const SearchLocation: React.FC<SearchLocationProps> = () => {
    const [keyword, setKeyword] = useState('');

    const SearchLocation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const location = new Local(env.kakaoLocal);
        if (keyword.length > 0) {
            const search = await location.getAddress(keyword);
            if (search) {
                console.log(search);
            } else {
                alert('API 요청 오류');
            }
            setKeyword('');
        }
    }
    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    const mapBox = useRef(null);
    const naverMap = NaverMap({
        url: `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${env.naverMap}`,
        ref: mapBox
    });

    useEffect(() => {
        setTimeout(naverMap, 100);
    }, []);

    return (
        <>
            <form data-testid="location-form" onSubmit={SearchLocation}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleKeyword}
                    placeholder="주소 검색"
                />
                <button type="button">지도로 검색</button>
            </form>
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "300px"
                }}
                onClick={naverMap}
                ref={mapBox}
            >
            </div>
        </>
    );
}

export default SearchLocation;