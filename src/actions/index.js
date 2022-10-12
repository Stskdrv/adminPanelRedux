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

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR',
    }
}

export const heroCreating = (hero) => {
    return {
        type: 'CREATE_HERO',
        payload: hero,
    }
}
