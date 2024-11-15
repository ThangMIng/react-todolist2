export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const TOGGLE_TODO_STATUS_SUCCESS = 'TOGGLE_TODO_STATUS_SUCCESS';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const SET_FILTER = 'SET_FILTER';
export const CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS';

export const ADD_TODO ='ADD_TODO';
export const FETCH_TODOS ='FTCH_TODOS';
export const UPDATE_TODO ='UPDATE_TODO';
export const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';
export const DELETE_TODO = 'DELETE_TODO';

export const fetchTodos = (payload) => ({
  type: FETCH_TODOS,
  payload,
})

export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const addTodo = (payload) => ({
  type: ADD_TODO,
  payload,
})

export const addTodoSuccess = (todo) => ({
  type: ADD_TODO_SUCCESS,
  payload: todo,
});

export const updateTodo = (payload) => ({
  type: UPDATE_TODO,
  payload,
})

export const updateTodoSuccess = (todo) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: todo,
});

export const toggleTodoStatus = (payload) => ({
  type: TOGGLE_TODO_STATUS,
  payload,
})

export const toggleTodoStatusSuccess = (todo) => ({
  type: TOGGLE_TODO_STATUS_SUCCESS,
  payload: todo,
});

export const deleteTodo = (payload) => ({
  type: DELETE_TODO,
  payload,
})

export const deleteTodoSuccess = (id) => ({
  type: DELETE_TODO_SUCCESS,
  payload: id,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const clearAllTodos = () => ({
  type: CLEAR_ALL_TODOS,
});
