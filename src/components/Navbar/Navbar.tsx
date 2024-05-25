import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Link href={"/service"}>Сервіси</Link>
      {/* <Link href={"/user"}>Користувачи</Link> */}
    </nav>
  );
};

export default Navbar;
