import styles from './Todo.module.css'
import { MdOutlineBookmarkBorder, MdModeEditOutline, MdDelete } from "react-icons/md";

function Todo({ id, name, category, description, date }) {
    return (
        <main className={styles.task}>
            <div className={styles.first_line}>
                <h2>{name}</h2>
                <MdOutlineBookmarkBorder />
            </div>
            <p className={styles.category}>{category}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.last_line}>
                <p>Data: {date}</p>
                <div>
                    <button><MdModeEditOutline /></button>
                    <button><MdDelete /></button>
                </div>
            </div>
        </main>
    );
}

export default Todo;