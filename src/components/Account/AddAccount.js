import React, { useState, useEffect } from "react";
import PageContainer from "../Layout/PageContainer";
import AddAccountInformation from "./AddAccountInformation";
import { useParams } from "react-router-dom";
import accountService from "../../redux/services/account.service";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import { toast, Slide } from "react-toastify";
import RequestTranscripts from "./RequestTranscripts";
import AvailableTranscripts from "./AvailableTranscripts";
import "react-toastify/dist/ReactToastify.css";
import AddTranscripts from "./AddTranscripts";

toast.configure();

const AddAccount = () => {
  const [userDetail, setUserDetail] = useState({});
  const { id } = useParams();

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

  useEffect(() => {
    if (id != "") {
      getAccount(id);
    }
  }, [id]);

  return (
    <PageContainer
      pageTitleIcon="pe-7s-add-user icon-gradient bg-plum-plate"
      pageHeading={id != "" ? "Edit Account" : "Add Account"}
      pageSubTitle={id != "" ? "Edit Account" : "Add new account"}
    >
      {!id ? (
        <AddAccountInformation userDetail={userDetail} />
      ) : (
        <Tabs
          defaultActiveKey="1"
          renderTabBar={() => <ScrollableInkTabBar />}
          renderTabContent={() => <TabContent />}
        >
          <TabPane tab="Account Information" key="1">
            <AddAccountInformation userDetail={userDetail} />
          </TabPane>

          {/* {id && (
            <TabPane tab="Request Transcripts" key="2">
              <RequestTranscripts userDetail={userDetail} />
            </TabPane>
          )} */}
          {id && (
            <TabPane tab="Request Transcripts" key="2">
              <AddTranscripts userDetail={userDetail} />
            </TabPane>
          )}
          {id && (
            <TabPane tab="Available Transcripts" key="3">
              <AvailableTranscripts userDetail={userDetail} />
            </TabPane>
          )}
        </Tabs>
      )}
    </PageContainer>
  );
};

export default AddAccount;
