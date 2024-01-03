import React from "react";
import AppSidebar from "../components/AppSidebar";
import AppMainbar from "../components/AppMainbar";
import PageNav from "../components/NavigacioniBar";
//import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <AppSidebar />
      <AppMainbar />
    </div>
  );
}

export default AppLayout;
