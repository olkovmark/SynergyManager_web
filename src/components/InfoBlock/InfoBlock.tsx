import React from "react";
import styles from "./styles.module.css";

const InfoBlock: React.FC<any> = ({ children, title }: any) => {
  return (
    <div className={styles.infoBlock}>
      <h4 className={styles.title}>{title}</h4>
      {children}
    </div>
  );
};

export default InfoBlock;
