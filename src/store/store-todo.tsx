import React, { useState, createContext } from "react";
import TodoList from "../components/TodoList";
import {
  getTodosAPI,
  addTodosAPI,
  removeTodoAPI,
  editTodoAPI,
  checkTodoAPI,
} from "../api/todoApi";

import TodoModel from "../models/todo";

interface TodoContextInterface {
  todoList: TodoModel[];
  getTodo: () => void;
  addTodo: (todo: TodoModel) => void;
  removeTodo: (id: string) => void;
  checkTodo: (id: string) => void;
  updateTodo: (id: string, textInput: string) => void;
}

export const TodoContext = createContext<TodoContextInterface>({
  todoList: [],
  getTodo: () => {},
  addTodo: (todo: TodoModel) => {},
  removeTodo: (id: string) => {},
  checkTodo: (id: string) => {},
  updateTodo: (id: string, textInput: string) => {},
});

const TodoContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  const getTodoHandler = async () => {
    const loadedTodos = await getTodosAPI();
    setTodos(loadedTodos);
  };

  const addTodoHandler = async (todo: TodoModel) => {
    let code;
    code = await addTodosAPI({ ...todo, createdAt: new Date().toISOString() });
    const newTodo: TodoModel = {
      code: code.name,
      ...todo,
      createdAt: new Date().toISOString(),
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHanlder = async (code: string) => {
    await removeTodoAPI(code);
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.code !== code);
    });
  };

  const checkTodoHandler = async (code: string) => {
    const targetTodoIndex = todos.findIndex((todo) => todo.code === code);
    const targetTodo = todos[targetTodoIndex];
    const updateTodo = { ...targetTodo, complete: !targetTodo.complete };
    let updateTodos = [...todos];
    updateTodos[targetTodoIndex] = updateTodo;
    setTodos(updateTodos);
    await checkTodoAPI(code, !targetTodo.complete);
  };

  const updatingTodoHandler = async (code: string, textInput: string) => {
    const targetTodoIndex = todos.findIndex((todo) => todo.code === code);
    const targetTodo = todos[targetTodoIndex];
    const updateTodo: TodoModel = { ...targetTodo, text: textInput };
    let updateTodos = [...todos];
    updateTodos[targetTodoIndex] = updateTodo;
    setTodos(updateTodos);
    await editTodoAPI(code, textInput);
  };

  const todoContextValue: TodoContextInterface = {
    todoList: todos,
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
