import { useEffect, useState } from "react";
import axios from "axios";

function useKonvertorValute() {
  const [valute, setValute] = useState([]);
  const [izabranaValuta, setIzabranaValuta] = useState("");
  const [iznos, setIznos] = useState(1);
  const [konvertovaniIznos, setKonvertovaniIznos] = useState({});
  const API_KEY = "8c878be87e7e8f06690a99e7"; // Zamenite sa svojim stvarnim API ključem

  // Fetch the list of available currencies and their conversion rates
  useEffect(() => {
    axios
      .get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/RSD`)
      .then((response) => {
        const data = response.data;
        if (data && data.conversion_rates) {
          const fetchedValute = Object.keys(data.conversion_rates);
          setValute(fetchedValute);
          if (fetchedValute.length > 0) {
            setIzabranaValuta(fetchedValute[0]); // Set the default selected currency
          }
        }
      })
      .catch((error) => console.error("Error loading currency list", error));
  }, []);

  // Fetch the conversion rates for the selected currency
  useEffect(() => {
    if (izabranaValuta) {
      axios
        .get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${izabranaValuta}/RSD`
        )
        .then((response) => {
          const data = response.data;
          if (data && data.conversion_rate) {
            const rate = data.conversion_rate;
            const iznosZaokruzeno = parseFloat((iznos * rate).toFixed(4));
            const konvertovaniIznosObj = {
              RSD: iznosZaokruzeno,
            };
            setKonvertovaniIznos(konvertovaniIznosObj);
          }
        })
        .catch((error) => console.error("Error converting currency", error));
    }
  }, [izabranaValuta, iznos]);

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
