import { configureStore } from '@reduxjs/toolkit';

import LocationListReducer from './locationList';

const Store = configureStore({
    reducer: {
        locationList: LocationListReducer,
    }
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store;