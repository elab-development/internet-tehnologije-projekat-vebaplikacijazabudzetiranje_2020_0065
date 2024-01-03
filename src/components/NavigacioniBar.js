import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./NavigacioniBar.module.css";
import Logo from "./Logo";

//reusable komponenta
function NavigacioniBar() {
  return (
    <nav className={styles.navigacioniBar}>
      <Logo type="logo" />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.link}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigacioniBar;
