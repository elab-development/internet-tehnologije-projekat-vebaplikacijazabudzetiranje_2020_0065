// Registracija.js
import styles from "./Registracija.module.css";
import React, { useState } from "react";
import NavigacioniBar from "../components/NavigacioniBar";
import Dugme from "../components/Dugme";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registracija() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "role") {
      setRole(value);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const registerPodaci = {
      name: username,
      email: email,
      password: password,
      role: role,
    };

    axios
      .post("http://127.0.0.1:8000/api/register", registerPodaci)
      .then((response) => {
        console.log(response.data);
        const { role } = response.data;

        window.sessionStorage.setItem("user_role", role);

        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Došlo je do greške:", error.response.data);
        } else if (error.request) {
          console.error("Server nije odgovorio.");
        } else {
          console.error(
            "Došlo je do greške prilikom slanja zahteva:",
            error.message
          );
        }
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

        <div className={styles.polje}>
          <label htmlFor="role">Uloga</label>
          <select id="role" name="role" onChange={handleInput} value={role}>
            <option value="admin">admin</option>
            <option value="guest">guest</option>
            <option value="user">user</option>
          </select>
        </div>

        <Dugme type="registracijaDugme">Registruj se</Dugme>
      </form>
    </main>
  );
}
