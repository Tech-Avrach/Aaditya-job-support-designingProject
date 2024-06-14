import {
  CREATE_TRANSCRIPTREQUEST,
  RETRIEVE_COMBINED_TRANSCRIPTREQUEST,
  RETRIEVE_TRANSCRIPTREQUEST,
} from "../actions/types";

const initialState = { tranScriptDetails: [], createdTranScript: {} };

const transcriptReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TRANSCRIPTREQUEST:
      return {
        ...state,
        createdTranScript: payload?.data,
      };

    case RETRIEVE_TRANSCRIPTREQUEST:
      return {
        ...state,
        tranScriptDetails: payload.rows,
      };

    case RETRIEVE_COMBINED_TRANSCRIPTREQUEST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default transcriptReducer;
