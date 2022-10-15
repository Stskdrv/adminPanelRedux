import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        state => state.heroes.heroes,
        state => state.filters.activeFilter,
      
        ( heroes, filter ) => {
            console.log(heroes,filter)
            if(filter === 'all') {
                return heroes
            } else {
                return heroes.filter((el) => el.element === filter);
            }     
        }
    )

    const {heroesLoadingStatus} = useSelector(state => state.heroes)

    const dispatch = useDispatch();
    const {request} = useHttp();

    const fetchHeroes = () => {
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    useEffect(() => {
        dispatch(heroesFetching());
        fetchHeroes();
        // eslint-disable-next-line
    }, []);

    const onDelete =useCallback((id) => {
        //dispatch(deleteHero(id));
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(() => fetchHeroes())
    }, [request])

    const filteredHeroes = useSelector( filteredHeroesSelector );

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = () => {
        if (filteredHeroes.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
       return filteredHeroes?.map(({id, ...props}) => {
        return <HeroesListItem key={uuidv4()} onDelete={() => onDelete(id)} {...props}/>
       })
    }

    const elements = renderHeroesList();
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;