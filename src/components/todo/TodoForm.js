import { useState } from 'react';

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

function TaskForm ({handleSubmit, taskData}) {

    const [task, setTask] = useState(taskData || {});

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(task)
    };

    function handleChange(e) {
        setTask({...task, [e.target.name]: e.target.value});
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