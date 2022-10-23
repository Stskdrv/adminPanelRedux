import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
}

const filtersSlice = createSlice( {
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filtersFetched: ( state, action ) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        setActiveFilter: ( state, action ) => {
            state.activeFilter = action.payload;
        },
        filtersFetchingError: ( state ) => {
            state.filtersLoadingStatus = 'ERROR';
        }
    },
} );


const { actions, reducer } = filtersSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    setActiveFilter,
    filtersFetchingError
} = actions;