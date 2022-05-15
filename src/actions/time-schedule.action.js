import axiosInstance from "../axiosInstance";
import {
  FETCH_TIME_SCHEDULE,
  STORE_TIME_SCHEDULE,
} from "../constants/actionTypes";

import { handleError } from "../helper";

export function fetchTimeScheudle() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_TIME_SCHEDULE,
        payload: { inProgress: true },
      });
      const response = await axiosInstance.get(`/api/time-schedule`);
      dispatch({
        type: FETCH_TIME_SCHEDULE,
        payload: { data: response.data.data },
      });
    } catch (e) {
      dispatch({
        type: FETCH_TIME_SCHEDULE,
        payload: { errors: handleError(e) },
      });
      throw new Error(e);
    }
  };
}

export function storeTimeScheudle({ time_schedule }) {
  return async (dispatch) => {
    try {
      dispatch({
        type: STORE_TIME_SCHEDULE,
        payload: { inProgress: true },
      });
      const response = await axiosInstance.post(
        `/api/time-schedule`,
        time_schedule
      );
      dispatch({
        type: STORE_TIME_SCHEDULE,
        payload: { data: response.data.data },
      });
    } catch (e) {
      dispatch({
        type: STORE_TIME_SCHEDULE,
        payload: { errors: handleError(e) },
      });
      throw new Error(e);
    }
  };
}
