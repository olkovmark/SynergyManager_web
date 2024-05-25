import Link from "next/link";
import React, { HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props: any) => {
  return <input {...props} className={styles.input} />;
};

export default Input;
