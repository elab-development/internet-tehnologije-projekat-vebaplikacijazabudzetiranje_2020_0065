import styles from "./Footer.module.css";
import React from "react";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by PodeliTroskic inc.
      </p>
    </footer>
  );
}

export default Footer;
