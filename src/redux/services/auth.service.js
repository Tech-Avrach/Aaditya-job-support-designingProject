import axios from "axios";
import { Navigate } from "react-router-dom";

const login = (email, password, rememberMe) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "user/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.userInfo.token) {
        if (!rememberMe) {
          response.data.userInfo.expiry = new Date().getTime() + 1000 * 60 * 30;
        }

        const userObj = {
          id: response.data?.userInfo?.id,
          role: response.data?.userInfo?.role,
          username: response.data?.userInfo?.username,
          email: response.data?.userInfo?.email,
          expiry: response.data?.userInfo?.expiry,
          token: response.data?.userInfo?.token,
        };

        localStorage.setItem("_ttn", JSON.stringify(userObj));
      }
      return response.data.userInfo;
    });
};

const logout = () => {
  localStorage.removeItem("_ttn");
  <Navigate to="/login" />;
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { login, logout };
