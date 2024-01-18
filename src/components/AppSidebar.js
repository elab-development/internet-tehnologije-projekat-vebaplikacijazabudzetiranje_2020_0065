import styles from "./AppSidebar.module.css";
import React from "react";
import Logo from "../components/Logo";
import PrijateljiListaPaginacija from "../components/PrijateljiListaPaginacija";
import Footer from "../components/Footer";
import PrijateljiDodaj from "./PrijateljiDodaj";
import { useState, useContext, useEffect } from "react";
import Dugme from "./Dugme.js";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";
import SearchBar from "./SearchBar.js";

export default function AppSidebar() {
  const [otvoriFormu, setOtvoriFormu] = useState(false);
  const velicinaStrane = 3;

  const { prijatelji } = useContext(SelektovanPrijateljContext);
  const [search, setSearch] = useState("");
  const [filteredPrijatelji, setFilteredPrijatelji] = useState([]);

  useEffect(() => {
    if (prijatelji) {
      const filtered = prijatelji.filter((prijatelj) =>
        prijatelj.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPrijatelji(filtered);
    }
  }, [search, prijatelji]);

  function otvoriFormuHandler() {
    setOtvoriFormu((prikazi) => !prikazi);
  }

  const userRole = window.sessionStorage.getItem("user_role");

  return (
    <div className={styles.sidebar}>
      <Logo type="appLogo" />

      <SearchBar search={search} setSearch={setSearch} />

      <PrijateljiListaPaginacija
        prijatelji={filteredPrijatelji}
        velicinaStrane={velicinaStrane}
      />

      {userRole !== "guest" && otvoriFormu && <PrijateljiDodaj />}

      {userRole !== "guest" && (
        <Dugme type="prijateljDodaj" onClick={otvoriFormuHandler}>
          {otvoriFormu ? "Zatvori" : "Dodaj prijatelja"}
        </Dugme>
      )}

      <Footer />
    </div>
  );
}


