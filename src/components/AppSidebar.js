import styles from "./AppSidebar.module.css";
import React from "react";
import Logo from "../components/Logo";
import PrijateljiLista from "../components/PrijateljiLista";
import Footer from "../components/Footer";
import PrijateljiDodaj from "./PrijateljiDodaj";

function AppSidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <PrijateljiLista />
      <PrijateljiDodaj />
      <Footer />
    </div>
  );
}

export default AppSidebar;
