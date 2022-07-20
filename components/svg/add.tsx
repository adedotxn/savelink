import styles  from '../../styles/header.module.css'

const AddSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em">
    <path fill="none" d="M0 0h24v24H0z" />
    <path className={styles.svg_fill} d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" fill="currentColor" />
  </svg>
)

export default AddSvg
