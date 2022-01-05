import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MockDate from "mockdate";

import TodoForm from "./TodoForm";
import TodoModel from "../models/todo";

interface IRenderOptions {
  addTodo?: (todo: TodoModel) => void;
}

const renderTodoForm = ({ addTodo = jest.fn() }: IRenderOptions = {}) => {
  return render(<TodoForm addTodo={addTodo} />);
};

beforeEach(() => {
  MockDate.set(new Date("2021-01-05"));
});

afterEach(() => {
  MockDate.reset();
});

it("should render filters correctly", () => {
  renderTodoForm();

  expect(screen.getByRole("button", { name: /view all/i })).toHaveClass(
    "active"
  );
  expect(screen.getByRole("button", { name: /active/i }));
  expect(screen.getByRole("button", { name: /completed/i }));
});

it("should add new todo", async () => {
  const addTodo = jest.fn();

  renderTodoForm({ addTodo });

  expect(screen.getByPlaceholderText(/What needs to be done?/i));

  expect(addTodo).not.toHaveBeenCalled();

  await userEvent.type(
    screen.getByPlaceholderText(/What needs to be done?/i),
    "Mehr Tests"
  );

  expect(addTodo).not.toHaveBeenCalled();

  await userEvent.type(
    screen.getByPlaceholderText(/What needs to be done?/i),
    "{enter}"
  );

  expect(addTodo).toHaveBeenCalledTimes(1);
  expect(addTodo).toHaveBeenCalledWith({
    text: "Mehr Tests",
    id: "1609804800000",
    complete: false,
    createdAt: "2021-01-05T00:00:00.000Z",
  });
});

it("should not add empty todos", async () => {
  const addTodo = jest.fn();

  renderTodoForm({ addTodo });

  await userEvent.type(
    screen.getByPlaceholderText(/What needs to be done?/i),
    "   {enter}"
  );

  expect(addTodo).not.toHaveBeenCalled();
});
