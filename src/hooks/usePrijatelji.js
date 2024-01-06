import { useState, useEffect } from "react";

export function usePrijatelji(url) {
  const [prijatelji, setPrijatelji] = useState(null);
  const [promenjeno, setPromenjeno] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrijatelje() {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setPrijatelji(data.data);
      } catch (e) {
        setError(e.message);
        alert("Došlo je do greške prilikom učitavanja");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPrijatelje();
  }, [url, promenjeno]);

  return { prijatelji, setPrijatelji, promenjeno, setPromenjeno };
}
