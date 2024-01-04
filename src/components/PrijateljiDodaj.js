import styles from "./PrijateljiDodaj.module.css";
import React from "react";
import { useState } from "react";
import Button from "./Dugme";

function PrijateljiDodaj({ onAddDodaj }) {
  const [ime, setIme] = useState("username");
  const [email, setEmail] = useState("mail@gmail.com");
  const [slika, setSlika] = useState(
    "https://i.postimg.cc/wjM3zGnN/1696160917795357.png"
  );

  function handleSubmit(e) {
    e.preventDefault(); //sprecava da se stranica ponovo ucita

    if (!ime || !slika) return;

    const id = crypto.randomUUID();
    const noviPrijatelj = {
      id,
      ime,
      slika: `${slika}?=${id}`,
      balance: 0,
      email,
    };
    onAddDodaj(noviPrijatelj); //Dodaje novog prijatelja u bazu

  }
    return (
      <form className={styles.main} onSubmit={handleSubmit}>
      <label>Ime prijatelja</label>
      <input type="text" value={ime} onChange={(e) => setIme(e.target.value)} />

      <label>Email prijatelja</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>URL slike</label>
      <input
        type="text"
        value={slika}
        onChange={(e) => setSlika(e.target.value)}
      />
      <Button type="prijateljDodaj">Dodaj</Button>
    </form>
   
  );
}

export default PrijateljiDodaj;
