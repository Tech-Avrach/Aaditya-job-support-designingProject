import {
  TAXPRO_USERLISTSUCCESS,
  TAXPRO_USERLIST_CREATESUCCESS,
  TAXPRO_USERLIST_FAILURE,
  TAXPRO_USERLIST_DETAILS,
  DELETE_TAXPRO,
  RESTORE_TAXPRO,
} from "../actions/types";

const initialState = {
  taxproUser: [],
  taxproUserCount:0,
  error: null,
  currentUserData: null,
  currentUserDetails: {},
};

export default function taxproReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TAXPRO_USERLISTSUCCESS:
      return {
        ...state,
        taxproUser: payload.rows,
        taxproUserCount: payload.count,
        error: null,
      };
    case TAXPRO_USERLIST_CREATESUCCESS:
      return {
        ...state,
        currentUserData: payload,
      };
    case TAXPRO_USERLIST_DETAILS:
      return {
        ...state,
        currentUserDetails: payload,
      };
    case TAXPRO_USERLIST_FAILURE:
      return {
        ...state,
        data: [],
        error: payload,
      };
    case DELETE_TAXPRO:
      return {
        ...state,
        taxproUser: payload.rows,
      };
    case RESTORE_TAXPRO:
      return {
        ...state,
        taxproUser: payload.rows,
      };
    default:
      return state;
  }
}
