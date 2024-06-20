import axios from "axios";

const forgotPassword = (email) => {
  return axios.post(process.env.REACT_APP_API_URL + "forgotPassword", {
    email,
  });
};

const resetPassword = (newPassword, token) => {
  return axios.post(process.env.REACT_APP_API_URL + "resetPassword", {
    newPassword,
    token,
  });
};

const commonService = { forgotPassword, resetPassword };

export default commonService;
