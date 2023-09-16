import React from "react";
import styles from "./spinner.module.css";

const Spinner = (props: { variant?: "dark" | "default"; size?: string }) => {
  return (
    <div style={{ width: props.size ?? "15px", height: props.size ?? "15px" }}>
      <span
        className={`${styles.loader} ${
          props.variant === "dark" ? styles.dark : styles.default
        } `}
      ></span>
    </div>
  );
};

export default Spinner;
