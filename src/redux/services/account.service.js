import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = (all, keyword, page, perPage, active) => {
  return axios.get(process.env.REACT_APP_API_URL + "account/list", {
    headers: authHeader(),
    data: {},
    params: {
      all: all,
      keyword: keyword,
      page: page,
      perPage: perPage,
      active: active,
    },
  });
};

const get = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `user/view/${id}`, {
    headers: authHeader(),
    data: {},
  });
};

const create = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + `account/create`, data, {
    headers: authHeader(),
  });
};

const update = (id, data) => {
  return axios.put(
    process.env.REACT_APP_API_URL + `account/update/${id}`,
    data,
    {
      headers: authHeader(),
    }
  );
};

const updateStatus = (id, data) => {
  return axios.put(
    process.env.REACT_APP_API_URL + `account/updateStatus/${id}`,
    data,
    {
      headers: authHeader(),
    }
  );
};
const updateEmailNotification = (id, data) => {
  return axios.put(
    process.env.REACT_APP_API_URL + `account/updateEmailNotification/${id}`,
    data,
    {
      headers: authHeader(),
    }
  );
};

const deleteUser = (id, data) => {
  return axios.delete(process.env.REACT_APP_API_URL + `account/delete/${id}`, {
    headers: authHeader(),
    data,
  });
};

const restore = (id, data) => {
  return axios.get(process.env.REACT_APP_API_URL + `account/restore/${id}`, {
    headers: authHeader(),
    params: data,
  });
};
const getAccountDetail = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `account/view/${id}`, {
    headers: authHeader(),
  });
};

export default {
  getAll,
  get,
  create,
  update,
  updateStatus,
  deleteUser,
  restore,
  getAccountDetail,
  updateEmailNotification,
};
