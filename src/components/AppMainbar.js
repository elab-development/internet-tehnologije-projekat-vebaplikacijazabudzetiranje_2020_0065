import React from "react";
import PrijateljiPodeliTrosak from "../components/PrijateljiPodeliTrosak";
import UploadExport from "./UploadExport.js";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";
import { useContext } from "react";
import styles from "./AppMainbar.module.css";



function AppMainbar() {
  const { selektovanPrijatelj } = useContext(SelektovanPrijateljContext);

 
  const userRole = window.sessionStorage.getItem("user_role");

 
  const isAdmin = userRole === "admin";

  return (
    <div className={styles.main}>
      <div className={styles.impexp}>
        {/* Prikazivanje UploadExport komponente samo ako je uloga admin */}
        {isAdmin && <UploadExport />}
      </div>
      {selektovanPrijatelj ? <PrijateljiPodeliTrosak /> : <div></div>}
    </div>
  );
}

export default AppMainbar;



