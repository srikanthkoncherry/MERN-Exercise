import React, { useState, useEffect } from 'react';
import './styles/Morph.css';
import './index.css';
import TaskList from './components/TaskList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const backendUrl = 'http://localhost:5050/api/todos';

  console.log("newtodo text", newTodoText)

  // Fetch todos from backend on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(backendUrl);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return; // Prevent adding empty todos

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodoText }),
      });

      const newTodo = await response.json();
      setTodos([...todos, newTodo]); // Add new todo to state
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleToggleCompleted = async (id) => {
    try {
      console.log("updating todo", id)
      const updatedTodo = { ...todos.find((todo) => todo._id === id) };
      updatedTodo.completed = !updatedTodo.completed;

      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
        console.log("id ", id, " updated successfully")
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1 className='textLeft'>Todo List</h1>
      <div className="input-group mb-3">
        <input type="text" className="form-control inputCustom" placeholder="Enter new task" value={newTodoText} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleAddTodo}>Add Task</button>
      </div>
      <TaskList todos={todos} onToggleCompleted={handleToggleCompleted} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
}

export default App;
