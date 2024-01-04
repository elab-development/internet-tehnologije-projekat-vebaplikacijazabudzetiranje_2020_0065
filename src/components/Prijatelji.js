import React from "react";
import { useState } from "react";
import styles from "../components/Prijatelj.module.css";
import Dugme from "./Dugme";

function Prijatelj({ friend }) {
  return (
    <li className={styles.prijatelj}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance === 0 && <p>Ti i {friend.name} nemate dugovanja</p>}

      {friend.balance > 0 && (
        <p className={styles.green}>
          {friend.name} ti duguje {Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance < 0 && (
        <p className={styles.red}>
          Duguješ {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}

      <Dugme type="prijateljDugme">Izaberi</Dugme>
    </li>
  );
}
export default Prijatelj;