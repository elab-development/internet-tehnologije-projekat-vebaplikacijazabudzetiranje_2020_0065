import React from "react";
import styles from "../components/Prijatelj.module.css";
import Dugme from "./Dugme";
import { useContext } from "react";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";
import axios from "axios";

function Prijatelj({ prijatelj }) {
  const { selektovanPrijatelj, setPromenjeno } = useContext(
    SelektovanPrijateljContext
  );
  const { onSelektuj } = useContext(SelektovanPrijateljContext);

  const selektovan = selektovanPrijatelj?.id === prijatelj.id;

  async function obrisi(id) {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/friends/${id}`
      );
      console.log("Item deleted successfully:", response.data);
    } catch (error) {
      console.error("There was an error deleting the item:", error);
    }
    setPromenjeno(id);
  }

  return (
    <li className={styles.prijatelj}>
      <img src={prijatelj.image} alt={prijatelj.name} />
      <h3>{prijatelj.name}</h3>
      {prijatelj.balance === 0 && <p>Ti i {prijatelj.name} nemate dugovanja</p>}

      {prijatelj.balance > 0 && (
        <p className={styles.green}>
          {prijatelj.name} ti duguje {Math.abs(prijatelj.balance)}€
        </p>
      )}

      {prijatelj.balance < 0 && (
        <p className={styles.red}>
          Duguješ {prijatelj.name} {Math.abs(prijatelj.balance)}€
        </p>
      )}

      <Dugme onClick={() => obrisi(prijatelj.id)} type="obrisi">
        X
      </Dugme>

      <Dugme onClick={() => onSelektuj(prijatelj)} type="prijateljDugme">
        {selektovan ? "Zatvori" : "Izaberi"}
      </Dugme>
    </li>
  );
}
export default Prijatelj;
