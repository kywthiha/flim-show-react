import { FETCH_SHOW_MOVIE } from "../constants/actionTypes";

const initialState = {
  inProgress: false,
  data: null,
};

export default function ShowMovieReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHOW_MOVIE:
      return {
        ...state,
        data: action.payload.data || null,
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null,
      };
    default:
      return state;
  }
}
