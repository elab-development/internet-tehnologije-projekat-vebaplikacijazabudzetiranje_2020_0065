import styles from "./Login.module.css";
import React from "react";
import { useState } from "react";
import NavigacioniBar from "../components/NavigacioniBar";

import { NavLink } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("tvoj_email@gmail.com");
  const [password, setPassword] = useState("vasasifra");

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
      </form>
    </main>
  );
}
