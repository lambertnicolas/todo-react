import "./styles/App.css";
import logo from "./img/logo.jpg";
import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import { v4 as uuid } from "uuid";
import Button from "@mui/material/Button";

//Stockage local
const LOCAL_STORAGE_KEY = "todoApp.todos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  };

  const handleClearTodos = (e) => {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  };

  return (
    <>
      <div>
        <header>
          <div className="divhead">
            <img src={logo} alt="logo" className="App-logo" />
            <h1>Todo List</h1>
            <img src={logo} alt="logo" className="App-logo" />
          </div>
        </header>
        <main>
          <input
            className="addinput"
            ref={todoNameRef}
            placeholder="Add Todo"
            type="text"
          />
          <div className="btns">
            <Button
              variant="outlined"
              color="success"
              onClick={handleAddTodo}
              id="btn"
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearTodos}
              id="btn"
            >
              Clear
            </Button>
          </div>
          <p className="todo">
            {" "}
            You have {todos.filter((todo) => !todo.complete).length} things to
            do left !
          </p>
          <div className="list">
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
