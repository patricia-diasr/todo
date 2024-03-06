import styles from './Toolbar.module.css'
import { MdOutlineTune, MdAdd } from "react-icons/md";

function Navbar() {
    return (
        <navbar className={styles.toolbar}>
            <button><MdOutlineTune /></button>
            <input type="search" id="pesquisar" name="pesquisar" />
            <button><MdAdd /></button>
        </navbar>
    );
}

export default Navbar;