import api from "../../API/api";

export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const TOGGLE_TODO_STATUS_SUCCESS = 'TOGGLE_TODO_STATUS_SUCCESS';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const SET_FILTER = 'SET_FILTER';
export const CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS';

const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos,
});

const addTodoSuccess = (todo) => ({
  type: ADD_TODO_SUCCESS,
  payload: todo,
});

const updateTodoSuccess = (todo) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: todo,
});

const toggleTodoStatusSuccess = (todo) => ({
  type: TOGGLE_TODO_STATUS_SUCCESS,
  payload: todo,
});

const deleteTodoSuccess = (id) => ({
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

export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await api.get("/todo-create");
    dispatch(fetchTodosSuccess(response.data));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const addTodo = (name) => async (dispatch) => {
  try {
    const response = await api.post("/todo-create", { name, status: false });
    dispatch(addTodoSuccess(response.data));
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const updateTodo = (id, name) => async (dispatch) => {
  try {
    const response = await api.put(`/todo-create/${id}`, { name });
    dispatch(updateTodoSuccess(response.data));
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const toggleTodoStatus = (id) => async (dispatch, getState) => {
  try {
    const todo = getState().todos.items.find((item) => item.id === id);
    const response = await api.put(`/todo-create/${id}`, { status: !todo.status });
    dispatch(toggleTodoStatusSuccess(response.data));
  } catch (error) {
    console.error("Error toggling todo status:", error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.delete(`/todo-create/${id}`);
    dispatch(deleteTodoSuccess(id));
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
