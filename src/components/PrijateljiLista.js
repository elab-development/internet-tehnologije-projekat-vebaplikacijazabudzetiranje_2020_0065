import React from "react";
import { useState } from "react";
import styles from "../components/PrijateljiLista.module.css";
import Prijatelj from "./Prijatelji";

const initialFriends = [
  {
    id: 118836,
    name: "IronWolfz",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Marija",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Eskobar",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function PrijateljiLista() {
  //const [friends, setFriends] = useState(initialFriends);
  return (
    <div className={styles.main}>
      {" "}
      Tvoja lista prijatelja:
      <ul>
        {initialFriends.map((friend) => (
          <Prijatelj friend={friend} />
        ))}
      </ul>
    </div>
  );
}
export default PrijateljiLista;
