import './App.css';
import React, { useState, useRef, useContext, useMemo, useEffect } from 'react';
import TodoInput from './TodoInput/index'
import TodoList from './TodoList/index';
import { ThemeContext } from './Theme/ThemeContext';
import ThemeToggle from './Theme/ThemeToggle';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);
  const { isDarkTheme } = useContext(ThemeContext);

  const addTodo = () => {
    const name = inputRef.current.value.trim();
    if (editId !== null) {
      setData(prevData => prevData.map(item => item.id === editId ? { ...item, name } : item));
      setEditId(null);
    } else if (name) {
      const newData = [...data, { id: findMax() + 1, name, status: false }];
      setData(newData);
    }
    inputRef.current.value = '';
  }

  const findMax = () => {
    return data.length ? Math.max(...data.map(item => item.id)) : 0;
  }

  const startEditTodo = (id, name) => {
    setEditId(id);
    inputRef.current.value = name;
  }

  const deleteTodo = (id) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  }

  const toggleTodo = (id) => {
    setData(prevData => prevData.map(item => item.id === id ? { ...item, status: !item.status } : item));
  }

  const clearAll = () => {
    setData([]);
  }

  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (filter === 'completed') return item.status;
      if (filter === 'incompleted') return !item.status;
      return true;
    });
  }, [data, filter]);

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return (
    <div className="App">
      <h1>todos</h1>
      <TodoInput addTodo={addTodo} inputRef={inputRef} />
      <TodoList
        data={filteredData}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        startEditTodo={startEditTodo}
        setFilter={setFilter}
        clearAll={clearAll}
      />
      <div className='btn-tg'><ThemeToggle /></div>
    </div>
  );
}

export default App;
