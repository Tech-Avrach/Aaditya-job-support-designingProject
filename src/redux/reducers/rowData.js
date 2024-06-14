import { DELETE_ROW_FAILURE, DELETE_ROW_REQUEST, DELETE_ROW_SUCCESS } from "../actions/types";

const initialState = {
  loading: false,
  error: null,
};

const rowDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ROW_REQUEST:
      return { ...state, loading: true };
    case DELETE_ROW_SUCCESS:
      return { ...state, loading: false, error: null };
    case DELETE_ROW_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default rowDeleteReducer;
