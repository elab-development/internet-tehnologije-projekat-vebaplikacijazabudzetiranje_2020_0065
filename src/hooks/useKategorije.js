import { useState, useEffect } from "react";

export function useKategorije(url) {
  const [kategorije, setKategorije] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrijatelje() {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setKategorije(data.data);
      } catch (e) {
        setError(e.message);
        alert("Došlo je do greške prilikom učitavanja");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPrijatelje();
  }, [url]);

  return { kategorije, setKategorije };
}
