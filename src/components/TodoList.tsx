import React, { useContext, useEffect } from "react";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoList.module.css";
import TodoDetails from "./TodoDetails";

const TodoList = () => {
  const todoCtx = useContext(TodoContext);

  const todoList = todoCtx.todoList;
  const getTodo = todoCtx.getTodo;
  console.log(todoList);
  useEffect(() => {
    getTodo();
    console.log(todoList);
  }, []);

  return (
    <div className={classes.todoList}>
      {todoList.map((todo) => (
        <TodoDetails key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
