import styles from "./PrijateljiDodaj.module.css";
import React from "react";
import { useState, useContext } from "react";
import Button from "../components/Dugme";
import axios from "axios";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";

export default function PrijateljiDodaj() {
  const [name, setName] = useState("username");
  const [email, setEmail] = useState("mail@gmail.com");
  const [image, setImage] = useState("https://picsum.photos/200");

  const { dodajPrijateljaHandler } = useContext(SelektovanPrijateljContext);

  async function handleSubmit(e) {
    e.preventDefault(); //sprecava da se stranica ponovo ucita

    if (!name || !image) return;
    const noviPrijatelj = {
      name,
      image: `${image}`,
      balance: 0,
      email,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/friends",
        noviPrijatelj
      );
    } catch (error) {
      console.error("There was an error!", error);
    }
    dodajPrijateljaHandler(noviPrijatelj);
  }

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
      <label>Ime prijatelja</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email prijatelja</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>URL slike</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button type="prijateljDodaj" onClick={handleSubmit}>
        Dodaj
      </Button>
    </form>
  );
}
