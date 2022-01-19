import React, { useState, useEffect } from 'react';

interface LocationListProps {

}

const LocationList: React.FC<LocationListProps> = () => {
    const [locations, setLocations] = useState<Array<any>>([]);

    useEffect(() => {
        setLocations([
            'test1',
            'test2'
        ]);
    }, []);

    return (
        <article data-testid="list-box">
            <ul>
                {
                    locations.length === 0 &&
                    <h2>저장된 위치정보가 없습니다.</h2>
                }
                {
                    locations.map((location, idx) => {
                        return (
                            <li key={idx}>
                                {location}
                            </li>
                        );
                    })
                }
            </ul>
        </article>
    );
}

export default LocationList;