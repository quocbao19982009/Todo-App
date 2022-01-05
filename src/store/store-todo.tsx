import React, { useState, createContext } from "react";
import {
  getTodosAPI,
  addTodosAPI,
  removeTodoAPI,
  editTodoAPI,
  checkTodoAPI,
} from "../api/todoApi";

import TodoModel, { filter } from "../models/todo";

interface TodoContextInterface {
  todoList: TodoModel[];
  filter: filter;
  changeFilter: (filterOrder: filter) => void;
  getTodo: () => void;
  addTodo: (todo: TodoModel) => void;
  removeTodo: (id: string) => void;
  checkTodo: (id: string) => void;
  updateTodo: (id: string, textInput: string) => void;
}

export const TodoContext = createContext<TodoContextInterface>({
  todoList: [],
  filter: filter.all,
  changeFilter: (filterOrder: filter) => {},
  getTodo: () => {},
  addTodo: (todo: TodoModel) => {},
  removeTodo: (id: string) => {},
  checkTodo: (id: string) => {},
  updateTodo: (id: string, textInput: string) => {},
});

const TodoContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filterOrder, setFilterOrder] = useState<filter>(filter.all);

  const changeFilterHandler = (filterOrder: filter) => {
    setFilterOrder(filterOrder);
  };

  const getTodoHandler = async () => {
    const loadedTodos = await getTodosAPI();
    setTodos(loadedTodos);
  };

  const addTodoHandler = async (todo: TodoModel) => {
    await addTodosAPI(todo);

    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
  };

  const removeTodoHanlder = async (id: string) => {
    await removeTodoAPI(id);
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const checkTodoHandler = async (id: string) => {
    const targetTodoIndex = todos.findIndex((todo) => todo.id === id);
    const targetTodo = todos[targetTodoIndex];
    const updateTodo = { ...targetTodo, complete: !targetTodo.complete };
    let updateTodos = [...todos];
    updateTodos[targetTodoIndex] = updateTodo;
    setTodos(updateTodos);
    await checkTodoAPI(id, !targetTodo.complete);
  };

  const updatingTodoHandler = async (id: string, textInput: string) => {
    const targetTodoIndex = todos.findIndex((todo) => todo.id === id);
    const targetTodo = todos[targetTodoIndex];
    const updateTodo: TodoModel = { ...targetTodo, text: textInput };
    let updateTodos = [...todos];
    updateTodos[targetTodoIndex] = updateTodo;
    setTodos(updateTodos);
    await editTodoAPI(id, textInput);
  };

  const todoContextValue: TodoContextInterface = {
    todoList: todos,
    filter: filterOrder,
    changeFilter: changeFilterHandler,
    getTodo: getTodoHandler,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHanlder,
    checkTodo: checkTodoHandler,
    updateTodo: updatingTodoHandler,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
