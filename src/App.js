import { useState, useEffect, useMemo } from 'react';

import Modal from './components/layout/Modal';
import Container from './components/layout/Container';

import Toolbar from './components/layout/Toolbar';
import Todo from './components/todo/Todo';

import Filter from './components/filter/Filter';
import TodoForm from './components/todo/TodoForm';
import TodoDelete from './components/todo/TodoDelete';

function App() {
  const [tasks, setTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(false);

  const [modalFilter, setModalFilter] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(undefined);
  const [modalDelete, setModalDelete] = useState(undefined);

  const [filters, setFilters] = useState({conclusion: {id: 'todos'}, checkedValues: ['baixa', 'media', 'alta'], date: ''});
  const [searchbar, setSearchbar] = useState('');
  const sortedTasks = useMemo(() => sortTaks(), [tasks, filters, searchbar]);

  useEffect( () => {
    fetch('https://todo-list-b1551-default-rtdb.firebaseio.com/tasks.json', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
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
    task.name ??= 'Sem nome';
    task.category ??= {
      'id': '4',
      'name': 'Outro'
    };
    task.importance ??= {
      'id': 'baixa',
      'name': 'Baixa'
    }
    task.completed = false;
    fetch('https://todo-list-b1551-default-rtdb.firebaseio.com/tasks.json', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then( resp => resp.json() )
    .then ( data => {
      setModalAdd(false);
      setUpdateTasks(!updateTasks);
    })
    .catch( err => console.log(err) );
  }

  function editTask(task) {
    fetch(`https://todo-list-b1551-default-rtdb.firebaseio.com/tasks/${task.id}.json`, {
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
    fetch(`https://todo-list-b1551-default-rtdb.firebaseio.com/tasks/${task}.json`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then( resp => resp.json() )
    .then ( data => {
      setModalDelete(undefined);
      setUpdateTasks(!updateTasks);
    })
    .catch( err => console.log(err) );
  }

  function completeTask(id, completed) {
    let update = {
      'completed': !completed
    }
    fetch(`https://todo-list-b1551-default-rtdb.firebaseio.com/tasks/${id}.json`, {
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

  function changeFilters(filters) {
    setFilters(filters);
    setModalFilter(false);
    setUpdateTasks(!updateTasks);
  }

  function sortTaks() {
    if (tasks === null) {
      return []
    }
    const tasksSorted = Object.entries(tasks).map(([key, value]) => ({ id: key, ...value }));
    const filterSort = filters;
    const searchbarSort = searchbar;
    
    return tasksSorted.filter(task => {
      if (searchbarSort && !task.name.toLowerCase().includes(searchbarSort.toLowerCase())) {
        return false;
      }
  
      if (filterSort.conclusion.id === 'concluidos' && !task.completed) {
        return false;
      }

      if (filterSort.conclusion.id === 'nao-concluidos' && task.completed) {
        return false;
      }

      if (!filterSort.checkedValues.includes(task.importance.id)) {
        return false;
      }

      if (filterSort.date && task.date !== filterSort.date) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterSort.conclusion.id === 'todos') {
        if (a.completed === b.completed) {
          return new Date(a.date) - new Date(b.date);
        }
        return a.completed ? 1 : -1;
      }
      
      return new Date(a.date) - new Date(b.date);
    });
  }

  return (
    <div className='App'>
      {modalFilter && 
        <Modal closeModal={closeModal}>
          <h2>Filtrar</h2>
          <Filter previousFilter={filters} handleSubmit={changeFilters}/>
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
      
      <Toolbar openAdd={openAdd} openFilter={openFilter} setSearchbar={setSearchbar}/>
      <Container>
        { sortedTasks.length > 0 &&
          sortedTasks.map((task) => (
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
