import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearMessage } from "../../../redux/actions/message";

import ProtectedRoutes from "../../../routes/ProtectedRoutes";
import PublicRoutes from "../../../routes/PublicRoutes";

const Login = lazy(() => import("../../Login/"));
const Dashboard = lazy(() => import("../../Dashboard/"));
const AddAccount = lazy(() => import("../../Account/AddAccount"));
const ForgotPassword = lazy(() => import("../../ForgotPassword/"));
const ResetPassword = lazy(() => import("../../ResetPassword/"));
const Page = lazy(() => import("../../Account/AddAccount"));

const ListtaxPro = lazy(() => import("../../Taxpros/listtaxPro"));
const AddTaxpros = lazy(() => import("../../Taxpros"));
const AddAccountInformation = lazy(() => import("../../Account/AddAccountInformation"));
const AddTranscripts = lazy(() => import("../../Account/AddTranscripts"));

const AppMain = () => {
  let isLoggedIn = false;
  // const [ isLoggedIn, setIsLoggedIn ] = useState ( false );

  const { user: currentUser } = useSelector((state) => state.auth);
  if (currentUser) {
    isLoggedIn = true;
  }

  // useEffect( () => {
  //   currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
  // }, [currentUser]);

  // useEffect( () => {
  //   currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
  // }, [currentUser]);

  const dispatch = useDispatch();

  let location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/login") {
  //     dispatch(clearMessage()); // Clear message when changing location
  //   }
  // }, [dispatch, location]);

  useEffect(() => {
    if (["/login"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  return (
    <Routes>
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="taxpros" key="taxpros">
          <Route
            path="list"
            key="list"
            element={<ListtaxPro currentUser={currentUser} />}
          />

          <Route
            path="add"
            key="add"
            element={<AddTaxpros currentUser={currentUser} />}
          />
          <Route path=":id" element={<AddTaxpros />} />
        </Route>
        <Route path="account">
          <Route path="add" element={<AddAccount currentUser={currentUser} />} />
          <Route path="list" key="list" element={<Dashboard />} />
          <Route path=":id" element={<AddAccount />} >
            <Route index element={<AddAccountInformation />} />
            <Route path="transcripts" element={<AddTranscripts />} />
          </Route>
        </Route>
      </Route>

      <Route element={<PublicRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/account/list" : "/login"} />}
        />
      </Route>
    </Routes>
  );
};

export default AppMain;
