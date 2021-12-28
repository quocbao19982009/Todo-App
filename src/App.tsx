import React, { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoModel from "./models/todo";

function App() {
  return (
    <main className="App">
      <div className="container">
        <h1>Let's start learn TypeScript React</h1>
        <TodoForm />
        <TodoList />
      </div>
    </main>
  );
}

export default App;
