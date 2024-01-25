import styles from "./PrijateljiDodaj.module.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";
import Dugme from "./Dugme.js";

export default function PrijateljiDodaj() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  const { dodajPrijateljaHandler, prijatelji } = useContext(
    SelektovanPrijateljContext
  );

  useEffect(() => {
    console.log("Prijatelji su ažurirani!", prijatelji);
  }, [prijatelji]);

  useEffect(() => {
    if (searchTerm) {
      const fetchGifs = async () => {
        try {
          const response = await axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=UagNCjf7ln8R6fK6rchsaUBtm0cEPbpj&q=${searchTerm}&limit=10`
          );
          setGifs(response.data.data);
        } catch (error) {
          console.error("Error fetching gifs:", error);
        }
      };

      fetchGifs();
    }
  }, [searchTerm]);

  const handleGifSelect = (gifUrl) => {
    setSelectedGif(gifUrl);
    setGifs([]);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !selectedGif) return;

    const noviPrijatelj = {
      name,
      image: selectedGif,
      balance: 0,
      email,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/friends", noviPrijatelj);

      dodajPrijateljaHandler(noviPrijatelj);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <label>Ime prijatelja</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email prijatelja</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className={styles.searchContainer}>
        <label>Izaberi GIF kao sliku:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt="GIF"
            onClick={() => handleGifSelect(gif.images.fixed_height.url)}
          />
        ))}
      </div>

      {selectedGif && (
        <>
          <label>Izabrani GIF</label>
          <img src={selectedGif} alt="Izabrani GIF" />
        </>
      )}

      <div className={styles.buttonContainer}>
        <Dugme type="prijateljDodaj1">Dodaj</Dugme>
      </div>
    </form>
  );
}
