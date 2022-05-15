import {
  FETCH_TIME_SCHEDULE,
  STORE_TIME_SCHEDULE,
} from "../constants/actionTypes";

const initialState = {
  inProgress: false,
  data: {},
};

export default function TimeScheuldeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TIME_SCHEDULE:
      return {
        ...state,
        data: action.payload.data || {},
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null,
      };
    case STORE_TIME_SCHEDULE:
      return {
        ...state,
        data: action.payload.data || {},
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null,
      };
    default:
      return state;
  }
}
