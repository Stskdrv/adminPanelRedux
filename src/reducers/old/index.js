const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    heroCreatingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HERO':
            return {
                ...state,
                heroes: state.heroes.splice(action.payload.id,1),
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading',
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload,
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'SET_FILTER':
            return {
                ...state,
                activeFilter: action.payload
            }

        case 'HEROES_CREATING':
            return {
                ...state,
                heroCreatingStatus: 'Creating...'
            }
        case 'HEROES_CREATED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroCreatingStatus: 'idle',
            }
        case 'HEROES_CREATING_ERROR':
            return {
                ...state,
                heroCreatingStatus: 'error'
            }
        
        default: return state
    }
}

export default reducer;