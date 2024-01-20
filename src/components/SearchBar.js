import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <form className={styles.main} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Pretrazi prijatelje..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  );
}

export default SearchBar;
