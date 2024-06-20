import {
  RETRIEVE_USERS,
  RETRIEVE_LOGGEDIN_USER,
  UPDATE_ACCOUNT_STATUS,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  RESTORE_ACCOUNT,
  UPDATE_EMAIL_STATUS,
  DELETE_USER,
  RESTORE_USER,
  UPDATE_USER_ACCOUNT_TYPE,
} from "./types";

import UserService from "../services/account.service";

export const retrieveUsers =
  (all = true, keyword = "", page = "", perPage = "", active = "") =>
  async (dispatch) => {
    try {
      const res = await UserService.getAll(all, keyword, page, perPage, active);
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data.accountList,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const retrieveSingaleUser = (id) => async (dispatch) => {
  try {
    const res = await UserService.get(id);
    dispatch({
      type: RETRIEVE_LOGGEDIN_USER,
      payload: { user: res?.data?.userInfo },
    });
  } catch (err) {
    console.log(err);
  }
};

export const createAccount = (data) => async (dispatch) => {
  try {
    const res = await UserService.create(data);

    dispatch({
      type: CREATE_ACCOUNT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.update(id, data);

    dispatch({
      type: UPDATE_ACCOUNT,
      payload: res.data.userInfo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateUserStatus = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.updateStatus(id, data);
    dispatch({
      type: UPDATE_ACCOUNT_STATUS,
      payload: res.data?.accountList,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const updateEmailStatus = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.updateEmailNotification(id, data);
    dispatch({
      type: UPDATE_EMAIL_STATUS,
      payload: res.data?.accountList,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.deleteUser(id, data);
    dispatch({
      type: DELETE_USER,
      payload: res.data.accountList,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const restoreUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.restore(id, data);

    dispatch({
      type: RESTORE_USER,
      payload: res.data.accountList,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const getAccount = (id) => async (dispatch) => {
  try {
    const res = await UserService.getAccountDetail(id);

    dispatch({
      type: RESTORE_ACCOUNT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateUserType = (value) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_ACCOUNT_TYPE,
      payload: value,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
