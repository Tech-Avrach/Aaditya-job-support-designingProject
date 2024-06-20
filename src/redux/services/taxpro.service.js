import axios from "axios";
import { authHeader, multipartHeader} from "./auth-header";

const getTaxList = (keyword, page, perPage) => {
  return axios.get(process.env.REACT_APP_API_URL + `taxPro/list`, {
    headers: authHeader(),
    data: {},
    params: {
      all: true,
      keyword: keyword,
      page: page,
      perPage: perPage,
    },
  });
};

const createTaxList = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + `taxPro/create`,data, {
    headers: multipartHeader(),
  });
};

const getTaxUserDetails = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `taxPro/view/${id}`, {
    headers: authHeader(),
    
  });
};

const deleteTaxPro = (id,data) => {
  return axios.delete(process.env.REACT_APP_API_URL + `taxPro/delete/${id}`, {
    headers: authHeader(),
    data
    
  });
};
const restoreTaxPro = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `taxPro/restore/${id}`, {
    headers: authHeader()
    
  });
};

const update = (id, data) => {
  return axios.put(process.env.REACT_APP_API_URL + `taxPro/update/${id}`, data, {
    headers: authHeader(),
  });
};

export default { getTaxList, createTaxList, getTaxUserDetails,deleteTaxPro,update,restoreTaxPro };
