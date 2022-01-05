import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TodoList from "./TodoList";
import TodoModel, { filter } from "../models/todo";

interface IRenderOptions {
  todoList?: TodoModel[];
  filterOrder?: filter;
}

const renderTodoList = ({
  todoList = [],
  filterOrder = filter.all,
}: IRenderOptions = {}) => {
  return render(<TodoList todoList={todoList} filterOrder={filterOrder} />);
};

it("should render list correctly", () => {
  render(<TodoList todoList={[]} filterOrder={filter.all} />);

  expect(screen.getByText(/0 todos/i));
});

it("should render with custom renderer correctly", () => {
  renderTodoList();

  expect(screen.getByText(/0 todos/i));
});

it("should render list correctly", () => {
  renderTodoList({
    todoList: [
      {
        createdAt: new Date().toISOString(),
        id: "1",
        text: "Tests schreiben",
        complete: true,
      },
      {
        createdAt: new Date().toISOString(),
        id: "2",
        text: "Aufräumen",
        complete: false,
      },
    ],
  });

  expect(screen.getByText(/Tests schreiben/i));
  expect(screen.getByText(/Aufräumen/i));
  expect(screen.getByText(/2 Todos/i));
});

it("should show active items only", () => {
  renderTodoList({
    todoList: [
      {
        createdAt: new Date().toISOString(),
        id: "1",
        text: "Tests schreiben",
        complete: true,
      },
      {
        createdAt: new Date().toISOString(),
        id: "2",
        text: "Aufräumen",
        complete: false,
      },
    ],
    filterOrder: filter.active,
  });

  expect(screen.getByText(/Aufräumen/i));
  expect(screen.getByText(/1 Todos/i));
});

it("should show completed items only", () => {
  renderTodoList({
    todoList: [
      {
        createdAt: new Date().toISOString(),
        id: "1",
        text: "Tests schreiben",
        complete: true,
      },
      {
        createdAt: new Date().toISOString(),
        id: "2",
        text: "Aufräumen",
        complete: false,
      },
    ],
    filterOrder: filter.completed,
  });

  expect(screen.getByText(/Tests schreiben/i));
  expect(screen.getByText(/1 Todos/i));
});
