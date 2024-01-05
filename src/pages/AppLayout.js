import React from "react";
import AppSidebar from "../components/AppSidebar";
import AppMainbar from "../components/AppMainbar";
import PageNav from "../components/NavigacioniBar";
//import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";
import { createContext, useState, Context, useEffect } from "react";

export const SelektovanPrijateljContext = createContext();

function AppLayout() {
  const [selektovanPrijatelj, setSelectovanPrijatelj] = useState(null);
  const [prijatelji, setPrijatelj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function onSelektuj(prijatelj) {
    setSelectovanPrijatelj((trenutni) =>
      trenutni?.id === prijatelj.id ? null : prijatelj
    );
  }
  function podeliRacun(vrednost) {
    setPrijatelj((prijatelji) =>
      prijatelji.map((prijatelj) =>
        prijatelj.id === selektovanPrijatelj.id
          ? { ...prijatelj, balance: prijatelj.balance + vrednost }
          : prijatelj
      )
    );

    setSelectovanPrijatelj(null);
  }
  function dodajPrijateljaHandler(prijatelj) {
    setPrijatelj((prijatelji) => [...prijatelji, prijatelj]); //raspakuje prijatelji i dodaje novog na kraju
    console.log(prijatelj);
  }
  useEffect(function () {
    async function fetchPrijatelje() {
      try {
        setIsLoading(true);
        const res = await fetch("/users.json");
        const data = await res.json();
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
    return <div>Podaci se ucitavaju...</div>;
  }

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

export default AppLayout;
