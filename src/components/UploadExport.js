import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./UploadExport.module.css";

export default function UploadExport() {
  return (
    <div className={styles.main}>
      <NavLink className={styles.link} to="http://localhost:8000/upload">
        Upload
      </NavLink>
      <NavLink className={styles.link} to="http://localhost:8000/spendings/export">
        Export
      </NavLink>
    </div>
  );
}
