import { combineReducers } from "redux";

import AuthReducer from "./auth.reducer";
import BusScheuldeReducer from "./bus-schedule.reducer";
import ShowMovieReducer from "./show-movie.reducer";
import TimeScheuldeConfigurationReducer from "./time-schedule-configuration.reducer";
import TimeScheuldeReducer from "./time-schedule.reducer";

export default combineReducers({
  auth: AuthReducer,
  timeScheuldeConfiguration: TimeScheuldeConfigurationReducer,
  timeSchuele:TimeScheuldeReducer,
  busSchedule:BusScheuldeReducer,
  showMovie:ShowMovieReducer,
});
