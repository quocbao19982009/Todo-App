import React, { useRef } from "react";
import TodoModel from "../models/todo";
import classes from "./TodoForm.module.css";
import TaskFilters from "./TaskFilters";

const TodoForm: React.FC<{ addTodo: (todo: TodoModel) => void }> = ({
  addTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: TodoModel = {
      text: inputRef.current!.value,
      id: new Date().getTime().toString(),
      complete: false,
      createdAt: new Date().toISOString(),
    };

    if (newTodo.text.trim() === "") {
      return;
    }
    addTodo(newTodo);

    inputRef.current!.value = "";
  };
  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          className={classes.form_input}
          id="todoText"
          type="text"
          maxLength={64}
          placeholder="What needs to be done?"
          ref={inputRef}
        ></input>
      </form>
      <TaskFilters />
    </div>
  );
};

export default TodoForm;
