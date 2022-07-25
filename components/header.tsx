import styles from '../styles/header.module.css'
import Logout from './buttons/Logout'
import { ThemeSwitcher } from './buttons/theme_switcher'

interface IProps {
    side : boolean;
    setSide : React.Dispatch<React.SetStateAction<boolean>>
    name : string
}

const Header = ({side, setSide, name}:IProps) => {
    const handleSidebar =() => {
        setSide(!side)
        // alert("open")
    }
    
    return (
        <header  className={styles.header}>
            <div className={styles.hamburger}
                onClick={handleSidebar}>
                📌
            </div>

            <div className={[styles.searchbar, 'searchbar'].join(" ")}>
                <input type="text" placeholder='Search through links' />
            </div>


            <div>
                <h2>{name}</h2>
                <ThemeSwitcher/>
                <Logout/>
            </div>
        </header>
    ) 
}

export default Header