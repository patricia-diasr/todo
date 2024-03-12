import { useState } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import Checkbox from '../form/Checkbox';
import SubmitButton from '../form/SubmitButton';

function Filter ({previousFilter, handleSubmit}) {
    const [filter, setFilter] = useState(previousFilter || { checkedValues: [] });

    const conclusion_options = [
        {
            id: "todos",
            name: "Todos"
        }, {
            id: "concluidos",
            name: "Apenas Concluídos"
        }, {
            id: "nao-concluidos",
            name: "Apenas não Concluídos"
        }
    ];

    const importance_options = [
        { label: 'Baixa', value: 'baixa' },
        { label: 'Média', value: 'media' },
        { label: 'Alta', value: 'alta' }
    ];

    function handleSelect(e, fieldName) {
        setFilter({...filter, [fieldName]: {
            id: e.target.value,
        }});
    };

    const handleCheckboxChange = (value, isChecked) => {
        if (isChecked) {
            setFilter({...filter, checkedValues: [...filter.checkedValues, value]});
        } else {
            setFilter({
                ...filter,
                checkedValues: filter.checkedValues.filter(item => item !== value)
            });
        }
    };
    

    function handleChange(e) {
        setFilter({...filter, [e.target.name]: e.target.value});
    };


    const submit = (e) => {
        e.preventDefault();
        handleSubmit(filter);
    };

    return (
        <form onSubmit={submit}>
            <Select 
                text="Conclusão"
                name="conclusion_id"
                options={conclusion_options}
                value={filter.conclusion ? filter.conclusion.id : ''}
                handleOnChange={(e) => handleSelect(e, 'conclusion')}
            />
            <Checkbox
                text="Importância"
                name="opcao-importancia"
                labelText="Importância"
                options={importance_options}
                handleOnChange={handleCheckboxChange}
                checkedValues={filter.checkedValues}
            />
            <Input 
                type="date"
                text="Data"
                name="date"
                value={filter.date || ''}
                handleOnChange={handleChange}
            />
            <SubmitButton text="SALVAR" />
        </form>
    );
}

export default Filter;