import React, { useState , useRef} from "react";
import { useDispatch } from "react-redux";
import { addTodo,searchTodo } from "../redux/actions/todoActions";
import { useNavigate } from "react-router-dom";
import { Input, Button, List, Checkbox, Typography } from 'antd';


function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();


  const searchInput = () => {
    const valueSearch = inputRef.current.value
    dispatch(searchTodo(valueSearch));
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() ) {
      dispatch(addTodo(inputValue));  
      setInputValue("");  
      navigate("/");  
    }
  };

  return (
  <>
    <Input
      className="input-text"
      value={inputValue}  
      onChange={handleInputChange}  
      onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}  
      placeholder="What needs to be done? ..."
      ref={inputRef}
    />
    <Button className="btn-search" onClick={() => searchInput()}>Search</Button>
  </>
  );
}

export default TodoInput;
