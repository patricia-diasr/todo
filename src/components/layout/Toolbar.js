import styles from './Toolbar.module.css'
import { MdOutlineTune, MdAdd } from "react-icons/md";

function Navbar({openAdd}) {
    const add = () => {
        openAdd();
    }
    return (
        <nav className={styles.toolbar}>
            <button><MdOutlineTune /></button>
            <input type="search" id="pesquisar" name="pesquisar" />
            <button onClick={add}><MdAdd /></button>
        </nav>
    );
}

export default Navbar;