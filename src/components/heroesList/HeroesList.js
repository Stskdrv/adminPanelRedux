import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { fetchHeroes, selectAll } from '../../reducers/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        selectAll,
        state => state.filters.activeFilter,
      
        ( heroes, filter ) => {
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

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const onDelete =useCallback((id) => {
        //dispatch(deleteHero(id));
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(() => dispatch(fetchHeroes()))
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
        console.log(filteredHeroes);
       return filteredHeroes.map(({id, ...props}) => {
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