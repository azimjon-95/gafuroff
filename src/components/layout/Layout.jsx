import React from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import "./Layout.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

function Layout() {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/nurse" ||
    matchPath("/nurseroom/:id", location.pathname);

  const catSidebar = matchPath("/consultation/:id", location.pathname);

  let backgroundStyle = "";
  let paddingStyle = "";

  if (hideSidebar) {
    backgroundStyle = "linear-gradient(135deg, #eff6ff, #e0e7ff)";
    paddingStyle = "0px";
  } else if (location.pathname === "/director") {
    backgroundStyle = "linear-gradient(135deg, #eff6ff, #e0e7ff)";
    paddingStyle = "5px";
  } else if (location.pathname === "/history") {
    backgroundStyle = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    paddingStyle = "5px";
  } else if (location.pathname === "/medical-calculators") {
    backgroundStyle = "inear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    paddingStyle = "0px";
  } else if (location.pathname === "/patients") {
    backgroundStyle = "inear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    paddingStyle = "0px";
  } else if (location.pathname === "/nurse") {
    paddingStyle = "0px";
  } else if (catSidebar) {
    paddingStyle = "0px";
  } else {
    backgroundStyle = "#fff";
    paddingStyle = "15px";
  }
  return (
    <div className="layout">
      {!hideSidebar && (
        <div className="layout_left">
          <Sidebar />
        </div>
      )}

      <div className="layout_right">
        <Header />
        <main
          style={{
            background: backgroundStyle,
            padding: paddingStyle,
          }}
          className="main-content"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;


