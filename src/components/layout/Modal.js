import styles from './Modal.module.css';

function Modal (props) {
    const close = (e) => {
        if (e.target.classList.contains(styles.blur)) {
            props.closeModal();
        }
    }
    return (
        <div className={styles.blur} onClick={close}>
            <div className={styles.modal}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;