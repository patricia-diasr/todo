import { useState, useEffect } from 'react';

import Container from "./components/layout/Container";
import Toolbar from "./components/layout/Toolbar";
import Todo from "./components/todo/Todo";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
    } )
    .catch( err => console.log(err) );
  }, []);

  return (
    <div className="App">
      <Toolbar />
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
              // handleRemove={removeTask}
            />
          ))
        }
      </Container>
    </div>
  );
}

export default App;
