
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppSidebarNav.module.css";

function AppSidebarNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Prijatelji</NavLink>
        </li>
        <li>
          <NavLink to="countries">Grupe</NavLink>
        </li>
        <li>
          <NavLink to="countries">Troskovi</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppSidebarNav;
