import styles from "./Logo.module.css";
import React from "react";
import { Link } from "react-router-dom";

function Logo({ type }) {
  return (
    <Link to="/">
      <img
        src="/finish-logo1.png"
        alt="PodeliTroskic logo"
        className={styles[type]}
      />
    </Link>
  );
}

export default Logo;
