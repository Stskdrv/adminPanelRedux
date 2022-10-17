export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const deleteHero = (id) => {
    return {
        type: 'DELETE_HERO',
        payload: {
            id: id,
        }
    }
}


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

export const heroCreating = () => {
    return {
        type: 'HEROES_CREATING'
    }
}
export const heroCreated = (hero) => {
    return {
        type: 'HEROES_CREATED',
        payload: hero,
    }
}

export const heroCreatingError = () => {
    return {
        type: 'HEROES_CREATING_ERROR'
    }
}