import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleTodoToggle = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )
    );
  };

  const handleTodoRemove = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <div className='app'>
      <h1>Todo App</h1>
      <div className='gap'>
        <form onSubmit={handleNewTodoSubmit}>
          <input
            type="text"
            value={newTodo}
            onChange={handleNewTodoChange}
            placeholder="Enter new todo"
          />
          <button type="submit" className='submit'>Add Todo</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => handleTodoToggle(index)}>Done</button>
              <button onClick={() => handleTodoRemove(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;