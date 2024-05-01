import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APODLayout from "../layouts/APODLayout";
import MarsLayout from "../layouts/MarsLayout";
import EarthLayout from "../layouts/EarthLayout";
import LoginLayout from "../layouts/LoginLayout";
import PatentLayout from "../layouts/PatentLayout";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route element={<LoginLayout />}>
            <Route path="/" />
          </Route>
          <Route element={<APODLayout />}>
            <Route path="/apod" />
          </Route>
          <Route element={<MarsLayout />}>
            <Route path="/mars" />
          </Route>
          <Route element={<EarthLayout />}>
            <Route path="/earth" />
          </Route>
          <Route element={<PatentLayout />}>
            <Route path="/patent" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
