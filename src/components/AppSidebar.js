import styles from "./AppSidebar.module.css";
import React from "react";
import Logo from "../components/Logo";
import PrijateljiListaPaginacija from "../components/PrijateljiListaPaginacija";
import Footer from "../components/Footer";
import PrijateljiDodaj from "./PrijateljiDodaj";
import { useState, useContext } from "react";
import Dugme from "./Dugme.js";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";

function AppSidebar() {
  const [otvoriFormu, setOtvoriFormu] = useState(false);
  const velicinaStrane = 3;

  const { prijatelji } = useContext(SelektovanPrijateljContext);
  const { dodajPrijateljaHandler } = useContext(SelektovanPrijateljContext);

  function otvoriFormuHandler() {
    setOtvoriFormu((prikazi) => !prikazi);
  }

  return (
    <div className={styles.sidebar}>
      <Logo />

      <PrijateljiListaPaginacija
        prijatelji={prijatelji}
        velicinaStrane={velicinaStrane}
      />

      {otvoriFormu && <PrijateljiDodaj onAddDodaj={dodajPrijateljaHandler} />}

      <Dugme type="prijateljDodaj" onClick={otvoriFormuHandler}>
        {otvoriFormu ? "Zatvori" : "Dodaj prijatelja"}
      </Dugme>
      <Footer />
    </div>
  );
}
//<PrijateljiLista prijatelji={trenutniPrijatelji} />
export default AppSidebar;
