import './App.css';
import React, { useState, useRef, useContext, useEffect } from 'react';
import TodoInput from './TodoInput/index';
import TodoList from './TodoList/index';
import { ThemeContext } from './Theme/ThemeContext';
import ThemeToggle from './Theme/ThemeToggle';
import api from './API/api';

const FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete'
};

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);
  const { isDarkTheme } = useContext(ThemeContext);


  const getData = async () => {
    const data = await api.get("/todo-create");
    setData(data?.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleAddTodo = async () => {
    const name = inputRef.current.value.trim();
    if (!name) return;

    if (editId !== null) {
      try {
        const res = await api.put(`/todo-create/${editId}`, { name });
        if (res?.status < 400 && res?.status >= 200) {
          setData(prevData => prevData.map(item => item.id === editId ? res.data : item));
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    } else {
      try {
        const res = await api.post(`/todo-create`, { name: name, status: false })
        if (res?.status < 400 && res?.status >= 200) {
          setData((prev) => [...prev, res?.data])
        } else {
          console.error('Error adding todo');
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }

    setEditId(null);
    inputRef.current.value = '';
  };

  const handleDeleteTodo = async (id) => {
    try {
      const res = await api.delete(`/todo-create/${id}`);
      if (res?.status < 400 && res?.status >= 200){
        setData(prevData => prevData.filter(item => item.id !== id));
      } 
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    const todo = data.find(item => item.id === id);
    if (!todo) return;

    try {
      const response = await api.put(`/todo-create/${id}`, { status: !todo.status });
      setData(prevData => prevData.map(item => item.id === id ? response.data : item));
    } catch (error) {
      console.error('Error toggling todo status:', error);
    }
  };

  const handleClearAll = async () => {
    try {
      // const response = await api.get('/');
      // const deletePromises = await response.data.map(todo => api.delete(`/${todo.id}`));
      setData([]);
    } catch (error) {
      console.error('Error clearing todos:', error);
    }
  };

  const startEditTodo = (id, name) => {
    setEditId(id);
    inputRef.current.value = name;
  };

  const filteredData = data.filter(item => {
    if (filter === FILTERS.COMPLETED) return item.status;
    if (filter === FILTERS.INCOMPLETE) return !item.status;
    return true;
  });


  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return (
    <div className="App">
      {/* <div style={{ position: "absolute" , top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'black', opacity: 0.3}}>Loading.....</div> */}
      <h1>todos</h1>
      <TodoInput addTodo={handleAddTodo} inputRef={inputRef} />
      <TodoList
        data={filteredData}
        toggleTodo={handleToggleTodo}
        deleteTodo={handleDeleteTodo}
        startEditTodo={startEditTodo}
        setFilter={setFilter}
        clearAll={handleClearAll}
        filter={filter}
      />
      <div className='btn-tg'><ThemeToggle /></div>
    </div>
  );
}

export default App;
