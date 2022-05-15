import axiosInstance from "../axiosInstance";
import { FEATCH_BUS_SCHEDULE, STORE_BUS_SCHEDULE } from "../constants/actionTypes";


import { handleError } from "../helper";

export function fetchBusScheudle() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FEATCH_BUS_SCHEDULE,
        payload: { inProgress: true },
      });
      const response = await axiosInstance.get(`/api/bus-schedule`);
      dispatch({
        type: FEATCH_BUS_SCHEDULE,
        payload: { data: response.data.data },
      });
    } catch (e) {
      dispatch({
        type: FEATCH_BUS_SCHEDULE,
        payload: { errors: handleError(e) },
      });
      throw new Error(e);
    }
  };
}

export function storeBusScheudle({ bus_schedule }) {
  return async (dispatch) => {
    try {
      dispatch({
        type: STORE_BUS_SCHEDULE,
        payload: { inProgress: true },
      });
      const response = await axiosInstance.post(
        `/api/bus-schedule`,
        bus_schedule
      );
      dispatch({
        type: STORE_BUS_SCHEDULE,
        payload: { data: response.data.data },
      });
    } catch (e) {
      dispatch({
        type: STORE_BUS_SCHEDULE,
        payload: { errors: handleError(e) },
      });
      throw new Error(e);
    }
  };
}
