import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/configureStore';

import { setLocationList } from '../../store/locationList';
import { setSearchLocationList } from '../../store/searchLocationList';
import { setSearchPageInfo } from '../../store/searchPageInfo';

import KakaoLocal from '../api/kakaoLocal';

import env from '../../../env';

export function useUserLocations() {
    const locations = useSelector((state: RootState) => state.locationList.locationList);
    const dispatch = useDispatch();

    const setLocations = (state: typeof locations) => {
        dispatch(setLocationList(
            {
                locationList: state
            }
        ));
        localStorage.setItem('locationList', JSON.stringify(state));
    }
    const removeLocations = (idx: number) => {
        const state = [...locations.slice(0, idx), ...locations.slice(idx + 1, locations.length)];
        setLocations(state);
        localStorage.setItem('locationList', JSON.stringify(state));
    }

    return {
        locations,
        setLocations,
        removeLocations,
    };
}

export function useSearchLocations() {
    const searchLocations = useSelector((state: RootState) => state.searchLocation.search);
    const pageInfo = useSelector((state: RootState) => state.SearchPageInfo.pageInfo);
    const dispatch = useDispatch();

    const getLocations = async (page: typeof pageInfo) => {
        const result = {
            ...page
        };
        const location = new KakaoLocal(env.kakaoLocal);
        
        if (page.isEnd === 1) {
            const search = await location.getAddress(result.keyword, result.currentPage);
            if (search) {
                const state = search.documents.map((el: any) => ({
                    addressName: el.address ? el.address.address_name : el.road_address.address_name,
                    x: el.address ? el.address.x : el.road_address.x,
                    y: el.address ? el.address.y : el.road_address.y,
                }));
                setSearchLocations(
                    page.keyword == pageInfo.keyword ?
                        searchLocations.concat(state) :
                        state
                );
                result.isEnd = search.meta.is_end === true ? 2 : 1;
                result.isEnd === 1 ?
                    result.currentPage += 1 :
                    result.currentPage = 1;
            } else {
                alert('KAKAO 로컬 API 오류');
            }
        } else {
            const search = await location.getKeyword(result.keyword, result.currentPage);
            if (search) {
                const state = search.documents.map((el: any) => ({
                    addressName: `${el.place_name}, ${el.address_name}`,
                    x: el.x,
                    y: el.y,
                }));
                setSearchLocations(
                    page.keyword == pageInfo.keyword ?
                        searchLocations.concat(state) :
                        state
                );
                result.isEnd = search.meta.is_end === true ? 3 : 2;
                result.isEnd === 2 ?
                    result.currentPage += 1 :
                    result.currentPage = 1;
            } else {
                alert('KAKAO 로컬 API 오류');
            }
        }

        return result;
    }
    const setSearchLocations = (state: typeof searchLocations) => {
        dispatch(setSearchLocationList(
            {
                search: state
            }
        ));
    }
    const setPageInfo = (state: typeof pageInfo) => {
        dispatch(setSearchPageInfo(
            {
                pageInfo: state
            }
        ));
    }

    return {
        pageInfo,
        setPageInfo,
        searchLocations,
        setSearchLocations,
        getLocations,
    };
}