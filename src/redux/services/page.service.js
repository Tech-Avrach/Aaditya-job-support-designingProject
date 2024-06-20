import axios from "axios";
import { authHeader } from "./auth-header";

const getAll = (keyword, page, perPage, all, active) => {
  return axios.get(process.env.REACT_APP_API_URL + "pages/list", {
    headers: authHeader(),
    data: {},
    params: {
      keyword,
      page,
      perPage,
      all,
      active
    },
  });
};

const get = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `page/view/${id}`, {
    headers: authHeader(),
  });
};

const create = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + `page/create`, data, {
    headers: authHeader(),
  });
};

const update = (id, data, get) => {
  return axios.put(process.env.REACT_APP_API_URL + `page/update/${id}`, data, {
    headers: authHeader(),
    params: {
      get,
    },
  });
};

const deletePage = (id, get) => {
  return axios.delete(process.env.REACT_APP_API_URL + `page/delete/${id}`, {
    headers: authHeader(),
    params: {
      get,
    },
  });
};

const restore = (id, get) => {
  return axios.get(process.env.REACT_APP_API_URL + `page/restore/${id}`, {
    headers: authHeader(),
    params: {
      get,
    },
  });
};

export default {
  getAll,
  get,
  create,
  update,
  deletePage,
  restore
};
