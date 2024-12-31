import { SEARCH_TODOS } from "../actions/todoActions";

const initialState = {
  search: "", 
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TODOS:
        return{
          ...state,
          search: action.payload,
        };
    default:
      return state;
  }
};

export default searchReducer;
