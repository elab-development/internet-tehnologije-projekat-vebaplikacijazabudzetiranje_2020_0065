// GlavnaStrana.js
import styles from "./GlavnaStrana.module.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigacioniBar from "../components/NavigacioniBar";
import Dugme from "../components/Dugme"; // Uvezli smo Dugme komponentu

export default function GlavnaStrana() {
  const accessToken = window.sessionStorage.getItem("auth_token");
  const navigate = useNavigate();

  const handlePodeliTrosak = () => {
    if (!accessToken) {
      alert("Morate biti prijavljeni da biste podelili trošak.");
      return;
    }
    navigate("/app");
  };

  return (
    <main className={styles.glavnaStrana}>
      <NavigacioniBar />
      <section>
        <h1>
          Voliš da izlaziš sa društvom
          <br />
          sa kojim podela troškova ne ide baš najbolje?
        </h1>
        <h2>
          Onda PodeliTroškić aplikacija je prava za vas. U samo jednom koraku
          izračunaj svotu novca koju svako treba da plati, ukoliko neko nema
          sitno, plati za njega, a njemu će stići mejl koliko duguje.
        </h2>

        <Dugme type="podeliTrosakDugme" onClick={handlePodeliTrosak}>
          Podeli trošak sada
        </Dugme>
      </section>
    </main>
  );
}

