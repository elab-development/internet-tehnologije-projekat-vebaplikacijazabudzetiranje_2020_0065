import styles from "./AppSidebar.module.css";
import React, { Component } from "react";
import Logo from "../components/Logo";
import AppSidebarNav from "../components/AppSidebarNav";

function AppSidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppSidebarNav />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by PodeliTroskic inc.
        </p>
      </footer>
    </div>
  );
}

export default AppSidebarNav;
