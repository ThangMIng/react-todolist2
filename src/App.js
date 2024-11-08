import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
  setFilter,
  clearAllTodos,
} from "./redux/actions/todoActions";

import { ThemeContext } from "./Theme/ThemeContext";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import ThemeToggle from "./ThemeToggle";

const FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
};

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.filter.filter);
  const { isDarkTheme } = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter((item) => {
    if (filter === FILTERS.COMPLETED) return item.status;
    if (filter === FILTERS.INCOMPLETE) return !item.status;
    return true;
  });

  const handleAddTodo = () => {
    const name = inputValue.trim();
    if (!name) return;

    if (editId) {
      dispatch(updateTodo(editId, name));
      setEditId(null);
    } else {
      dispatch(addTodo(name));
    }
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodoStatus(id));
  };

  const handleClearAll = () => {
    dispatch(clearAllTodos());
  };

  const startEdit = (id, name) => {
    setEditId(id);
    setInputValue(name);
  };

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  return (
    <div className="App">
      <h1>todos</h1>
      <TodoInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTodo={handleAddTodo}
        inputRef={inputRef}
      />
      <ThemeToggle />
      <TodoList
        todos={filteredTodos}
        toggleTodo={handleToggleTodo}
        deleteTodo={handleDeleteTodo}
        startEdit={startEdit}
        setFilter={(filter) => dispatch(setFilter(filter))}
        filter={filter}
        clearAll={handleClearAll}
      />
    </div>
  );
}

export default App;
