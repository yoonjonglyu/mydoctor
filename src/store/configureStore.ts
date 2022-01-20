import { configureStore } from '@reduxjs/toolkit';

import LocationListReducer from './locationList';
import searchLocationListReducer from './searchLocationList';

const Store = configureStore({
    reducer: {
        locationList: LocationListReducer,
        searchLocation: searchLocationListReducer,
    }
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store;