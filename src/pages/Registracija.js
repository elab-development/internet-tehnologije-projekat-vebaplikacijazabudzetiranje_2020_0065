import styles from "./Registracija.module.css";
import React from "react";
import { useState } from "react";
import NavigacioniBar from "../components/NavigacioniBar";
import Dugme from "../components/Dugme";


export default function Registracija() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={styles.main}>
      <NavigacioniBar />
      <form className={styles.forma}>
      <div className={styles.polje}>
          <label htmlFor="password">Username</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.polje}>
          <label htmlFor="password">Url slike</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className={styles.polje}>
          <label htmlFor="email">Email addresa</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>


        <div className={styles.polje}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        
        <Dugme type="registracijaDugme">Registruj se</Dugme>
      </form>
    </main>
  );
}