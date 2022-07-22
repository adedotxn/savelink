import { useTheme } from 'next-themes'
import { FC, useEffect,useState } from 'react'
import styles from '../styles/header.module.css'
import HamburgerSvg from './svg/hamburger'
import { ThemeSwitcher } from './theme_switcher'

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
                <HamburgerSvg/>
            </div>

            <div className={[styles.searchbar, 'searchbar'].join(" ")}>
                <input type="text" placeholder='Search through links' />
            </div>


            <div>
                <h2>{name}</h2>
                <ThemeSwitcher/>
            </div>
        </header>
    ) 
}

export default Header