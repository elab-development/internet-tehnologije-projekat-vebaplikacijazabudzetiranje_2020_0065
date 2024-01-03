import styles from "./Sidebar.module.css";
import React, { Component } from "react";
import Logo from "../components/Logo";
import AppNav from "../components/AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by PodeliTroskic inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
