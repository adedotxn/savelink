import { useTheme } from "../utils/helper/context"
import MoonSvg from "./svg/moon"
import SunSvg from "./svg/sun"
import styles from '../styles/header.module.css'


export const ThemeSwitcher = () => {
    const {theme, switchTheme} = useTheme()

    return (
        <button onClick={switchTheme} className={styles.switch}  aria-label="light/dark mode">
                {theme ? 
                    <SunSvg/>
                    :
                    <MoonSvg/>
                }
            </button>
    )
}