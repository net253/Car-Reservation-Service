import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.min.css";

import { Login, Scheduler, History } from "./page";
import ContentWrapper from "./components/Wrapper/ContentWrapper";

export default function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/Login" element={<Login />} />
          <Route
            exact
            path="/"
            element={<ContentWrapper content={Scheduler} page={true} />}
          />
          <Route
            path="/History"
            element={<ContentWrapper content={History} page={false} />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
