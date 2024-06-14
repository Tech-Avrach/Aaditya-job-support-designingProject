import {
    RETRIEVE_PAGES,
    CREATE_PAGE,
    UPDATE_PAGE,
    DELETE_PAGE,
    RESTORE_PAGE,
    UPDATE_PAGE_STATUS,
} from "./types";
  
import PageService from "../services/page.service";

export const retrievePages = (keyword = '', page = '', perPage = '', all = 'true', active = 'true') => async (dispatch) => {
  try {
    const res = await PageService.getAll(keyword, page, perPage, all, active);
    dispatch({
      type: RETRIEVE_PAGES,
      payload: res.data.listPages,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createPage = (data) => async (dispatch) => {
  try {
    const res = await PageService.create(data);

    dispatch({
      type: CREATE_PAGE,
      payload: res.data.pageInfo,
    });

    // return Promise.resolve(res.data);
  } catch (err) {
    // return Promise.reject(err);
  }
};

export const updatePage = (id, data, get = 'item') => async (dispatch) => {
  try {
    const res = await PageService.update(id, data, get);

    dispatch({
      type: UPDATE_PAGE,
      payload: res.data.pageInfo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updatePageStatus = (id, data, get = 'list') => async (dispatch) => {
  try {
    const res = await PageService.update(id, data, get);

    dispatch({
      type: UPDATE_PAGE_STATUS,
      payload: res.data.listPages,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePage = (id, get) => async (dispatch) => {
  try {
    const res = await PageService.deletePage(id, get);

    dispatch({
      type: DELETE_PAGE,
      payload: res.data.listPages,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const restorePage = (id, get) => async (dispatch) => {
  try {
    const res = await PageService.restore(id, get);

    dispatch({
      type: RESTORE_PAGE,
      payload: res.data.listPages,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};