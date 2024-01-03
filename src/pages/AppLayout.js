import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import PageNav from "../components/NavigacioniBar";
import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <p>MAIN</p>
    </div>
  );
}

export default AppLayout;
