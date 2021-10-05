//importing useState and useEffect from react library
import React, { useState, useEffect } from 'react';

import './App.css';

//components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //inputText is the actual value and setInputText is the function
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  //executes filterHandler everytime there is a change in todos or status
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status){
      case 'completed': 
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //functions with local storage
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodos);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>My To Do List</h1>
      </header>
      <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} setStatus={setStatus}/>
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
