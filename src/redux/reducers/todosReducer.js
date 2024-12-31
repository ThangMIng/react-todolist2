import {
  FETCH_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  TOGGLE_TODO_STATUS_SUCCESS,
  DELETE_TODO_SUCCESS,
  CLEAR_ALL_TODOS,
} from "../actions/todoActions";

const initialState = {
  items: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        items: [...state.items,  { ...action.payload, createdAt: new Date().toLocaleString(),  }],
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case TOGGLE_TODO_STATUS_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case CLEAR_ALL_TODOS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default todosReducer;
