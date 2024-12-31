import React, { useEffect, useRef, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/reset.css';
import { useScroll } from "../hooks/Scroll";
import { Input, Button, List, Checkbox, Typography } from 'antd';
import '../App.css'
import {
  toggleTodoStatus,
  deleteTodo,
  setFilter,
  clearAllTodos,
} from "../redux/actions/todoActions";

const FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
};

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.filter.filter);
  const search = useSelector((state) => state.search.search);
  const [max, setMax] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState([])

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      if (filter === FILTERS.COMPLETED) return todo.status;
      if (filter === FILTERS.INCOMPLETE) return !todo.status;
      return true;
    });
    setDataSearch(filteredTodos)
  }, [todos])

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      if (filter === FILTERS.COMPLETED) return todo.status;
      if (filter === FILTERS.INCOMPLETE) return !todo.status;
      return true;
    });

    const _dataSearch = filteredTodos.filter((item) => String(item.name).includes(search))
    setDataSearch(_dataSearch)
  }, [search])

  const fetchData = () => {
    if (max < todos.length) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setMax(max + 5);
      }, 1000)
    }
  }
  const scrollRef = useRef();

  const { handleScroll } = useScroll(scrollRef, fetchData)


  return (
    <>
      <div ref={scrollRef} onScroll={handleScroll} className="list-item">
        {dataSearch.map((todo, index) => index < max && (
          <div key={todo.id} className="todo">
            <input
              className="input-check"
              type="checkbox"
              checked={todo.status}
              onChange={() => dispatch(toggleTodoStatus(todo))}
            />
            <span className="title">{todo.name}</span>
            <small className="createAt">{todo.createdAt}</small>
            <Button className="btn-delete" onClick={() => dispatch(deleteTodo(todo.id))}>Delete</Button>
          </div>
        ))}
        {loading && <div>Loading .......</div>}
      </div>

      <div className="btn-footer">
        <Button onClick={() => dispatch(clearAllTodos())}>
          Clear All
        </Button>
        <Button onClick={() => dispatch(setFilter(FILTERS.ALL))}>
          All
        </Button>
        <Button onClick={() => dispatch(setFilter(FILTERS.COMPLETED))}>
          Completed
        </Button>
        <Button onClick={() => dispatch(setFilter(FILTERS.INCOMPLETE))}>
          Incomplete
        </Button>
      </div>
      
    </>
  );
}

export default TodoList;
