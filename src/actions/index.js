import { createAction } from "@reduxjs/toolkit"

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

export const heroesFetching = createAction( 'HEROES_FETCHING' ); // base case with RTK

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction( 'HEROES_FETCHED' ) // here we can see that payload added to action automatically, 
//we don't need to pass it and save in store

export const heroesFetchingError = createAction( 'HEROES_FETCHING_ERROR' );

export const deleteHero = createAction( 'DELETE_HERO' );

// export const deleteHero = (id) => {
//     return {
//         type: 'DELETE_HERO',
//         payload: {
//             id: id,
//         }
//     }
// }


export const fechHeroes = (request) => (dispatch) => {
    dispatch( heroesFetching() );
    request ("http://localhost:3001/heroes")
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()))
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters,

    }
}

export const setActiveFilter = (filterName) => {
    return {
        type: 'SET_FILTER',
        payload: filterName,

    }
}

// export const setActiveFilter = ( filterName ) => ( dispatch ) => {
//     setTimeout( () => {
//         dispatch({
//             type: 'SET_FILTER',
//             payload: filterName,
    
//         })
//     }, 1000)

// }

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR',
    }
}

export const heroCreating = createAction( 'HEROES_CREATING' );

export const heroCreated = createAction( 'HEROES_CREATED' );

export const heroCreatingError = createAction( 'HEROES_CREATING_ERROR' );