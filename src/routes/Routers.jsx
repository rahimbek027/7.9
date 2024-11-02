import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Loaging/Loading";

const Home = lazy(() => {
  return import("../pages/Dashboard");
});

const Students = lazy(() => {
  return import("../pages/Students");
});

const SinglePage = lazy(() => {
  return import("../pages/SinglePage");
});

const Routers = () => {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="/students"
          element={
            <Suspense fallback={<Loading />}>
              <Students />
            </Suspense>
          }
        />
        <Route
          path="/students/:id"
          element={
            <Suspense fallback={<Loading />}>
              <SinglePage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default Routers;
