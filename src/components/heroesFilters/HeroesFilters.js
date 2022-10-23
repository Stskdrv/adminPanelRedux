import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters, setActiveFilter } from '../../reducers/filtersSlice';

const HeroesFilters = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch( fetchFilters() );
    }, [])

    const { filters, activeFilter } = useSelector(state => state.filters);

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