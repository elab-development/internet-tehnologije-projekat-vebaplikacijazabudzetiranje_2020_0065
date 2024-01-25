import React, { useState, useContext, useEffect } from "react";
import styles from "../components/PrijateljiPodeliTrosak.module.css";
import Dugme from "./Dugme.js";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";
import { useKategorije } from "../hooks/useKategorije.js";
import axios from "axios";
import useKonvertorValute from "../hooks/useKonvertorValute.js";

function PrijateljiPodeliTrosak() {
  const {
    valute,
    izabranaValuta,
    setIzabranaValuta,
    iznos,
    setIznos,
    konvertovaniIznos,
  } = useKonvertorValute();

  const handleConvertedAmountChange = (e) => {
    setIznos(Number(e.target.value));
  };

  useEffect(() => {
    if (valute.length > 0 && !izabranaValuta) {
      setIzabranaValuta(valute[0]);
    }
  }, [valute, izabranaValuta, setIzabranaValuta]);

  const [description, setDescription] = useState("");
  const [category_id, setCategoryID] = useState("");
  const [transaction_date, setTransactionDate] = useState("");
  const [refund, setRefund] = useState("");
  const [paidby, setPaidBy] = useState("korisnik");

  const prijateljDeo = konvertovaniIznos.RSD
    ? konvertovaniIznos.RSD - refund
    : "";

  const { selektovanPrijatelj, setPromenjeno } = useContext(
    SelektovanPrijateljContext
  );

  const { kategorije } = useKategorije("http://127.0.0.1:8000/api/categories");

  if (!kategorije) {
    return <div>Podaci se ucitavaju...</div>;
  }

  async function podeliDug(dug, idPrijatelja) {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/friends/${idPrijatelja}/${dug}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Došlo je do greške prilikom ažuriranja podataka!", error);
    }
    setPromenjeno(dug);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Submitting form...");
    console.log("Amount:", konvertovaniIznos.RSD);
    console.log("Refund:", refund);
    console.log("Category ID:", category_id);
    console.log("Transaction Date:", transaction_date);

    if (
      !konvertovaniIznos.RSD ||
      !refund ||
      !category_id ||
      !transaction_date
    ) {
      console.log("Validation failed: Some required fields are missing.");
      return;
    }

    const user_id = window.sessionStorage.getItem("user_id");
    const name = window.sessionStorage.getItem("name");

    const updatedPaidBy =
      paidby === "korisnik" ? name : selektovanPrijatelj.name;

    const noviRacun = {
      description,
      transaction_date,
      amount: konvertovaniIznos.RSD,
      refund,
      paidby: updatedPaidBy,
      user_id,
      category_id,
    };
    console.log("Novi racun:", noviRacun);

    try {
      console.log("Šaljem POST zahtev serveru...");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/spendings",
        noviRacun,
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "auth_token"
            )}`,
          },
        }
      );
      console.log("Uspešno dodat novi trošak:", response.data);
      alert("Uspešno dodat novi trošak!");
    } catch (error) {
      console.error("Došlo je do greške prilikom slanja zahteva:", error);
      console.log("Detalji greške:", error.response.data);
      alert(
        `Došlo je do greške prilikom slanja zahteva: ${error.response.data.message}`
      );
      return;
    }

    podeliDug(
      updatedPaidBy === name ? prijateljDeo : -refund,
      selektovanPrijatelj.id
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Podeli trošak sa: {selektovanPrijatelj.name}</h2>
      <label>Opis troska</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Izabrana valuta</label>
      <select
        value={izabranaValuta}
        onChange={(e) => setIzabranaValuta(e.target.value)}
      >
        {valute.length > 0 ? (
          valute.map((valuta) => (
            <option key={valuta} value={valuta}>
              {valuta}
            </option>
          ))
        ) : (
          <option>Loading...</option>
        )}
      </select>
      <label>Račun (u izabranoj valuti)</label>
      <input type="text" value={iznos} onChange={handleConvertedAmountChange} />

      <label>Konvertovani iznos u RSD</label>
      <input
        type="text"
        value={
          konvertovaniIznos.RSD !== null && !isNaN(konvertovaniIznos.RSD)
            ? konvertovaniIznos.RSD
            : ""
        }
        onChange={(e) => setIznos(Number(e.target.value))}
      />
      <label>Kategorija</label>
      <select
        value={category_id}
        onChange={(e) => setCategoryID(e.target.value)}
      >
        {kategorije.map((kategorija) => (
          <option key={kategorija.id} value={kategorija.id}>
            {kategorija.name}
          </option>
        ))}
      </select>
      <label>Datum</label>
      <input
        type="date"
        value={transaction_date}
        onChange={(e) => setTransactionDate(e.target.value)}
      />
      <label>Tvoj trošak</label>
      <input
        type="text"
        value={refund}
        onChange={(e) =>
          setRefund(
            Number(e.target.value) > konvertovaniIznos.RSD
              ? refund
              : Number(e.target.value)
          )
        }
      />
      <label>Prijateljski trošak</label>
      <input type="text" readOnly value={prijateljDeo} />
      <label>Ko je platio račun</label>
      <select value={paidby} onChange={(e) => setPaidBy(e.target.value)}>
        <option value="korisnik">Ti</option>
        <option value="prijatelj">{selektovanPrijatelj.name}</option>
      </select>

      <Dugme type="podeliTrosak" onClick={handleSubmit}>
        Podeli
      </Dugme>
    </form>
  );
}

export default PrijateljiPodeliTrosak;
