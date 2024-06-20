import {
  RETRIEVE_USERS,
  RETRIEVE_LOGGEDIN_USER,
  UPDATE_USER,
  UPDATE_USER_STATUS,
  RESTORE_USER,
  DELETE_USER,
  CREATE_USER,
  ADD_USER_SUPERADMIN,
  RESTORE_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT_STATUS,
  UPDATE_EMAIL_STATUS,
  UPDATE_USER_ACCOUNT_TYPE,
} from "../actions/types";

const initialState = { users: [], totalUserCount: 0, selectedAccountType: 0 };

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_USERS:
      return {
        users: payload.rows,
        totalUserCount: payload.count,
      };

    case RETRIEVE_LOGGEDIN_USER:
      return payload;

    case CREATE_USER:
      return payload;

    case UPDATE_USER:
      return payload;

    case UPDATE_ACCOUNT_STATUS:
    case UPDATE_EMAIL_STATUS:
      return {
        ...state,
        users: payload.rows,
        totalUserCount: payload.count,
      };

    case DELETE_USER:
    case RESTORE_USER:
      return {
        ...state,
        users: payload.rows,
        totalUserCount: payload.count,
      };

    case ADD_USER_SUPERADMIN:
      return {
        ...state,
      };

    case UPDATE_USER_ACCOUNT_TYPE:
      return {
        ...state,
        selectedAccountType: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
