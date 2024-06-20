// src/redux/action/rowDelete.js
import axios from 'axios';
import {
  DELETE_ROW_REQUEST,
  DELETE_ROW_SUCCESS,
  DELETE_ROW_FAILURE,
} from './types';
import { authHeader } from '../services/auth-header';

export const deleteRow = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ROW_REQUEST });

  try {
    const headers = authHeader();
    await axios.delete(`/api/data/${id}`, { headers });
    dispatch({ type: DELETE_ROW_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_ROW_FAILURE, payload: error.message });
  }
};
