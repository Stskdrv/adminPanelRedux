
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHttp} from '../../hooks/http.hook';
import { filtersFetched, filtersFetching, filtersFetchingError, setActiveFilter } from '../../actions';

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();


    useEffect(() => {
        const fetchFilters = () => (
            request("http://localhost:3001/filters")
                .then(filters => dispatch(filtersFetched(filters)))
                .catch(() => dispatch(filtersFetchingError()))
        );
        dispatch(filtersFetching());
        fetchFilters();
    }, [dispatch, request])

    const { filters, activeFilter } = useSelector(state => state);

    console.log(filters);
    const FiltersButtons = () => {
        return filters.map(({ name, style, id }) => {
            return (
                <button key={id} onClick={() => dispatch(setActiveFilter(name))} className={`btn btn-${style} ${name === activeFilter ? 'active' : null}`}>{name}</button>
            )
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <FiltersButtons/>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;