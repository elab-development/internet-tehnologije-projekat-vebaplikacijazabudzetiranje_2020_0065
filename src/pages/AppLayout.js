import React from "react";
import AppSidebar from "../components/AppSidebar";
import AppMainbar from "../components/AppMainbar";
import PageNav from "../components/NavigacioniBar";
//import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";
import { createContext, useState, Context } from "react";
import { useFetch } from "../hooks/useFetch.js";
export const SelektovanPrijateljContext = createContext();

function AppLayout() {
  const [selektovanPrijatelj, setSelectovanPrijatelj] = useState(null);
  const { prijatelji, setPrijatelji } = useFetch("/users.json");

  if (!prijatelji) {
    return <div>Podaci se ucitavaju...</div>;
  }

  function onSelektuj(prijatelj) {
    setSelectovanPrijatelj((trenutni) =>
      trenutni?.id === prijatelj.id ? null : prijatelj
    );
  }
  function podeliRacun(vrednost) {
    setPrijatelji((prijatelji) =>
      prijatelji.map((prijatelj) =>
        prijatelj.id === selektovanPrijatelj.id
          ? { ...prijatelj, balance: prijatelj.balance + vrednost }
          : prijatelj
      )
    );

    setSelectovanPrijatelj(null);
  }
  function dodajPrijateljaHandler(prijatelj) {
    setPrijatelji((prijatelji) => [...prijatelji, prijatelj]); //raspakuje prijatelji i dodaje novog na kraju


  return (
    <SelektovanPrijateljContext.Provider
      value={{
        selektovanPrijatelj: selektovanPrijatelj,
        onSelektuj: onSelektuj,
        prijatelji: prijatelji,
        dodajPrijateljaHandler: dodajPrijateljaHandler,
        podeliRacun: podeliRacun,
      }}
    >
      <div className={styles.app}>
        <AppSidebar />
        <AppMainbar />
      </div>
    </SelektovanPrijateljContext.Provider>
  );
}
}

export default AppLayout;
