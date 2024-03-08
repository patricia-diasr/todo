import styles from './Input.module.css';

function Input ({type, text, name, handleOnChange, value}) {
    return (
        <div className={styles.input}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type}
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value}>
            </input>
        </div>
    );
}

export default Input;