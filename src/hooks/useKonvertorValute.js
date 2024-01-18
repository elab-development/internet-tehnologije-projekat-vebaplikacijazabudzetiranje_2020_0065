import { useEffect, useState } from "react";
import axios from "axios";

function useKonvertorValute() {
  const [valute, setValute] = useState([]);
  const [izabranaValuta, setIzabranaValuta] = useState("");
  const [iznos, setIznos] = useState(1);
  const [konvertovaniIznos, setKonvertovaniIznos] = useState({});
  const API_KEY = "8c878be87e7e8f06690a99e7"; // Replace with your actual API key
  const BASE_CURRENCY = "USD"; // Replace with the base currency you want

  // Fetch the list of available currencies and their conversion rates
  useEffect(() => {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`
      )
      .then((response) => {
        const data = response.data;
        if (data.result === "success") {
          const rates = { ...data.conversion_rates };
          delete rates[BASE_CURRENCY]; // Remove the base currency from the list
          setValute(Object.keys(rates));
        } else {
          console.error("Error loading currency data:", data["error-type"]);
        }
      })
      .catch((error) => console.error("Error loading currency list", error));
  }, []);

  // Fetch the conversion rates for the selected currency
  useEffect(() => {
    if (izabranaValuta) {
      axios
        .get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${izabranaValuta}`
        )
        .then((response) => {
          const data = response.data;
          if (data.result === "success") {
            setKonvertovaniIznos(data.conversion_rates);
          } else {
            console.error("Error converting currency:", data["error-type"]);
          }
        })
        .catch((error) => console.error("Error converting currency", error));
    }
  }, [izabranaValuta]);

  return {
    valute,
    izabranaValuta,
    setIzabranaValuta,
    iznos,
    setIznos,
    konvertovaniIznos,
  };
}

export default useKonvertorValute;
