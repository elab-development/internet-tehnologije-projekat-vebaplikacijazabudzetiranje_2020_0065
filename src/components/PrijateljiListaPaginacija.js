import React, { useState, useEffect } from "react";
import axios from "axios";
import Prijatelj from "./Prijatelj";
import Dugme from "./Dugme";
import styles from "../components/PrijateljiListaPaginacija.module.css";

const PrijateljiListaPaginacija = () => {
  const [prijatelji, setPrijatelji] = useState([]);
  const [trenutnaStranica, setTrenutnaStranica] = useState(1);
  const [ukupnoStranica, setUkupnoStranica] = useState(1);

  useEffect(() => {
    const dohvatiPrijateljePaginacija = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/friends/paginate?per_page=3&page=${trenutnaStranica}`
        );

        if (response.data) {
          setPrijatelji(response.data.data);
          setUkupnoStranica(response.data.meta.last_page);
        } else {
          console.error("Greška: Nema 'data' svojstva u odgovoru.");
        }
      } catch (error) {
        console.error(
          "Greška prilikom dohvatanja paginiranih prijatelja",
          error
        );
      }
    };

    dohvatiPrijateljePaginacija();
  }, [trenutnaStranica]);

  const goToPage = (pageNumber) => {
    setTrenutnaStranica(pageNumber);
  };

  return (
    <div>
      <div className={styles.main}>
        <ul>
          {prijatelji.map((prijatelj) => (
            <Prijatelj key={prijatelj.id} prijatelj={prijatelj} />
          ))}
        </ul>
      </div>

      <div className={styles.divZaDugmice}>
        {[...Array(ukupnoStranica).keys()].map((page) => (
          <Dugme
            key={page + 1}
            type="dugmePaginacija"
            onClick={() => goToPage(page + 1)}
            className={page + 1 === trenutnaStranica ? styles.activePage : ""}
          >
            {page + 1}
          </Dugme>
        ))}
      </div>
    </div>
  );
};

export default PrijateljiListaPaginacija;
