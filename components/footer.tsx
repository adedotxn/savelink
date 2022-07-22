import Image from 'next/image'
import { FC, useCallback, useEffect,useState } from 'react'
import styles from '../styles/footer.module.css'
import HamburgerSvg from './svg/hamburger'
import MoonSvg from './svg/moon'
import MoreSvg from './svg/moresvg'
import SunSvg from './svg/sun'
import { useDialog } from '../utils/helper/context'

interface IProps {
    side : boolean;
    setSide : React.Dispatch<React.SetStateAction<boolean>>
}

const Footer = ({side, setSide}:IProps) => {
    const handleSidebar = () => {
        setSide(!side)
        // alert("open")
    }

    const {dialog, setDialog} = useDialog()

    return (
    <div className={styles.footer}>
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