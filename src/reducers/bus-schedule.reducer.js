import { FEATCH_BUS_SCHEDULE, STORE_BUS_SCHEDULE } from "../constants/actionTypes";


const initialState = {
  inProgress: false,
  data: {},
};

export default function BusScheuldeReducer(state = initialState, action) {
  switch (action.type) {
    case FEATCH_BUS_SCHEDULE:
      return {
        ...state,
        data: action.payload.data || {},
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null,
      };
    case STORE_BUS_SCHEDULE:
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
