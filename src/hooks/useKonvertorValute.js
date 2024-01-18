import { useState, useEffect } from "react";
import axios from "axios";

function useKonvertorValute() {
  const [valute, setValute] = useState([]);
  const [izabranaValuta, setIzabranaValuta] = useState("");
  const [iznos, setIznos] = useState(1);
  const [konvertovaniIznos, setKonvertovaniIznos] = useState(0);
  const API_KEY = "cur_live_fbUJogUdIP4iEoAG9MQlMt4mZg4J40zSD7KkPGzG"; // Replace with your actual API key

  // Fetching the list of available currencies
  useEffect(() => {
    axios
      .get(`https://api.currencyapi.com/v3/currencies?apikey=${API_KEY}`)
      .then((response) => {
        const fetchedValute = Object.keys(response.data.data);
        setValute(fetchedValute);
        if (fetchedValute.length > 0) {
          setIzabranaValuta(fetchedValute[0]); // Set the default selected currency
        }
      })
      .catch((error) => console.error("Error loading currency list", error));
  }, []);

  // Fetching the conversion rate for the selected currency to RSD
  useEffect(() => {
    if (izabranaValuta) {
      axios
        .get(
          `https://api.currencyapi.com/v3/latest?base_currency=${izabranaValuta}&apikey=${API_KEY}`
        )
        .then((response) => {
          const rate = response.data.data["RSD"].value; // Assuming RSD is in the response
          const iznosZaokruzeno = parseFloat((iznos * rate).toFixed(4));
          setKonvertovaniIznos(iznosZaokruzeno);

          /* setKonvertovaniIznos(iznos * rate).toFixed(4); */
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
