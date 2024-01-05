import React from "react";
import { useState, useContext } from "react";
import styles from "../components/PrijateljiPodeliTrosak.module.css";
import Dugme from "./Dugme.js";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";

function PrijateljiPodeliTrosak() {
  const [racun, setRacun] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [datum, setDatum] = useState("");
  const [mojDeo, setMojDeo] = useState("");
  const prijateljDeo = racun ? racun - mojDeo : "";
  const [koPlaca, setKoPlaca] = useState("korisnik");
  const { selektovanPrijatelj } = useContext(SelektovanPrijateljContext);
  const { podeliRacun } = useContext(SelektovanPrijateljContext);

  function platiSubmit(e) {
    e.preventDefault();

    if (!racun || !mojDeo) return;

    podeliRacun(koPlaca === "korisnik" ? prijateljDeo : -mojDeo);

    const id = crypto.randomUUID();
    const noviPrijatelj = {
      racun,
      kategorija,
      datum,
      koPlaca,
    };
  }

  return (
    <form className={styles.form} onSubmit={platiSubmit}>
      <h2>Podeli trošak sa: {selektovanPrijatelj.ime}</h2>
      <label>Račun</label>
      <input
        type="text"
        value={racun}
        onChange={(e) => setRacun(Number(e.target.value))}
      />
      <label>Kategorija</label>
      <input
        type="text"
        value={kategorija}
        onChange={(e) => setKategorija(e.target.value)}
      />
      <label>Datum</label>
      <input
        type="date"
        value={datum}
        onChange={(e) => setDatum(e.target.value)}
      />
      <label>Tvoj trošak</label>
      <input
        type="text"
        value={mojDeo}
        onChange={(e) =>
          setMojDeo(
            Number(e.target.value) > racun ? mojDeo : Number(e.target.value)
          )
        }
      />

      <label>Prijateljski trošak</label>
      <input type="text" disabled value={prijateljDeo} />

      <label>Ko je platio račun</label>
      <select value={koPlaca} onChange={(e) => setKoPlaca(e.target.value)}>
        <option value="korisnik">Ti</option>
        <option value="prijatelj">{selektovanPrijatelj.ime}</option>
      </select>

      <Dugme type="podeliTrosak">Podeli </Dugme>
    </form>
  );
}

export default PrijateljiPodeliTrosak;
