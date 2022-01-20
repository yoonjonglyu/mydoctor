import React from 'react';

import { useSearchLocations } from '../lib/custom/locations';

interface SelectLocationProps {
    handleSelect: (address: string, x: number, y: number) => void
}

const SelectLocation: React.FC<SelectLocationProps> = ({ handleSelect }) => {
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
                            <li
                                key={idx}
                                onClick={() => handleSelect(item.addressName, item.x, item.y)}
                            >
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