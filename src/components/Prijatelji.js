import React from "react";
import styles from "../components/Prijatelj.module.css";
import Dugme from "./Dugme";
import { useContext } from "react";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";

function Prijatelj({ prijatelj }) {
  const { selektovanPrijatelj } = useContext(SelektovanPrijateljContext);
  const { onSelektuj } = useContext(SelektovanPrijateljContext);

  const selektovan = selektovanPrijatelj?.id === prijatelj.id;

  return (
    <li className={styles.prijatelj}>
      <img src={prijatelj.slika} alt={prijatelj.ime} />
      <h3>{prijatelj.ime}</h3>
      {prijatelj.balance === 0 && <p>Ti i {prijatelj.ime} nemate dugovanja</p>}

      {prijatelj.balance > 0 && (
        <p className={styles.green}>
          {prijatelj.ime} ti duguje {Math.abs(prijatelj.balance)}€
        </p>
      )}

      {prijatelj.balance < 0 && (
        <p className={styles.red}>
          Duguješ {prijatelj.ime} {Math.abs(prijatelj.balance)}€
        </p>
      )}

      <Dugme onClick={() => onSelektuj(prijatelj)} type="prijateljDugme">
        {selektovan ? "Zatvori" : "Izaberi"}
      </Dugme>
    </li>
  );
}
export default Prijatelj;
