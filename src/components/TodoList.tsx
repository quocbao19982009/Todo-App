import React, { useContext, useEffect } from "react";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoList.module.css";
import TodoDetails from "./TodoDetails";
import { filter } from "../models/todo";

const TodoList = () => {
  const todoCtx = useContext(TodoContext);

  const todoList = todoCtx.todoList;
  const getTodo = todoCtx.getTodo;
  const filterOrder = todoCtx.filter;

  useEffect(() => {
    getTodo();
  }, []);

  const allTodos =
    filterOrder === filter.all &&
    todoList.map((todo) => <TodoDetails key={todo.id} todo={todo} />);

  const completedTodos =
    filterOrder === filter.completed &&
    todoList
      .filter((todo) => todo.complete === true)
      .map((todo) => <TodoDetails key={todo.id} todo={todo} />);

  const activeTodos =
    filterOrder === filter.active &&
    todoList
      .filter((todo) => todo.complete === false || true)
      .map((todo) => <TodoDetails key={todo.id} todo={todo} />);

  return (
    <div className={classes.todoList}>
      {allTodos}

      {completedTodos}

      {activeTodos}
    </div>
  );
};

export default TodoList;
