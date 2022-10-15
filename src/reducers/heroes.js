const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroCreatingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
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

export default heroes;