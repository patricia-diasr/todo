import { useState, useEffect } from 'react';

import Modal from "./components/layout/Modal";
import Container from "./components/layout/Container";
import Toolbar from "./components/layout/Toolbar";
import Todo from "./components/todo/Todo";
import Filter from './components/filter/Filter';
import TodoForm from "./components/todo/TodoForm";
import TodoDelete from "./components/todo/TodoDelete";

function App() {
  const [tasks, setTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(undefined);
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

  
  function openFilter() {
    setModalFilter(true);
  }

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
    setModalFilter(false);
    setModalAdd(false);
    setModalEdit(undefined);
    setModalDelete(undefined);
  }

  function addTask(task) {
    task.name ??= "Sem nome";
    task.category ??= {
      "id": "4",
      "name": "Outro"
    };
    task.importance ??= {
      "id": "C",
      "name": "Baixa"
    }
    task.completed = false;
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

  function completeTask(id, completed) {
    let update = {
      "completed": !completed
    }
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setModalEdit(undefined);
      setUpdateTasks(!updateTasks);
    })
  }

  function sortTaks() {
    let tasksSorted = tasks;
    tasksSorted.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      if (a.completed) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      }
      return 0;
    });
    return tasksSorted;
  }

  return (
    <div className="App">
      {modalFilter && 
        <Modal closeModal={closeModal}>
          <h2>Filtrar</h2>
          <Filter />
        </Modal>
      }
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
          <h2>Deletar</h2>
          <TodoDelete closeModal={closeModal} handleDelete={deleteTask}/>
        </Modal>
      }
      
      <Toolbar openAdd={openAdd} openFilter={openFilter}/>
      <Container>
        { sortTaks().length > 0 &&
          sortTaks().map((task) => (
            <Todo 
              id={task.id}
              name={task.name}
              category={task.category}
              importance={task.importance.id}
              description={task.description}
              date={task.date}
              completed = {task.completed}
              key={task.id}
              openEdit={openEdit}
              openDelete={openDelete}
              completeTask={completeTask}
            />
          ))
        }
      </Container>
    </div>
  );
}

export default App;
