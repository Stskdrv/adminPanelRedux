import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { useDeleteHeroMutation, useGetHeroesQuery } from '../../api/apiSlice';
import { useMemo } from 'react';

const HeroesList = () => {

    const {
        data: heroes = [], // данные которые нам вернули
        isFetching, // когда мы загружаем данные в последующие разы
        isLoading,// когда обращаемя к серверу в первый раз
        isSuccess,
        isError, // есть ли ошибка
        error // сама ошибка
    } = useGetHeroesQuery(); 

    const [onDelete, {error: deleteError}] = useDeleteHeroMutation();
    
    const activeFilter = useSelector( state => state.filters.activeFilter );

    const filterHeroes = useMemo( () => {
        const copiedHeroes = heroes.slice();

        return activeFilter === 'all' ?
            copiedHeroes :
            copiedHeroes.filter( hero => hero.element === activeFilter );
    },[heroes, activeFilter])

    const renderHeroes = () => {
        if ( isLoading || isFetching ) {
            return <Spinner className="text-center mt-5"/>
        }
        if ( isError || deleteError ) {
            return <h5 className="text-center mt-5">We hava an Error, look: { error.message }</h5>
        }
        if ( isSuccess ) {
            const data = filterHeroes;
            
            return data.map( ( { id, ...props } ) => {
                return <HeroesListItem key={uuidv4()} onDelete={() => onDelete(id)} {...props} />
        })
                
        }
    }

    return (
        <ul>
            {renderHeroes()}
        </ul>
    )
}

export default HeroesList;