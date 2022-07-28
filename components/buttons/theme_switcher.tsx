import { useTheme } from "../../utils/helpers/context"
import MoonSvg from "../svg/moon"
import styles from '../../styles/header.module.css'
import SunSvg from "../svg/sun"


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