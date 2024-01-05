import styles from "./AppSidebar.module.css";
import React from "react";
import Logo from "../components/Logo";
import PrijateljiListaPaginacija from "../components/PrijateljiListaPaginacija";
import Footer from "../components/Footer";
import PrijateljiDodaj from "./PrijateljiDodaj";
import { useState, useEffect } from "react";
import Dugme from "./Dugme.js";

function AppSidebar() {
  const [prijatelji, setPrijatelj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const velicinaStrane = 3;

  useEffect(function () {
    async function fetchPrijatelje() {
      try {
        setIsLoading(true);
        const res = await fetch("/users.json");
        const data = await res.json();
        console.log(data);
        setPrijatelj(data);
      } catch {
        alert("Doslo je do greske prilikom ucitavanja");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPrijatelje();
  }, []);

  if (!prijatelji) {
    return <div>Loading...</div>;
  }

  function otvoriFormuHandler() {
    setOtvoriFormu((prikazi) => !prikazi);
  }

  function dodajPrijateljaHandler(prijatelj) {
    setPrijatelj((prijatelji) => [...prijatelji, prijatelj]); //raspakuje prijatelji i dodaje novog na kraju
    console.log(prijatelj);
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
