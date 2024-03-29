import styles from './Input.module.css';

function Select ({text, name, options, handleOnChange, value}) {
    return (
        <div className={styles.input}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione um opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;