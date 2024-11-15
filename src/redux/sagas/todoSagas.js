import { takeEvery, call, put } from 'redux-saga/effects';
import api from '../../API/api';
import {
  FETCH_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  TOGGLE_TODO_STATUS,
  DELETE_TODO,
  CLEAR_ALL_TODOS,
  SET_FILTER_TODOS,
  fetchTodosSuccess,
  addTodoSuccess,
  updateTodoSuccess,
  toggleTodoStatusSuccess,
  deleteTodoSuccess,
  clearAllTodos,
  setFilter,
} from '../actions/todoActions';

function* fetchTodosSaga() {
  try {
    const response = yield call(api.get, '/todo-create');
    yield put(fetchTodosSuccess(response.data)); 
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

function* addTodoSaga(action) {
  try {
    const response = yield call(api.post, '/todo-create', {
      name: action.payload.name,
      status: false,
    });
    yield put(addTodoSuccess(response.data)); 
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}

function* updateTodoSaga(action) {
  try {
    const response = yield call(api.put, `/todo-create/${action.payload.id}`, {
      name: action.payload.name,
    });
    yield put(updateTodoSuccess(response.data)); 
  } catch (error) {
    console.error('Error updating todo:', error);
  }
}

function* toggleTodoStatusSaga(action) {
  try {
    const response = yield call(api.put, `/todo-create/${action.payload.id}`, {
      status: action.payload.status,
    });
    yield put(toggleTodoStatusSuccess(response.data)); 
  } catch (error) {
    console.error('Error toggling todo status:', error);
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(api.delete, `/todo-create/${action.payload}`);
    yield put(deleteTodoSuccess(action.payload)); 
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

function* clearAllTodosSaga() {
  try { 
    yield put(clearAllTodos()); 
  } catch (error) {
    console.error('Error clearing all todos:', error);
  }
}

function* setFilterSaga() {
    try { 
      yield put(setFilter()); 
    } catch (error) {
      console.error('Error clearing all todos:', error);
    }
  }

function* todoSagas() {
  yield takeEvery(FETCH_TODOS, fetchTodosSaga); 
  yield takeEvery(ADD_TODO, addTodoSaga); 
  yield takeEvery(UPDATE_TODO, updateTodoSaga); 
  yield takeEvery(TOGGLE_TODO_STATUS, toggleTodoStatusSaga); 
  yield takeEvery(DELETE_TODO, deleteTodoSaga); 
  yield takeEvery(CLEAR_ALL_TODOS, clearAllTodosSaga); 
  yield takeEvery(SET_FILTER_TODOS,setFilterSaga )
}

export default todoSagas;
