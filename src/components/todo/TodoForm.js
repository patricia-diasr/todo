import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';

import SubmitButton from '../form/SubmitButton';

function TaskForm ({handleSubmit, taskData}) {

    const [task, setTask] = useState(taskData || {});
    const [categories, setCategories] = useState([]);
    const [importance, setImportance] = useState([]);

    useEffect( () => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then( resp => resp.json() )
        .then ( data => setCategories(data) )
        .catch( err => console.log(err) );
    }, []);

    useEffect( () => {
        fetch("http://localhost:5000/importance", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then( resp => resp.json() )
        .then ( data => setImportance(data) )
        .catch( err => console.log(err) );
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(task)
    };

    function handleChange(e) {
        setTask({...task, [e.target.name]: e.target.value});
    };

    function handleSelect(e, fieldName) {
        setTask({...task, [fieldName]: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }});
    };

    return (
        <form onSubmit={submit}>
            <Input 
                type="text"
                text="Nome"
                name="name"
                value={task.name || ''}
                handleOnChange={handleChange}
            />
            <Select 
                text="Categoria"
                name="category_id"
                options={categories}
                value={task.category ? task.category.id : ''}
                handleOnChange={(e) => handleSelect(e, 'category')}
            />
            <Select 
                text="Importância"
                name="importance_id"
                options={importance}
                value={task.importance ? task.importance.id : ''}
                handleOnChange={(e) => handleSelect(e, 'importance')}
            />
            <Input 
                type="text"
                text="Descrição"
                name="description"
                value={task.description || ''}
                handleOnChange={handleChange}
            />
            <Input 
                type="date"
                text="Data"
                name="date"
                value={task.date || ''}
                handleOnChange={handleChange}
            />
            <SubmitButton text="SALVAR" />
        </form>
    );
}

export default TaskForm;