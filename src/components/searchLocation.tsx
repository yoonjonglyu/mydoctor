import React, { useState } from 'react';

import SelectLocation from './selectLocation';
import LocationMap from './locationMap';

import Local from '../lib/api/kakaoLocal';
import { useSearchLocations } from '../lib/custom/locations';

import env from '../../env';

interface SearchLocationProps {

}

const SearchLocation: React.FC<SearchLocationProps> = () => {
    const [step, setStep] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [selectInfo, setSelectInfo] = useState({
        addressName: '',
        currentPage: 1,
        x: 127.105399,
        y: 37.3595704,
    });
    const {
        setSearchLocations,
    } = useSearchLocations();

    const SearchLocation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const location = new Local(env.kakaoLocal);
        if (keyword.length > 0) {
            const search = await location.getAddress(keyword, 1);
            if (search) {
                const state = search.documents.map((el: any) => ({
                    addressName: el.address ? el.address.address_name : el.road_address.address_name,
                    x: el.address ? el.address.x : el.road_address.x,
                    y: el.address ? el.address.y : el.road_address.y,
                }));
                if (!search.meta.isEnd) {
                    setSelectInfo({
                        ...selectInfo,
                        addressName: keyword,
                        currentPage: 2
                    });
                    setSearchLocations(state);
                } else {
                    setSelectInfo({
                        ...selectInfo,
                        addressName: keyword,
                        currentPage: 1
                    });
                    setSearchLocations(state);
                }
                setStep(1);
            } else {
                alert('API 요청 오류');
            }
            setKeyword('');
        }
    }
    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }
    const handleSelect = (address: string, x: number, y: number) => {
        setSelectInfo({
            ...selectInfo,
            addressName: address,
            x: x,
            y: y,
        });
        setStep(2);
    }

    return (
        <article data-tesdid="search-location">
            <form data-testid="location-form" onSubmit={SearchLocation}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleKeyword}
                    placeholder="주소 검색"
                />
                <button
                    type="button"
                    onClick={() => setStep(2)}
                >
                    지도로 보기
                </button>
            </form>
            {
                step === 1 &&
                <SelectLocation
                    handleSelect={handleSelect}
                />
            }
            {
                step === 2 &&
                <LocationMap
                    x={selectInfo.x}
                    y={selectInfo.y}
                />
            }

        </article>
    );
}

export default SearchLocation;