import TodoModel from "../models/todo";

export const addTodosAPI = async (todo: TodoModel) => {
  try {
    const todos: {
      [key: string]: {
        complete: boolean;
        createdAt: string;
        id: string;
        text: string;
      };
    } = JSON.parse(localStorage.getItem("todos") || "{}");

    todos[todo.id] = todo;

    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (e) {
    throw new Error("Sending Todo Fail");
  }
};

export const removeTodoAPI = async (id: string) => {
  try {
    const todos: {
      [key: string]: {
        complete: boolean;
        createdAt: string;
        id: string;
        text: string;
      };
    } = JSON.parse(localStorage.getItem("todos") || "{}");

    delete todos[id];

    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    throw new Error("Cannot Delete Todos");
  }
};

export const editTodoAPI = async (id: string, updateText: string) => {
  try {
    const todos: {
      [key: string]: {
        complete: boolean;
        createdAt: string;
        id: string;
        text: string;
      };
    } = JSON.parse(localStorage.getItem("todos") || "{}");

    todos[id].text = updateText;

    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};

export const checkTodoAPI = async (id: string, updateComplete: boolean) => {
  try {
    const todos: {
      [key: string]: {
        complete: boolean;
        createdAt: string;
        id: string;
        text: string;
      };
    } = JSON.parse(localStorage.getItem("todos") || "{}");

    todos[id].complete = updateComplete;

    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};

export const getTodosAPI = () => {
  try {
    const todos: {
      [key: string]: {
        complete: boolean;
        createdAt: string;
        id: string;
        text: string;
      };
    } = JSON.parse(localStorage.getItem("todos") || "{}");

    return Object.values(todos);
  } catch (error) {
    throw new Error("Cannot get Todos");
  }
};
