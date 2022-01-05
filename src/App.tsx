import { useContext, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoContext } from "./store/store-todo";

function App() {
  const todoCtx = useContext(TodoContext);

  const todoList = todoCtx.todoList;
  const getTodo = todoCtx.getTodo;
  const filterOrder = todoCtx.filter;
  const addTodo = todoCtx.addTodo;

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <main className="App">
        <div className="container">
          <TodoForm addTodo={addTodo} />
          <TodoList todoList={todoList} filterOrder={filterOrder} />
        </div>
      </main>
      <footer>Made by Bao Nguyen</footer>
    </>
  );
}

export default App;
