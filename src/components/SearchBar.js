import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ search, setSearch }) {
  return (
    <form className={styles.main} onSubmit={(e) => setSearch(e.target.value)}>
      <input
        type="text"
        placeholder="Pretrazi prijatelje..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;