import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "./redux/actions/todoActions";
import { ThemeContext } from "./Theme/ThemeContext";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import ThemeToggle from "./ThemeToggle";

function App() {
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  return (
    <div className="App">
      <h1>todos</h1>
      <TodoInput />
      <ThemeToggle/>
      <TodoList />
    </div>
  );
}

export default App;
