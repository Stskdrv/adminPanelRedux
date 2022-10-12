import { useCallback, useState } from "react";
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { heroCreating } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [element, setElement] = useState(null);

    const {request} = useHttp();

    const { filters } = useSelector(state => state);

    const onCreateHero =(id) => {
        //dispatch(deleteHero(id));
        request(`http://localhost:3001/heroes/`, "POST", JSON.stringify({
            id: uuidv4(), 
            name, 
            description, 
            element
        }))
    }

    const Options = () => {
        return (
            filters.map((el) => {
              return (
                <option key={el.id} value={el.name}>{el.name}</option>
              )
            })
        )
    };

    const createHero = useCallback(() => {
        const id = uuidv4();
        dispatch(heroCreating({id, name, description, element}));
        onCreateHero(id)
    }, [description, dispatch, element, name, onCreateHero])


    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)} >
                    <option >Я владею элементом...</option>
                    <Options/>
                    
                </select>
            </div>

            <button type="submit" onClick={() => createHero()} className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;