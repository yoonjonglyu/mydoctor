import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LocationListState {
    locationList: Array<{
        name: string,
        location: String,
        locationDetail: string,
        notice: string
    }>
}

const initialState: LocationListState = {
    locationList: []
}

export const LocationListSlice = createSlice({
    name: 'locationList',
    initialState,
    reducers: {
        setLocationList: (state, action: PayloadAction<LocationListState>) => {
            state.locationList = action.payload.locationList;
        },
    },
})

export const { setLocationList } = LocationListSlice.actions

export default LocationListSlice.reducer