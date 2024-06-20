import React, { useState, useEffect } from "react";
import PageContainer from "../Layout/PageContainer";
import AddAccountInformation from "./AddAccountInformation";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import accountService from "../../redux/services/account.service";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import { toast, Slide } from "react-toastify";
import RequestTranscripts from "./RequestTranscripts";
import AvailableTranscripts from "./AvailableTranscripts";
import "react-toastify/dist/ReactToastify.css";
// import AddTranscripts from "./AddTranscripts";
import { Button } from "reactstrap";
import ModalComponent from "./ModalComponent";

toast.configure();

const AddAccount = () => {
  const [transcripts, setTranscripts] = useState();
  const [userDetail, setUserDetail] = useState({});
  const { id, transcript } = useParams();
  const {pathname}=  useLocation()
    console.log(pathname);
    console.log();
    const isHideRequestTranscript =  pathname.includes("request-transcript")
  const navigate = useNavigate();

  let pageTitle = "Edit Account";
  let pageSubTitle = "Edit Account";

  if (pathname.includes("request-transcript")) {
    pageTitle = "Request Transcript";
    pageSubTitle = "Request Transcript";
  } else if (pathname.includes("add")) {
    pageTitle = "Add Account";
    pageSubTitle = "Add new account";
  }

  const getAccount = (id) => {
    accountService
      .getAccountDetail(id)
      .then((response) => {
        setUserDetail(response.data.accountDetails);
      })
      .catch((error) => {
        toast(error, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
      });
  };

  const hanldeSetTranscript = (values) => {
    console.log("values", values);
    // setTranscripts();
  };

  useEffect(() => {
      id && getAccount(id);
  }, [id]);

  console.log(transcript)

  return (
    <PageContainer
      pageTitleIcon="pe-7s-add-user icon-gradient bg-plum-plate"
      pageHeading={pageTitle}
      pageSubTitle={pageSubTitle}
    >
      {!id ? (
        <AddAccountInformation userDetail={userDetail} />
      ) : (
        <>
          {/* */}
          <Outlet context={[userDetail]} />
          <div className="d-flex justify-content-center">
          {!isHideRequestTranscript &&   <Button
              color="primary"
              className="me-2"
              onClick={() => navigate(`/account/${id}/request-transcript`)}
              >
              Request Transcripts
            </Button>}

            {!isHideRequestTranscript &&   
            <Button color="primary" className="me-2">
              Download Transcripts
            </Button>}
          </div>
        </>
        // <Tabs
        //   defaultActiveKey="1"
        //   renderTabBar={() => <ScrollableInkTabBar />}
        //   renderTabContent={() => <TabContent />}
        // >
        //   <TabPane tab="Account Information" key="1">
        //     <AddAccountInformation userDetail={userDetail} />
        //   </TabPane>

        //   {/* {id && (
        //     <TabPane tab="Request Transcripts" key="2">
        //       <RequestTranscripts userDetail={userDetail} />
        //     </TabPane>
        //   )} */}
        //   {id && (
        //     <TabPane tab="Request Transcripts" key="2">
        //       <AddTranscripts userDetail={userDetail} />
        //     </TabPane>
        //   )}
        //   {id && (
        //     <TabPane tab="Available Transcripts" key="3">
        //       <AvailableTranscripts userDetail={userDetail} />
        //     </TabPane>
        //   )}
        // </Tabs>
      )}
    
    </PageContainer>
  );
};

export default AddAccount;
