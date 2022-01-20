import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/configureStore';

import { setLocationList } from '../../store/locationList';

export function userLocations() {
    const locations = useSelector((state: RootState) => state.locationList.locationList);
    const dispatch = useDispatch();

    const setLocations = (state: typeof locations) => {
        dispatch(setLocationList(
            {
                locationList: state
            }
        ));
    }
    const removeLocations = (idx: number) => {
        const state = [...locations.slice(0, idx), ...locations.slice(idx + 1, locations.length)];
        setLocations(state);
        localStorage.setItem('locationList', JSON.stringify(state));
    }

    return {
        locations,
        setLocations,
        removeLocations
    }
}