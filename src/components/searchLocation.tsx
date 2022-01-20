import React, { useState, useEffect } from 'react';

import SelectLocation from './selectLocation';
import LocationMap from './locationMap';

import { useSearchLocations } from '../lib/custom/locations';

interface SearchLocationProps {

}

const SearchLocation: React.FC<SearchLocationProps> = () => {
    const [step, setStep] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [selectInfo, setSelectInfo] = useState({
        addressName: '',
        x: 127.105399,
        y: 37.3595704,
    });
    const {
        setPageInfo,
        setSearchLocations,
        getLocations,
    } = useSearchLocations();

    const searchAddress = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword.length > 0) {
            setSearchLocations([]);
            const searchResult = await getLocations({
                keyword,
                isEnd: 1,
                currentPage: 1
            });
            setPageInfo(searchResult);
            setStep(1);
        }
        setKeyword('');
    }
    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    const handleSelect = (address: string, x: number, y: number) => {
        setSelectInfo({
            addressName: address,
            x: x,
            y: y,
        });
        setStep(step + 1);
    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setSelectInfo({
                    ...selectInfo,
                    y: position.coords.latitude,
                    x: position.coords.longitude,
                });
            });
        }
    }, []);

    return (
        <article data-tesdid="search-location">
            <form data-testid="location-form" onSubmit={searchAddress}>
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
                    handleSelect={handleSelect}
                />
            }

        </article>
    );
}

export default SearchLocation;