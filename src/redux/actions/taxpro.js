import {
  TAXPRO_USERLISTSUCCESS,
  TAXPRO_USERLIST_FAILURE,
  TAXPRO_UPDATE,
  TAXPRO_USERLIST_CREATESUCCESS,
  TAXPRO_USERLIST_DETAILS,
  DELETE_USER,
  RESTORE_TAXPRO,
  DELETE_TAXPRO,
} from "./types";
import TaxProlistService from "../services/taxpro.service";
import { idea } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const taxProlist =
  (keyword = "", page = "", perPage = "") =>
  async (dispatch) => {
    try {
      const res = await TaxProlistService.getTaxList(keyword, page, perPage);
      dispatch({
        type: TAXPRO_USERLISTSUCCESS,
        payload: res.data.taxProList,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

export const createTaxProlist = (data) => async (dispatch) => {
  try {
    const res = await TaxProlistService.createTaxList(data);
    dispatch({
      type: TAXPRO_USERLIST_CREATESUCCESS,
      payload: res.data.taxProList,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const TaxProlistDetails = (id) => async (dispatch) => {
  try {
    const res = await TaxProlistService.getTaxUserDetails(id);
    dispatch({
      type: TAXPRO_USERLIST_DETAILS,
      payload: res.data.taxProList,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
export const deleteTaxPro = (id, data) => async (dispatch) => {
  try {
    const res = await TaxProlistService.deleteTaxPro(id, data);
    dispatch({
      type: DELETE_TAXPRO,
      payload: res.data.taxProList,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const restoreTaxPro = (id) => async (dispatch) => {
  try {
    const res = await TaxProlistService.restoreTaxPro(id);
    dispatch({
      type: RESTORE_TAXPRO,
      payload: res.data.taxProList,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const updateTaxPro = (id, data) => async (dispatch) => {
  try {
    const res = await TaxProlistService.update(id, data);

    dispatch({
      type: TAXPRO_UPDATE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
