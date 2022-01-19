import React from 'react';

interface SearchLocationProps {

}

const SearchLocation: React.FC<SearchLocationProps> = () => {
    return (
        <form data-testid="location-form">
            <input type="text" placeholder="주소 검색" />
            <button type="button">지도로 검색</button>
        </form>
    );
}

export default SearchLocation;