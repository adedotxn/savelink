import React from "react";
import styles from "./spinner.module.css";

const Spinner = (props: { variant?: "dark" | "default" }) => {
  return (
    <span
      className={`${styles.loader} ${
        props.variant === "dark" ? styles.dark : styles.default
      } `}
    ></span>
  );
};

export default Spinner;
