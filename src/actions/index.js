// import { createAction } from "@reduxjs/toolkit"
import { heroesFetching, heroesFetched, heroesFetchingError } from '../reducers/heroesSlice';


export const fechHeroes = (request) => (dispatch) => {
    dispatch( heroesFetching() );
    request ("http://localhost:3001/heroes")
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()))
}