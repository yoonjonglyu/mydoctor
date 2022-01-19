import React, { useEffect, useState } from 'react';

import Local from '../lib/api/kakaoLocal';

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

    return (
        <>
            <form data-testid="location-form" onSubmit={SearchLocation}>
                <script type="text/javascript" src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${env.naverMap}`}></script>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleKeyword}
                    placeholder="주소 검색"
                />
                <button type="button">지도로 검색</button>
            </form>
            <div></div>
        </>
    );
}

export default SearchLocation;