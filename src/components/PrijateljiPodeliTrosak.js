import React from "react";
import { useState, useContext, useEffect } from "react";
import styles from "../components/PrijateljiPodeliTrosak.module.css";
import Dugme from "./Dugme.js";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";
import { useKategorije } from "../hooks/useKategorije.js";
import axios from "axios";

function PrijateljiPodeliTrosak() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category_id, setCategoryID] = useState("");
  const [transaction_date, setTransactionDate] = useState("");
  const [refund, setRefund] = useState("");
  const prijateljDeo = amount ? amount - refund : "";
  const [paidby, setPaidBy] = useState("korisnik");

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

    if (!amount || !refund || !category_id || !transaction_date) return;

    const user_id = selektovanPrijatelj.id;
    const noviRacun = {
      description,
      transaction_date,
      amount,
      refund,
      paidby,
      user_id,
      category_id,
    };
    console.log(noviRacun);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/spendings",
        noviRacun
      );
      console.log(response);
    } catch (error) {
      console.error("There was an error!", error);
    }
    podeliDug(paidby === "korisnik" ? prijateljDeo : -refund, user_id);
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
      <label>Račun</label>
      <input
        type="text"
        value={amount}
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
            Number(e.target.value) > amount ? refund : Number(e.target.value)
          )
        }
      />
      <label>Prijateljski trošak</label>
      <input type="text" disabled value={prijateljDeo} />
      <label>Ko je platio račun</label>
      <select value={paidby} onChange={(e) => setPaidBy(e.target.value)}>
        <option value="korisnik">Ti</option>
        <option value="prijatelj">{selektovanPrijatelj.name}</option>
      </select>
      <Dugme type="podeliTrosak" onClick={handleSubmit}>
        Podeli{" "}
      </Dugme>
    </form>
  );
}

export default PrijateljiPodeliTrosak;
