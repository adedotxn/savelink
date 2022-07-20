import Image from 'next/image'
import { FC, useEffect,useState } from 'react'
import styles from '../styles/header.module.css'
import HamburgerSvg from './svg/hamburger'
import MoonSvg from './svg/moon'
import SunSvg from './svg/sun'

interface IProps {
    side : boolean;
    setSide : React.Dispatch<React.SetStateAction<boolean>>
    name : string
}

const Footer = ({side, setSide, name}:IProps) => {
    // <footer className={styles.footer}>
    //         <div className={styles.mobile_footer}>
    //             <div>
    //                 <HamburgerSvg/>
    //             </div>

    //             <div className={styles.cr8m}>
    //                 <Image
    //                     src='/add-circle.svg'
    //                     alt='add'
    //                     width={60}
    //                     height={60} 
    //                 />
    //             </div>

    //             <div>
    //                 <MoreSvg/>
    //             </div>
    //         </div>
    //         <div  onClick={() => setDialog(!dialog)} className={styles.add} >
    //             <div className={styles.cr8}>
    //                 <Image 
    //                     src='/add-circle.svg'
    //                     alt='add'
    //                     width={60}
    //                     height={60} 
    //                 />
    //             </div>
    //         </div>
        // </footer>
}

export default Footer;