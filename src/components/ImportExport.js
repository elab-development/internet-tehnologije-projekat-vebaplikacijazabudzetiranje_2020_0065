import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ImportExport.module.css";

export default function ImportExport() {
  return (
    <div className={styles.main}>
      <NavLink className={styles.link} to="http://localhost:8000/upload">
        Import
      </NavLink>
      <NavLink className={styles.link} to="http://localhost:8000/export">
        Export
      </NavLink>
    </div>
  );
}
