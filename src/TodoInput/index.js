import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import { useNavigate } from "react-router-dom";

function TodoInput() {
  const [inputValue, setInputValue] = useState("");
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
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
      placeholder="What needs to be done? ..."
    />
  );
}

export default TodoInput;
