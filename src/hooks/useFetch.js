import { useState, useEffect } from "react";

export function useFetch(url) {
  const [prijatelji, setPrijatelji] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrijatelje() {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setPrijatelji(data);
      } catch (e) {
        setError(e.message);
        alert("Došlo je do greške prilikom učitavanja");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPrijatelje();
  }, [url]);

  return { prijatelji, setPrijatelji, isLoading, error };
}