import TranScriptService from "../services/tranScript.service";
import {
  CREATE_TRANSCRIPTREQUEST,
  RETRIEVE_TRANSCRIPTREQUEST,
  RETRIEVE_COMBINED_TRANSCRIPTREQUEST,
} from "./types";

export const createTranscript = (data) => async (dispatch) => {
  try {
    const res = await TranScriptService.create(data);

    dispatch({
      type: CREATE_TRANSCRIPTREQUEST,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getTranscript = (Id) => async (dispatch) => {
  try {
    const res = await TranScriptService.getAll(Id);

    dispatch({
      type: RETRIEVE_TRANSCRIPTREQUEST,
      payload: res.data.transcriptDetails,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const getCombinedTranscript = (data) => async (dispatch) => {
  try {
    const res = await TranScriptService.createCombined(data);

    dispatch({
      type: RETRIEVE_COMBINED_TRANSCRIPTREQUEST,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
