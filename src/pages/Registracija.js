import styles from "./Registracija.module.css";
import React, { useState } from "react";
import NavigacioniBar from "../components/NavigacioniBar";
import Dugme from "../components/Dugme";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Registracija() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const registerPodaci = {
      name: username,
      email: email,
      password: password,
    };

    axios
      .post("http://127.0.0.1:8000/api/register", registerPodaci)
      .then((response) => {
        

        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
        
      });
  };

  return (
    <main className={styles.main}>
      <NavigacioniBar />
      <form className={styles.forma} onSubmit={handleRegister}>
        <div className={styles.polje}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleInput}
            value={username}
          />
        </div>

        <div className={styles.polje}>
          <label htmlFor="email">Email adresa</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInput}
            value={email}
          />
        </div>

        <div className={styles.polje}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
            value={password}
          />
        </div>

        <Dugme type="registracijaDugme">Registruj se</Dugme>
      </form>
    </main>
  );
}



