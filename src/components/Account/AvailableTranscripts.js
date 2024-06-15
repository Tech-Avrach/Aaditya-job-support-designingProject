import React from "react";
import { useSelector } from "react-redux";
import BusinessAvailableTranscripts from "./BusinessAvailableTranscripts";
import IndividualAvailableTranscripts from "./IndividualAvailableTranscripts";

const AvailableTranscripts = ({ userDetail }) => {
  const { selectedAccountType } = useSelector((state) => state.account);
  return (
    <>
      {+selectedAccountType === 1 ? (
        <BusinessAvailableTranscripts userDetail={userDetail} />
      ) : (
        <IndividualAvailableTranscripts userDetail={userDetail} />
      )}
    </>
  );
};

export default AvailableTranscripts;
