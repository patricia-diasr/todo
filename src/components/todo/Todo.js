import styles from './Todo.module.css'
import { MdOutlineBookmarkBorder, MdBookmark, MdModeEditOutline, MdDelete } from 'react-icons/md';

function Todo({ id, name, category, importance, description, date, completed, openEdit, openDelete, completeTask}) {
    const editTask = () => {
        const task = {
            name: name,
            id: id,
            category: category,
            description: description,
            date: date,
        };
        openEdit(task);
    }

    const deleteTask = () => {
        openDelete(id);
    }

    const formatDate = (date) => {
        if (date) {
            const splitedDate = date.split('-');
            return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
        }
        return 'Sem data';
    }

    return (
        <main className={styles.task}>
            <div className={styles.first_line}>
                <h2>{name}</h2>
                <button onClick={()=>{completeTask(id, completed)}}>
                    {completed ? <MdBookmark className={`${styles[importance]}`}/> : <MdOutlineBookmarkBorder className={`${styles[importance]}`}/>}
                </button>
            </div>
            <p className={styles.category}>{category.name}</p>
            <p className={styles.description}>{description ?? '...'}</p>
            <div className={styles.last_line}>
                <p>Data: {formatDate(date)}</p>
                <div>
                    <button onClick={editTask}><MdModeEditOutline /></button>
                    <button onClick={deleteTask}><MdDelete /></button>
                </div>
            </div>
        </main>
    );
}

export default Todo;