import React, { Component } from "react";
import AppSidebar from "../components/AppSidebar";
import PageNav from "../components/NavigacioniBar";
//import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <AppSidebar />
      <p>MAIN</p>
    </div>
  );
}

export default AppLayout;
