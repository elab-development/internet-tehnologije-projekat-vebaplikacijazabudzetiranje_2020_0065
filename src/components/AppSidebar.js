import styles from "./AppSidebar.module.css";
import React from "react";
import Logo from "../components/Logo";
import PrijateljiListaPaginacija from "../components/PrijateljiListaPaginacija";
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
  {
    id: 499476,
    ime: "Anthony",
    slika: "https://picsum.photos/222",
    balance: 0,
    email: "b",
  },
  {
    id: 499476,
    ime: "Anthony",
    slika: "https://picsum.photos/220",
    balance: 0,
    email: "b",
  },
  {
    id: 499476,
    ime: "Anthony",
    slika: "https://picsum.photos/202",
    balance: 0,
    email: "b",
  },
  {
    id: 499476,
    ime: "Anthony",
    slika: "https://picsum.photos/201",
    balance: 0,
    email: "b",
  },
];

function AppSidebar() {
  const [otvoriFormu, setOtvoriFormu] = useState(false);
  const [prijatelji, setPrijatelj] = useState(prijateljJSON);
  const velicinaStrane = 2;

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
