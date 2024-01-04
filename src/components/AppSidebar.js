import styles from "./AppSidebar.module.css";
import React from "react";
import Logo from "../components/Logo";
import PrijateljiLista from "../components/PrijateljiLista";
import Footer from "../components/Footer";
import PrijateljiDodaj from "./PrijateljiDodaj";
import { useState } from "react";
import Dugme from "./Dugme.js";

const prijateljJSON = [
  {
    id: 118836,
    ime: "Clark",
    slika: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
    email: "b",
  },
  {
    id: 933372,
    ime: "Sarah",
    slika: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
    email: "b",
  },
  {
    id: 499476,
    ime: "Anthony",
    slika: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
    email: "b",
  },
];

function AppSidebar() {
  const [otvoriFormu, setOtvoriFormu] = useState(false);
  const [prijatelji, setPrijatelj] = useState(prijateljJSON);

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

      <PrijateljiLista prijatelji={prijatelji} />

      {otvoriFormu && <PrijateljiDodaj onAddDodaj={dodajPrijateljaHandler} />}

      <Dugme type="prijateljDodaj" onClick={otvoriFormuHandler}>
        {otvoriFormu ? "Zatvori" : "Dodaj prijatelja"}
      </Dugme>
      <Footer />
    </div>
  );
}

export default AppSidebar;
