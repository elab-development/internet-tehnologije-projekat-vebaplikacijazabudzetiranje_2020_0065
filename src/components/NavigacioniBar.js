import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Dugme from "./Dugme";
import styles from "./NavigacioniBar.module.css";
import Logo from "./Logo";
import axios from "axios";

const NavigacioniBar = () => {
  const [logoutMessage, setLogoutMessage] = useState("");

  function handleLogout() {
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/logout',
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
       
        window.sessionStorage.removeItem("auth_token");
        
        setLogoutMessage("Uspešno ste se odjavili.");
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <nav className={styles.navigacioniBar}>
      <Logo type="logo" />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        {logoutMessage && (
          <li className={styles.obavestenje}>{logoutMessage}</li>
        )}
        {window.sessionStorage.getItem("auth_token") ? (
          <li>
            <Dugme type="logoutDugme" onClick={handleLogout}>
              Log out
            </Dugme>
          </li>
        ) : (
          <li>
            <NavLink to="/login" className={styles.link}>
              Log in
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigacioniBar;








