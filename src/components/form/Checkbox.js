import styles from './Checkbox.module.css';

function Checkbox ({text, name, options, handleOnChange, checkedValues}) {
    const handleChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        handleOnChange(value, isChecked);
    };

    return (
        <div>
            <label className={styles.checkbox_label} htmlFor={name}>{text}:</label>
            <div>
                {options.map((option) => (
                    <label key={option.value} className={styles.campo_checkbox}>
                        <input
                            type="checkbox"
                            name={name}
                            id={option.value}
                            value={option.value}
                            checked={(checkedValues || []).includes(option.value)}
                            onChange={handleChange}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Checkbox;
