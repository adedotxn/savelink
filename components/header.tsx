import { useState } from 'react';
import styles from '../styles/header.module.css'
import { useSearch } from '../utils/helpers/context';
import { SidePropsInterface } from '../utils/interface';
import Logout from './buttons/Logout'
import { ThemeSwitcher } from './buttons/theme_switcher'
import Options from './options';
import MoreSvg from './svg/moresvg';


const Header = ({name} : {name : string}) => {

    const {search, setSearch} = useSearch()
    const [options, setOptions] = useState(false)

    
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
                <div 
                    onClick={() => setOptions(!options)} 
                    className={options ? [styles.active, styles.more].join(' ') : styles.more}
                >
                    <MoreSvg/>
                </div>
            </div>
            <Options options = {options} name={name}/>
        </header>
    ) 
}

export default Header