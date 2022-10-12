import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, activeFilter} = useSelector(state => state);
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
    }, [activeFilter]);

    const onDelete =useCallback((id) => {
        //dispatch(deleteHero(id));
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(() => fetchHeroes())
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        if(activeFilter === 'all') {
            return arr?.map(({id, ...props}) => {
                return <HeroesListItem key={uuidv4()} onDelete={() => onDelete(id)} {...props}/>
            })
        } else {
           return arr.filter((el) => el.element === activeFilter).map(({id, ...props}) => {
            return <HeroesListItem key={uuidv4()} onDelete={() => onDelete(id)} {...props}/>
        })
        }
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;