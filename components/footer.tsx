import Image from 'next/image'
import { FC, useCallback, useEffect,useState } from 'react'
import styles from '../styles/footer.module.css'
import HamburgerSvg from './svg/hamburger'
import MoonSvg from './svg/moon'
import MoreSvg from './svg/moresvg'
import SunSvg from './svg/sun'
import { useDialog } from '../utils/helper/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ThemeSwitcher } from './theme_switcher'

interface IProps {
    side : boolean;
    setSide : React.Dispatch<React.SetStateAction<boolean>>,
    name: string
}

const Footer = ({side, setSide, name}:IProps) => {
    const handleSidebar = () => {
        setSide(!side)
        // alert("open")
    }

    const router = useRouter()

    const {dialog, setDialog} = useDialog()

    return (
    <div className={styles.footer}>
        {side && <div className={styles.footer_nav}>
            <div>
                <ThemeSwitcher/>
            </div>
            <ul>
                <Link href={`/v1/${name}`} >
                    <li>
                        All Links
                    </li>
                </Link>

                <Link href={`/v1/${name}/bookmarked`} >
                    <li className={router.pathname.includes(`/bookmarked`)? styles.active : ""}> 
                        Starred 
                    </li>
                </Link>

                <Link href={`/v1/${name}/categories`}>
                    <li className={router.pathname.includes(`/categories`) ? styles.active : ""}>
                        Categories
                    </li>
                </Link>
            </ul>
        </div>}
        <div className={styles.mobile_footer}>
            <div onClick={handleSidebar}>
                <HamburgerSvg/>
            </div>
            
            <div 
            onClick={() => setDialog(!dialog)} 
            className={styles.cr8m}>
                <Image 
                    src='/add-circle-fill.svg'
                    alt='add'
                    width={60}
                    height={60} 
                />
            </div>

            <div>
                <MoreSvg/>
            </div>
        </div>
    </div>
    )
}

export default Footer;