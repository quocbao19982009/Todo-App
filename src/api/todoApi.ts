import TodoModel from "../models/todo";

export const addTodosAPI = async (todo: TodoModel) => {
  try {
    const response = await fetch(
      "https://todo-app-16d97-default-rtdb.europe-west1.firebasedatabase.app/todoList.json",
      {
        method: "POST",
        body: JSON.stringify({ ...todo }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Sending Todo Fail");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error("Sending Todo Fail");
  }
};

export const removeTodoAPI = async (code: string) => {
  try {
    const response = await fetch(
      `https://todo-app-16d97-default-rtdb.europe-west1.firebasedatabase.app/todoList/${code}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Delete Todo Fail");
    }
  } catch (error) {
    throw new Error("Cannot Delete Todos");
  }
};

export const editTodoAPI = async (code: string, updateText: string) => {
  try {
    const response = await fetch(
      `https://todo-app-16d97-default-rtdb.europe-west1.firebasedatabase.app/todoList/${code}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ text: updateText }),
      }
    );

    if (!response.ok) {
      throw new Error("Updating Todo Fail");
    }
    const data = await response.json();

    console.log(response);
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};

export const checkTodoAPI = async (code: string, updateComplete: boolean) => {
  try {
    const response = await fetch(
      `https://todo-app-16d97-default-rtdb.europe-west1.firebasedatabase.app/todoList/${code}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ complete: updateComplete }),
      }
    );

    if (!response.ok) {
      throw new Error("Updating Todo Fail");
    }
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};

export const getTodosAPI = async () => {
  try {
    const response = await fetch(
      "https://todo-app-16d97-default-rtdb.europe-west1.firebasedatabase.app/todoList.json"
    );

    if (!response.ok) {
      throw new Error("Cannot get Todos, please check source");
    }

    const data = await response.json();

    const loadedTodos: TodoModel[] = [];

    for (const key in data) {
      loadedTodos.push({
        code: key,
        id: data[key].id,
        text: data[key].text,
        createdAt: data[key].createdAt,
        complete: data[key].complete,
      });
    }

    return loadedTodos;
  } catch (error) {
    throw new Error("Cannot get Todos");
  }
};
