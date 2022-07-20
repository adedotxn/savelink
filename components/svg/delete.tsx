import styles  from '../../styles/header.module.css'


import * as React from "react"

const DeleteSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em">
    <path fill="none" d="M0 0h24v24H0z" />
    <path className={styles.svg_fill}
      d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"
      fill="currentColor"
    />
  </svg>
)

export default DeleteSvg