import * as React from "react"
import { SVGProps } from "react"
import styles  from '../../styles/header.module.css'


const HamburgerSvg = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
    <path fill="none" d="M0 0h24v24H0z" />
    <path
    className={styles.svg_fill}
      d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z"
      fill="currentColor"
    />
  </svg>
)

export default HamburgerSvg
