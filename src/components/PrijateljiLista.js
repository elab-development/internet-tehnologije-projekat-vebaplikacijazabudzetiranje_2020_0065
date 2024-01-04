import React from "react";
import styles from "../components/PrijateljiLista.module.css";
import Prijatelj from "./Prijatelji.js";

function PrijateljiLista({ prijatelji }) {
  return (
    <div className={styles.main}>
    Tvoja lista prijatelja:
    <ul>
    {prijatelji.map((prijatelj) => (
          <Prijatelj prijatelj={prijatelj} key={prijatelj.id} />
        ))}
      </ul>
    </div>
  );
}
export default PrijateljiLista;
