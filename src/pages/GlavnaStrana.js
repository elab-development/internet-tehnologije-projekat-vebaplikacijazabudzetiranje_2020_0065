import styles from "./GlavnaStrana.module.css";
import React from "react";
import NavigacioniBar from "../components/NavigacioniBar";
import { Link } from "react-router-dom";

export default function GlavnaStrana() {
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
        <Link to="/app" className="podeliTrosak">
          Podeli trošak sada
        </Link>
      </section>
    </main>
  );
}
