import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../redux/actions/todoActions";
import { useNavigate } from "react-router-dom";

function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()));
      setInputValue("");
      navigate("/");
    }
  };

  return (
    <input
      className="input-text"
      value={inputValue}
      onClick={() => dispatch(updateTodo(inputValue))}
      onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
      placeholder="What needs to be done? ..."
    />
  );
}

export default TodoInput;
