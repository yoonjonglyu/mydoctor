import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SearchPageInfoState {
    pageInfo: {
        isEnd: 1 | 2 | 3
        keyword: string
        currentPage: number
    }
}

const initialState: SearchPageInfoState = {
    pageInfo: {
        isEnd: 1,
        keyword: '',
        currentPage: 1,
    }
}

export const SearchPageInfoSlice = createSlice({
    name: 'searchPageInfo',
    initialState,
    reducers: {
        setSearchPageInfo: (state, action: PayloadAction<SearchPageInfoState>) => {
            state.pageInfo = action.payload.pageInfo;
        },
    },
})

export const { setSearchPageInfo } = SearchPageInfoSlice.actions

export default SearchPageInfoSlice.reducer