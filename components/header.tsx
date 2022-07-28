import styles from '../styles/header.module.css'
import { useSearch } from '../utils/helpers/context';
import Logout from './buttons/Logout'
import { ThemeSwitcher } from './buttons/theme_switcher'


interface IProps {
    side : boolean;
    setSide : React.Dispatch<React.SetStateAction<boolean>>
    name : string
}

const Header = ({side, setSide, name}:IProps) => {

    const {search, setSearch} = useSearch()
    
    return (
        <header  className={styles.header}>
            <div className={styles.hamburger}
                >
                📌
            </div>

            <div className={[styles.searchbar, 'searchbar'].join(" ")}>
                <input 
                    type="text" 
                    placeholder='Search through links with Title/Urls' 
                    value={search}
                    onChange = {(e) => setSearch(e.target.value)}
                />
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