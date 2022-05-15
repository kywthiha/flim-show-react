import { Routes, Route, useSearchParams } from "react-router-dom";
import Login from "./pages/Login";
import Page404 from "./pages/404";
import ProtectedRoute from "./protected.route";
import { getToken } from "./helper";
import { useEffect, useState } from "react";
import TimeScheduleConfigurationIndex from "./pages/TimeScheduleConfiguration";
import TimeScheduleIndex from "./pages/TimeSchedule";
import BusScheduleIndex from "./pages/BusSchedule";
import ShowMovieIndex from "./pages/ShowMovie";


function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<TimeScheduleConfigurationIndex />} />
          <Route path="/time-schedule" element={<TimeScheduleIndex />} />
          <Route path="/bus-schedule" element={<BusScheduleIndex />} />
          <Route path="/show-movie" element={<ShowMovieIndex />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
        <Route path="404" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
