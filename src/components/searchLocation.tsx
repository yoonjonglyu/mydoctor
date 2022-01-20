import React, { useEffect, useState, useRef } from 'react';

import SelectLocation from './selectLocation';

import Local from '../lib/api/kakaoLocal';
import NaverMap from '../lib/custom/naverMap';
import { useSearchLocations } from '../lib/custom/locations';

import env from '../../env';

interface SearchLocationProps {

}

const SearchLocation: React.FC<SearchLocationProps> = () => {
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const {
        setSearchLocations,
    } = useSearchLocations()

    const SearchLocation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const location = new Local(env.kakaoLocal);
        if (keyword.length > 0) {
            const search = await location.getAddress(keyword, currentPage);
            if (search) {
                const state = search.documents.map((el: any) => ({
                    addressName: el.address ? el.address.address_name : el.road_address.address_name,
                    x: el.address ? el.address.x : el.road_address.x,
                    y: el.address ? el.address.y : el.road_address.y,
                }));
                if (!search.meta.isEnd) {
                    setCurrentPage(currentPage + 1);
                    setSearchLocations(state);
                } else {
                    setCurrentPage(1);
                    setSearchLocations(state);
                }
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
            <div
                id="map"
                style={{
                    width: "50%",
                    height: "300px"
                }}
                ref={mapBox}
            >
            </div>
            <form data-testid="location-form" onSubmit={SearchLocation}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleKeyword}
                    placeholder="주소 검색"
                />
                <button type="submit">검색</button>
            </form>
            <SelectLocation />
        </>
    );
}

export default SearchLocation;