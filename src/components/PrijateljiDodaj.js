import styles from "./PrijateljiDodaj.module.css";
import React from "react";
import { useState } from "react";
import Button from "./Dugme";

function PrijateljiDodaj() {
  const [name, setName] = useState("username");
  const [image, setImage] = useState("mail@gmail.com");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    //onAddFriend(newFriend); Dodaje novog prijatelja u bazu

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <div className={styles.div}>
      Dodaj prijatelja:
      <form className={styles.main} onSubmit={handleSubmit}>
        <label>👫 Ime prijatelja</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>🌄 Email prijatelja</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button type="prijateljDodaj">Dodaj</Button>
      </form>
    </div>
  );
}

export default PrijateljiDodaj;
