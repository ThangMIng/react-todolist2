import React, { useState, useEffect, useCallback } from "react";
import useInfiniteScroll from '../hooks/Scroll';
import '../App.css';

const FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete'
};

function TodoList({ data, toggleTodo, deleteTodo, startEditTodo, clearAll, setFilter, filter }) {
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [listRef, isFetching, setIsFetching] = useInfiniteScroll();

  const loadMoreItems = useCallback(() => {
    const newItems = data.slice(0, page * itemsPerPage);
    setPaginatedData(newItems);
    setIsFetching(false);
  }, [page, data, setIsFetching]);

  useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);

  useEffect(() => {
    if (isFetching) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isFetching]);

  useEffect(() => {
    setPage(1);
    setPaginatedData(data.slice(0, itemsPerPage));
  }, [filter, data]);

  return (
    <div className="list-item" ref={listRef} style={{ height: '400px', overflowY: 'auto' }}>
      <div className="list">
        {paginatedData.map((item) => (
          <div
            className="todo"
            key={item.id}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => toggleTodo(item.id)}
              style={{ marginRight: '10px' }}
            />
            <div
              className="todo-item"
              style={{ flex: 1, cursor: 'pointer', textDecoration: item.status ? 'line-through' : 'none' }}
            >
              {item.name}
            </div>
            <button className="btn-edit" onClick={() => startEditTodo(item.id, item.name)}>Sửa</button>
            <button className="btn-x" onClick={() => deleteTodo(item.id)}>x</button>
          </div>
        ))}
      </div>
      <div className="under">
        <button className="btn-1" onClick={clearAll}>Clear All</button>
        <div className="filter-buttons">
          <button 
            className={filter === FILTERS.ALL ? 'active' : ''} 
            onClick={() => setFilter(FILTERS.ALL)}
          >
            Tất cả
          </button>
          <button 
            className={filter === FILTERS.COMPLETED ? 'active' : ''} 
            onClick={() => setFilter(FILTERS.COMPLETED)}
          >
            Đã làm
          </button>
          <button 
            className={filter === FILTERS.INCOMPLETE ? 'active' : ''} 
            onClick={() => setFilter(FILTERS.INCOMPLETE)}
          >
            Chưa làm
          </button>
        </div>
      </div>
      {isFetching && <div>Loading more items...</div>}
    </div>
  );
}

export default TodoList;
