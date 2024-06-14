import axios from "axios";
import { authHeader } from "./auth-header";

const create = (data) => {
  return axios.post(
    process.env.REACT_APP_API_URL + `transcript/download`,
    data,
    {
      headers: authHeader(),
    }
  );
};
const getAll = (Id) => {
  return axios.get(
    process.env.REACT_APP_API_URL + `transcript/view/${Id}`,
    {
      headers: authHeader(),
    }
  );
};

const createCombined = (data) => {
  return axios.post(
    process.env.REACT_APP_API_URL + `transcript/downloadCombined`,
    data,
    {
      headers: authHeader(),
    }
  );
};

export default {
  create,
  getAll,
  createCombined
};
