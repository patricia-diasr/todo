import Container from "./components/layout/Container";
import Toolbar from "./components/layout/Toolbar";
import Todo from "./components/todo/Todo";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Container>
        <Todo />
      </Container>
    </div>
  );
}

export default App;
