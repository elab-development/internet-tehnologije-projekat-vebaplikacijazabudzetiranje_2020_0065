import styles from "./Login.module.css";
import React, { useState } from "react";
import NavigacioniBar from "../components/NavigacioniBar";
import Dugme from "../components/Dugme";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null); // Dodato stanje za prikazivanje greške
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Dodato stanje za praćenje statusa prijave

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const loginPodaci = {
      email: email,
      password: password,
    };

    axios
      .post("http://127.0.0.1:8000/api/login", loginPodaci)
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          window.sessionStorage.setItem("auth_token", response.data.access_token);
          setIsLoggedIn(true); // Postavljanje stanja da je korisnik prijavljen
          setLoginError(null); // Resetovanje stanja za prikazivanje greške
        }
      })
      .catch((error) => {
        console.error("Došlo je do greške!", error);
        setLoginError("Pogrešan email ili lozinka."); // Postavljanje stanja za prikazivanje greške
      });
  };

  return (
    <main className={styles.main}>
      <NavigacioniBar />
      <form className={styles.forma} onSubmit={handleLogin}>
        {isLoggedIn ? (
          // Prikaz obaveštenja ako je korisnik prijavljen
          <div className={styles.obavestenje}>Uspešno ste prijavljeni!</div>
        ) : null}
        {loginError ? (
          // Prikaz greške ako postoji
          <div className={styles.greska}>{loginError}</div>
        ) : null}
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

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
            value={password}
          />
        </div>
        <div className={styles.paragraf}>
          <label>
            Nemate nalog?
            <NavLink to="/registracija" className={styles.registracija}>
              Registrujte se sada.
            </NavLink>
          </label>
        </div>
        <Dugme type="loginDugme">Login</Dugme>
      </form>
    </main>
  );
}



