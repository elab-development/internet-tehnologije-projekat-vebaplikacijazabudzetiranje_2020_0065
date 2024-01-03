import styles from "./AppSidebar.module.css";
import React from "react";
import Logo from "../components/Logo";
import AppSidebarNav from "../components/AppSidebarNav";
import FriendsList from "../components/FriendsList";
import Footer from "../components/Footer";

function AppSidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <FriendsList />
      <Footer />
    </div>
  );
}

export default AppSidebar;
