import styles from './TodoDelete.module.css';

function TodoDelete ({closeModal, handleDelete}) {
    return (
        <>
        <h2>Deletar</h2>
        <p>Deseja deletar essa tarefa? Essa ação é irreversível.</p>
        <button onClick={closeModal} className={styles.cancelar}>CANCELAR</button>
        <button onClick={handleDelete} className={styles.salvar}>SALVAR</button>
        </>
    );
}

export default TodoDelete;