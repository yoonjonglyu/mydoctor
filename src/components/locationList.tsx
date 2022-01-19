import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/configureStore';

import { setLocationList } from '../store/locationList';

interface LocationListProps {

}

const LocationList: React.FC<LocationListProps> = () => {
    const locations = useSelector((state: RootState) => state.locationList.locationList);
    const dispatch = useDispatch();

    const removeLocations = (idx: number) => {
        const state = [...locations.slice(0, idx), ...locations.slice(idx + 1, locations.length)];
        dispatch(setLocationList(
            {
                locationList: state
            }
        ));
        localStorage.setItem('locationList', JSON.stringify(state));
    }

    useEffect(() => { // init dummy data
        if (!localStorage.getItem('locationList')) {
            localStorage.setItem(
                'locationList',
                JSON.stringify([
                    {
                        name: '집',
                        location: '서울역',
                        locationDetail: '2번출구',
                        notice: '노숙자 김씨를 찾아주세요.'
                    },
                    {
                        name: '회사',
                        location: '서울역',
                        locationDetail: '3번출구',
                        notice: '왕초 이씨를 찾아주세요.'
                    }
                ])
            );
        }

        dispatch(setLocationList(
            {
                locationList: JSON.parse(localStorage.getItem('locationList') || '[]')
            }
        ));

    }, []);

    return (
        <article data-testid="list-box">
            <ul>
                {
                    locations.length === 0 &&
                    <h2>저장된 위치정보가 없습니다.</h2>
                }
                {
                    locations.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <p>
                                    {item.name}<br />
                                    {item.location}<br />
                                    {item.locationDetail}<br />
                                    {item.notice}<br />
                                </p>
                                <button
                                    type="button"
                                    onClick={() => removeLocations(idx)}
                                >
                                    삭제
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
        </article>
    );
}

export default LocationList;