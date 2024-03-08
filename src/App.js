import { useState, useEffect } from 'react';

import Modal from "./components/layout/Modal";
import Container from "./components/layout/Container";
import Toolbar from "./components/layout/Toolbar";
import Todo from "./components/todo/Todo";
import TodoForm from "./components/todo/TodoForm";
import TodoDelete from "./components/todo/TodoDelete";

function App() {
  const [tasks, setTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(false);
  const [modalEdit, setModalEdit] = useState(undefined);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(undefined);

  useEffect( () => {
    fetch("http://localhost:5000/tasks", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then( resp => resp.json() )
    .then ( data => {
        setTasks(data);
    } )
    .catch( err => console.log(err) );
  }, [updateTasks]);

  function openAdd() {
    setModalAdd(true);
  }

  function openEdit(task) {
    setModalEdit(task);
  }
  function openDelete(id) {
    setModalDelete(id);
  }

  function closeModal() {
    setModalEdit(undefined);
    setModalAdd(false);
    setModalDelete(undefined);
  }

  function addTask(task) {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })
    .then( resp => resp.json() )
    .then ( data => {
      setModalAdd(false);
      setUpdateTasks(!updateTasks);
    } )
    .catch( err => console.log(err) );
  }

  function editTask(task) {
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setModalEdit(undefined);
      setUpdateTasks(!updateTasks);
    })
  }

  function deleteTask() {
    const task = modalDelete;
    fetch(`http://localhost:5000/tasks/${task}`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json"
      }
    })
    .then( resp => resp.json() )
    .then ( data => {
      setModalDelete(undefined);
      setUpdateTasks(!updateTasks);
    } )
    .catch( err => console.log(err) );
  }

  return (
    <div className="App">
      {modalAdd && 
        <Modal closeModal={closeModal}>
          <h2>Adicionar</h2>
          <TodoForm handleSubmit={addTask}/>
        </Modal>
      }
      {modalEdit && 
        <Modal closeModal={closeModal}>
          <h2>Editar</h2>
          <TodoForm taskData={modalEdit} handleSubmit={editTask}/>
        </Modal>
      }
      {modalDelete && 
        <Modal closeModal={closeModal}>
          <TodoDelete closeModal={closeModal} handleDelete={deleteTask}/>
        </Modal>
      }
      
      <Toolbar openAdd={openAdd} />
      <Container>
        { tasks.length > 0 &&
          tasks.map((task) => (
            <Todo 
              id={task.id}
              name={task.name}
              category={task.category}
              description={task.description}
              date={task.date}
              key={task.id}
              openEdit={openEdit}
              openDelete={openDelete}
            />
          ))
        }
      </Container>
    </div>
  );
}

export default App;
