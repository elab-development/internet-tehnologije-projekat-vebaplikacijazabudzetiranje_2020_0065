import React, { useState } from "react";
import Prijatelj from "./Prijatelji.js";
import styles from "../components/PrijateljiListaPaginacija.module.css";
import Dugme from "./Dugme.js";

const PaginationComponent = ({ prijatelji, velicinaStrane }) => {
  const [trenutnaStranica, setTrenutnaStranica] = useState(1);
  const ukupnoStranica = Math.ceil(prijatelji.length / velicinaStrane);

  const pocetniIndeks = (trenutnaStranica - 1) * velicinaStrane;
  const selektovaniPrijatelji = prijatelji.slice(
    pocetniIndeks,
    pocetniIndeks + velicinaStrane
  );

  const goToPage = (pageNumber) => {
    setTrenutnaStranica(pageNumber);
  };
  if (!selektovaniPrijatelji) return;
  return (
    <div>
      <div className={styles.main}>

        <ul>
          {selektovaniPrijatelji.map((prijatelj) => (
                        <Prijatelj
                        prijatelj={prijatelj}
                        key={prijatelj.id + prijatelj.ime}
                      />
          ))}
        </ul>
      </div>

      <div className={styles.divZaDugmice}>
        {Array.from({ length: ukupnoStranica }, (_, index) => (
          <Dugme type="dugmePaginacija" onClick={() => goToPage(index + 1)}>
            {index + 1}
          </Dugme>
        ))}
      </div>
    </div>
  );
};

export default PaginationComponent;
