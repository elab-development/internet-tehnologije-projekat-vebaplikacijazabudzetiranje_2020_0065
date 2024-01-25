import React from "react";
import AppSidebar from "../components/AppSidebar";
import AppMainbar from "../components/AppMainbar";
import styles from "./AppLayout.module.css";
import { createContext, useState, Context, useEffect } from "react";
import { usePrijatelji } from "../hooks/usePrijatelji.js";
import CategoryUsageChart from "../components/CategoryUsageChart";

export const SelektovanPrijateljContext = createContext();

export default function AppLayout() {
  const [selektovanPrijatelj, setSelectovanPrijatelj] = useState(null);
  const { prijatelji, setPrijatelji, promenjeno, setPromenjeno } =
    usePrijatelji("http://127.0.0.1:8000/api/friends");

  const userRole = window.sessionStorage.getItem("user_role");

  const isAdmin = userRole === "admin";

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
    setPrijatelji((prijatelji) => [...prijatelji, prijatelj]);
  }

  return (
    <SelektovanPrijateljContext.Provider
      value={{
        selektovanPrijatelj: selektovanPrijatelj,
        onSelektuj: onSelektuj,
        prijatelji: prijatelji,
        dodajPrijateljaHandler: dodajPrijateljaHandler,
        podeliRacun: podeliRacun,
        setPromenjeno: setPromenjeno,
      }}
    >
      <div className={styles.app}>
        <AppSidebar />
        <AppMainbar />

        {isAdmin && (
          <section className={styles.corner}>
            <CategoryUsageChart />
          </section>
        )}
      </div>
    </SelektovanPrijateljContext.Provider>
  );
}
