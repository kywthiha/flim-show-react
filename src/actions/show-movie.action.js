import axiosInstance from "../axiosInstance";
import {
  FETCH_SHOW_MOVIE,
  FETCH_TIME_SCHEDULE,
  STORE_TIME_SCHEDULE,
} from "../constants/actionTypes";

import { handleError } from "../helper";

export function fetchShowMovie() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SHOW_MOVIE,
        payload: { inProgress: true },
      });
      const response = await axiosInstance.get(
        `/api/time-schedule/catch-movie-time`
      );
      dispatch({
        type: FETCH_SHOW_MOVIE,
        payload: { data: response.data.data },
      });
    } catch (e) {
      dispatch({
        type: FETCH_SHOW_MOVIE,
        payload: { errors: handleError(e) },
      });
      throw new Error(e);
    }
  };
}
