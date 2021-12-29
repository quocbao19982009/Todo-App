import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoModel from "./models/todo";
import { TodoContext } from "./store/store-todo";

function App() {
  return (
    <>
      <main className="App">
        <div className="container">
          <TodoForm />
          <TodoList />
        </div>
      </main>
      <footer>Made by Bao Nguyen</footer>
    </>
  );
}

export default App;
