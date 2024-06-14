import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
//import logout action
import { logout } from "../../../redux/actions/auth";
//import event bus
import EventBus from "../../../common/EventBus";

const UserBox = (props) => {
  
  const dispatch = useDispatch();

  const authDetails = props.authDetails;

  useEffect(() => {

    if (authDetails && authDetails.expiry && new Date().getTime() > authDetails.expiry)
        logOut();

  }, [authDetails]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <>
      <div className="header-btn-lg pe-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
                <Button
                  className="btn-pill btn-shadow btn-shine"
                  color="focus"
                  onClick={logOut}
                >
                  Logout
                </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
