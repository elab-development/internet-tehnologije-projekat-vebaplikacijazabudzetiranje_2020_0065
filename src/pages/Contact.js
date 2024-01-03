import styles from "./Contact.module.css";
import React from "react";
import NavigacioniBar from "../components/NavigacioniBar";
//Svaka komponenta ima svoj .css fajl (css module)
export default function Contact() {
  return (
    <main className={styles.contact}>
      <NavigacioniBar />
      <section>
        <img src="/fon.jpg" alt="Fakultet Organizacionih Nauka" />
        <div>
          <h2>O nama</h2>
          <p>
            "Dobrodošli na našu platformu za efikasno deljenje troškova! Mi smo
            tim koji veruje da svakodnevni finansijski zadaci mogu biti
            jednostavniji. Naša aplikacija omogućava grupama ljudi da lako
            organizuju i prate svoje troškove, čineći proces deljenja računa i
            zajedničkih troškova bržim i boljim."
          </p>
          <p>
            Sa fokusom na jednostavnosti, želimo vam pružiti siguran prostor u
            kojem se finansije lako dele, a svaki pojedinac doprinosi
            zajedničkom cilju efikasnog upravljanja grupnim troškovima."
          </p>
        </div>
      </section>
    </main>
  );
}
