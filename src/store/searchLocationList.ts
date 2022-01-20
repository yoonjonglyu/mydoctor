import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SearchLocationListState {
    search: Array<any> 
}

const initialState: SearchLocationListState = {
    search: []
}

export const SearchLocationListSlice = createSlice({
    name: 'searchLocationList',
    initialState,
    reducers: {
        setSearchLocationList: (state, action: PayloadAction<SearchLocationListState>) => {
            state.search = action.payload.search;
        },
    },
})

export const { setSearchLocationList } = SearchLocationListSlice.actions

export default SearchLocationListSlice.reducer