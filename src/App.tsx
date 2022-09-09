import react, { useState, useEffect } from "react";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, addTodos, fetchTodos } from "./store/todoSlise";

function App() {
  const [text, setText] = useState("");
  const { status, error } = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addTodos(text));
    setText("");
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>ReduxToolkit</h1>
      <TodoForm text={text} setText={setText} addTask={addTask} />
      {status === "loading" && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <TodoList />
    </div>
  );
}

export default App;
