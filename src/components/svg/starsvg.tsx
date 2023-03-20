import { useEffect, useState } from "react";
import styles from "@components/header.module.css";

const SvgComponent = ({ starred }: { starred: boolean }) => {
  return (
    <>
      {starred ? (
        <svg
          className={styles.svg_fill}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1.5em"
          height="1.5em"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z" />
        </svg>
      ) : (
        <svg
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            className={styles.svg_fill}
            d="m12 18.26-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928L12 18.26zm0-2.292 4.247 2.377-.949-4.773 3.573-3.305-4.833-.573L12 5.275l-2.038 4.42-4.833.572 3.573 3.305-.949 4.773L12 15.968z"
            fill="currentColor"
          />
        </svg>
      )}
    </>
  );
};

export default SvgComponent;
