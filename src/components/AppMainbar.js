//import styles from "./AppMainbar.module.css";
import React from "react";
import PrijateljiPodeliTrosak from "../components/PrijateljiPodeliTrosak";
import ImportExport from "./ImportExport.js";
import { SelektovanPrijateljContext } from "../pages/AppLayout.js";
import { useContext } from "react";
import styles from "./AppMainbar.module.css";

function AppMainbar() {
  const { selektovanPrijatelj } = useContext(SelektovanPrijateljContext);
  return (
    <div className={styles.main}>
      <div className={styles.impexp}>
        <ImportExport />
      </div>
      {selektovanPrijatelj ? <PrijateljiPodeliTrosak /> : <div></div>}
    </div>
  );
}

export default AppMainbar;
