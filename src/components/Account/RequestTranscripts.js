import React from "react";
import { useSelector } from "react-redux";
import BusinessRequestTranscript from "./BusinessRequestTranscript";
import IndividualRequestTranscript from "./IndividualRequestTranscript";

const RequestTranscripts = ({ userDetail }) => {
  const { selectedAccountType } = useSelector((state) => state.account);
  return (
    <>
      {+selectedAccountType === 1 ? (
        <BusinessRequestTranscript userDetail={userDetail} />
      ) : (
        <IndividualRequestTranscript userDetail={userDetail} />
      )}
    </>
  );
};

export default RequestTranscripts;
