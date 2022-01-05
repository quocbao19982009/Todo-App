import { useContext } from "react";
import classes from "./TaskFilters.module.css";
import { TodoContext } from "../store/store-todo";
import { filter } from "../models/todo";

const TaskFilters = () => {
  const todoCtx = useContext(TodoContext);
  const changeFilter = todoCtx.changeFilter;
  const filterOrder = todoCtx.filter;

  const changeFilterOrder = (filter: filter) => {
    changeFilter(filter);
  };

  return (
    <ul className={classes["task-filters"]}>
      <li onClick={changeFilterOrder.bind(null, filter.all)}>
        <button className={filterOrder === filter.all ? classes.active : ""}>
          View All
        </button>
      </li>
      <li onClick={changeFilterOrder.bind(null, filter.active)}>
        <button className={filterOrder === filter.active ? classes.active : ""}>
          Active
        </button>
      </li>
      <li onClick={changeFilterOrder.bind(null, filter.completed)}>
        <button
          className={filterOrder === filter.completed ? classes.active : ""}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TaskFilters;
