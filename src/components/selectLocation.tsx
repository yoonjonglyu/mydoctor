import React, { useState, useRef, useEffect } from 'react';

import { useSearchLocations } from '../lib/custom/locations';

interface SelectLocationProps {
    handleSelect: (address: string, x: number, y: number) => void
}

const SelectLocation: React.FC<SelectLocationProps> = ({ handleSelect }) => {
    const {
        pageInfo,
        setPageInfo,
        searchLocations,
        getLocations,
    } = useSearchLocations();

    let observer: IntersectionObserver;
    const target = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (target.current) {
            observer = new IntersectionObserver(async ([entry]: any, observer: IntersectionObserver) => {
                if (entry.isIntersecting && !isLoaded) {
                    observer.unobserve(entry.target);
                    setIsLoaded(true);
                    if (pageInfo.isEnd !== 3) {
                        const searchResult = await getLocations(pageInfo);
                        setPageInfo(searchResult);
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                    }
                    setIsLoaded(false);
                }
            }, {
                threshold: 1,
            });
            observer.observe(target.current);
        }
        return () => observer && observer.disconnect();
    }, [target, isLoaded, pageInfo]);

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
                <div
                    data-testid="last-item"
                    ref={target}
                />
            </ul>
        </div>
    );
}

export default SelectLocation;