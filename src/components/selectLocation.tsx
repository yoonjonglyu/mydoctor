import React from 'react';

import { useSearchLocations } from '../lib/custom/locations';

interface SelectLocationProps {

}

const SelectLocation: React.FC<SelectLocationProps> = () => {
    const {
        searchLocations,
        setSearchLocations,
    } = useSearchLocations();

    return (
        <div
            data-tesdid="select-box"
            style={{
                height: "400px",
                overflow: "auto",
                border: "1px solid"
            }}
        >
            <ul>
                {
                    searchLocations.length === 0 &&
                    <h2>검색 결과가 없습니다.</h2>
                }
                {
                    searchLocations.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <p>
                                    주소 : {item.addressName}<br />
                                    x: {item.x}<br />
                                    y: {item.y}<br />
                                </p>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default SelectLocation;