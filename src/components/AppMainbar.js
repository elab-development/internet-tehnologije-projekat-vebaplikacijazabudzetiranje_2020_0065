//import styles from "./AppMainbar.module.css";
import React from "react";
import PrijateljiPodeliTrosak from "../components/PrijateljiPodeliTrosak";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";
import { useContext } from "react";

function AppMainbar() {
  const { selektovanPrijatelj } = useContext(SelektovanPrijateljContext);
  return <div>{selektovanPrijatelj && <PrijateljiPodeliTrosak />}</div>;
}

export default AppMainbar;
