import {
    RETRIEVE_PAGES,
    UPDATE_PAGE,
    UPDATE_PAGE_STATUS,
    DELETE_PAGE,
    RESTORE_PAGE,
    CREATE_PAGE,
  } from "../actions/types";
  
  const initialState = { pages : [], totalPageCount : 0 };

const pageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    case RETRIEVE_PAGES:
      return {
        pages: payload.rows,
        totalPageCount: payload.count,
      };

    case CREATE_PAGE:
      return payload;

    case UPDATE_PAGE:
      return payload;

    case UPDATE_PAGE_STATUS:
      return {
        pages: payload.rows,
        totalPageCount: payload.count,
      };

    case DELETE_PAGE:
      return {
        pages: payload.rows,
        totalPageCount: payload.count,
      };

    case RESTORE_PAGE:
      return {
        pages: payload.rows,
        totalPageCount: payload.count,
      };

    default:
      return state;
  }
};

export default pageReducer;