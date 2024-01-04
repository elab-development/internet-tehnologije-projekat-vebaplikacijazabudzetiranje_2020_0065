import React from "react";
import { useState } from "react";
import styles from "../components/PrijateljiPodeliTrosak.module.css";
import Dugme from "./Dugme.js";

function PrijateljiPodeliTrosak() {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    //if (!bill || !paidByUser) return;
    // onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Podeli trošak sa: {/*selectedFriend.name */}</h2>
      <label>Račun</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Tvoj trošak</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label> {/*selectedFriend.name*/}Prijateljski trošak</label>
      <input type="text" disabled value={paidByFriend} />

      <label>Ko je platio račun</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{/*selectedFriend.name */}</option>
      </select>

      <Dugme type="podeliTrosak">Split bill</Dugme>
    </form>
  );
}

export default PrijateljiPodeliTrosak;
