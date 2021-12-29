import React, { useContext } from "react";
import classes from "./TaskFilters.module.css";
import { TodoContext } from "../store/store-todo";
import { filter } from "../models/todo";

const TaskFilters = () => {
  const todoCtx = useContext(TodoContext);
  const changeFilter = todoCtx.changeFilter;
  const filterOrder = todoCtx.filter;
  console.log(todoCtx);

  const changeFilterOrder = (filter: filter) => {
    changeFilter(filter);
  };

  return (
    <ul className={classes["task-filters"]}>
      <li onClick={changeFilterOrder.bind(null, filter.all)}>
        <a
          className={filterOrder === filter.all ? classes.active : ""}
          href="#"
        >
          View All
        </a>
      </li>
      <li onClick={changeFilterOrder.bind(null, filter.active)}>
        <a
          className={filterOrder === filter.active ? classes.active : ""}
          href="#"
        >
          Active
        </a>
      </li>
      <li onClick={changeFilterOrder.bind(null, filter.completed)}>
        <a
          className={filterOrder === filter.completed ? classes.active : ""}
          href="#"
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TaskFilters;
