import styles from './Todo.module.css'
import { MdOutlineBookmarkBorder, MdModeEditOutline, MdDelete } from "react-icons/md";

function Todo() {
    return (
        <main className={styles.task}>
            <div className={styles.first_line}>
                <h2>Prova B</h2>
                <MdOutlineBookmarkBorder />
            </div>
            <p className={styles.category}>Categoria</p>
            <p className={styles.description}>Nunc quam velit, viverra eget turpis ut, ullamcorper egestas lorem. Suspendisse consequat scelerisque condimentum. Curabitur velit erat, sollicitudin sit amet malesuada in, tincidunt tincidunt risus. Ut vitae vulputate augue. Fusce egestas nulla lacus, vel interdum leo sodales vitae. Suspendisse potenti. Vivamus nec egestas mi. Suspendisse potenti. Vivamus nec egestas mi. Suspendisse potenti. Vivamus nec egestas mi. Vivamus nec egestas mi.</p>
            <div className={styles.last_line}>
                <p>Data: 10/05/22</p>
                <div>
                    <button><MdModeEditOutline /></button>
                    <button><MdDelete /></button>
                </div>
            </div>
        </main>
    );
}

export default Todo;