import styles from "./Dugme.module.css";
import React from "react";

function Dugme({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Dugme;
