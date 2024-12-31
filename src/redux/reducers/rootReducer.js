import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import filterReducer from "./filterReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  search: searchReducer,
});

export default rootReducer;
