import { configureStore } from '@reduxjs/toolkit';

import LocationListReducer from './locationList';
import SearchLocationListReducer from './searchLocationList';
import SearchPageInfoReducer from './searchPageInfo';

const Store = configureStore({
    reducer: {
        locationList: LocationListReducer,
        searchLocation: SearchLocationListReducer,
        SearchPageInfo: SearchPageInfoReducer,
    }
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store;