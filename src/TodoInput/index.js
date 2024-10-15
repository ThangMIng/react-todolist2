import React from "react";
import '../App.css';

function TodoInput({ addTodo, inputRef }) {
    const handleAdd = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    }


    return (
        <input
            className="input-text"
            ref={inputRef}
            onKeyDown={handleAdd}
            type="text"
            placeholder="What needs to be done? ..."
        />
    );
}

export default TodoInput;