import styles from "./Login.module.css";
import React from "react";
import { useState } from "react";
import NavigacioniBar from "../components/NavigacioniBar";
import Dugme from "../components/Dugme";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("tvoj_email@gmail.com");
  const [password, setPassword] = useState("vasasifra");

  async function loginUser(e) {
    e.preventDefault();

    const emailU = email;
    const passwordU = password;
    const loginPodaci = {
      emailU,
      passwordU,
    };
    console.log(loginPodaci);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        loginPodaci
      );
      console.log(response);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

  return (
    <main className={styles.main}>
      <NavigacioniBar />
      <form className={styles.forma}>
        <div className={styles.polje}>
          <label htmlFor="email">Email addresa</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className={styles.paragraf}>
          <label>
            Nemas nalog?
            <NavLink to="/registracija" className={styles.registracija}>
              Registruj se sada.
            </NavLink>
          </label>
        </div>
        <Dugme type="loginDugme">Login</Dugme>
      </form>
    </main>
  );
}
