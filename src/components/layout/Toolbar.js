import styles from './Toolbar.module.css'
import { MdOutlineTune, MdAdd } from "react-icons/md";

function Navbar({openAdd, openFilter}) {
    const add = () => {
        openAdd();
    }

    const filter = () => {
        openFilter();
    }

    return (
        <nav className={styles.toolbar}>
            <button onClick={filter}><MdOutlineTune /></button>
            <input type="search" id="pesquisar" name="pesquisar" />
            <button onClick={add}><MdAdd /></button>
        </nav>
    );
}

export default Navbar;