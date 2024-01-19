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
  const [amount, setAmount] = useState("");
  const [category_id, setCategoryID] = useState("");
  const [transaction_date, setTransactionDate] = useState("");
  const [refund, setRefund] = useState("");
  const [paidby, setPaidBy] = useState("korisnik");
  //const [prijateljDeo, setPrijateljDeo] = useState(""); // Dodatno stanje za prijateljDeo

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
      console.error("There was an error updating the data!", error);
    }
    setPromenjeno(dug);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Submitting form...");
    /*
   if (!amount || !refund || !category_id || !transaction_date) {
      console.log("Validation failed: Some required fields are missing.");
      return;
    } 
*/
    const user_id = selektovanPrijatelj.id;
    const noviRacun = {
      description,
      transaction_date,
      amount: konvertovaniIznos.RSD,
      refund,
      paidby: updatedPaidBy, // Ažurirana vrednost paidby
      user_id, // Koristi user_id za kreiranje spending-a
      category_id,
    };
    console.log("Novi racun:", noviRacun); // Log the new transaction object
    /*
    try {
      console.log("Sending POST request to server...");
      const response = await axios.post(
        // "http://127.0.0.1:8000/api/spendings",
        noviRacun
      );
      console.log("Response from server:", response);
*/
    if (paidby === "korisnik") {
      console.log("Paying user's share to friend...");
      podeliDug(prijateljDeo, user_id);
    } else {
      console.log("Paying friend's share to user...");
      podeliDug(-refund, user_id);
    }
    /* } catch (error) {
      console.error("There was an error!", error);
    }
    */
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
        onChange={(e) => setAmount(Number(e.target.value))}
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
