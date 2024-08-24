import React from "react";
import Navigation from "./Components/Navigation";
import HomePage from "./Pages/HomePage/HomePage";
import { Outlet } from "react-router";

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      {/* <HomePage /> */}
      <Outlet />
    </>
  );
};

export default App;
