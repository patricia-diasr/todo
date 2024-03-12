import { useState } from 'react';

import styles from './Toolbar.module.css'
import { MdOutlineTune, MdAdd } from "react-icons/md";

function Toolbar({openAdd, openFilter, setSearchbar}) {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        setSearchbar(value);
    };
    
    const add = () => {
        openAdd();
    }

    const filter = () => {
        openFilter();
    }

    return (
        <nav className={styles.toolbar}>
            <button onClick={filter}><MdOutlineTune /></button>
            <input
                type="search"
                id="pesquisar"
                name="pesquisar"
                value={searchValue}
                onChange={handleInputChange}
            />
            <button onClick={add}><MdAdd /></button>
        </nav>
    );
}

export default Toolbar;