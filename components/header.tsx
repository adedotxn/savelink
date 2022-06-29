import { FC, useEffect,useState } from 'react'
import styles from '../styles/header.module.css'
import HamburgerSvg from './svg/hamburger'
import MoonSvg from './svg/moon'
import SunSvg from './svg/sun'

interface IProps {
    side : boolean;
    setSide : React.Dispatch<React.SetStateAction<boolean>>
}

const Header:FC<IProps> = ({side, setSide}) => {
    const handleSidebar =() => {
        setSide(!side)
        // alert("open")
    }

    const [thm, setThm] = useState(false)


    function getCurrentTheme() {
     let theme:string = window.matchMedia('(prefers-color-scheme: dark)').matches
     ? 'dark' : 'light';
     localStorage.getItem('savelink-theme') 
     ? theme = `${localStorage.getItem('savelink-theme')}` : null;

     return theme;
    }

    function loadTheme(theme : string) {
        const root = document.querySelector(':root');
        root?.setAttribute('color-scheme', `${theme}`)
    }

    useEffect(() => {
        loadTheme(getCurrentTheme())
    })

    function switchTheme() {
        let theme = getCurrentTheme()
        theme === 'dark' ? theme = 'light' : theme = 'dark';
        localStorage.setItem('savelink-theme', `${theme}`)
        loadTheme(theme)  
        const root = document.querySelector(':root');

        root?.getAttribute('color-scheme') === 'dark' ? setThm(true) : setThm(false)
      
    }

  return (
    <header  className={styles.header}>
        <div className={styles.hamburger}
        onClick={handleSidebar}
        >
           <HamburgerSvg/>
        </div>

        <div className={[styles.searchbar, 'searchbar'].join(" ")}>
            <input type="text" placeholder='Search through links' />
        </div>


        <div>
            <button onClick={switchTheme} className={styles.switch}  aria-label="light/dark mode">
                {thm ? 
                    <SunSvg/>
                    :
                    <MoonSvg/>
                }
            </button>
        </div>
    </header>
  ) 
}

export default Header