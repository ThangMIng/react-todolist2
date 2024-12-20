import React from "react";
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/reset.css';
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

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTERS.COMPLETED) return todo.status;
    if (filter === FILTERS.INCOMPLETE) return !todo.status;
    return true;
  });


  return (
    <div className="list-item">
      {filteredTodos.map((todo) => (
        <div key={todo.id} className="todo">
          <input
            type="checkbox"
            checked={todo.status}
            onChange={() => dispatch(toggleTodoStatus(todo))}
          />
          <span>{todo.name}</span>
          <Button className="btn-delete" onClick={() => dispatch(deleteTodo(todo.id))}>Delete</Button>

        </div>
      ))}

      <div className="btn-footer">
        <Button  onClick={() => dispatch(clearAllTodos())}>
          Clear All
        </Button>
        <Button  onClick={() => dispatch(setFilter(FILTERS.ALL))}>
          All
        </Button>
        <Button  onClick={() => dispatch(setFilter(FILTERS.COMPLETED))}>
          Completed
        </Button>
        <Button  onClick={() => dispatch(setFilter(FILTERS.INCOMPLETE))}>
          Incomplete
        </Button>
      </div>
    </div>
  );
}

export default TodoList;
