import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import styles from '../styles/dashboard.module.css'

const MobileSidebar = ({side, setSide}) => {
    const router = useRouter()

    return (
        <div className={side ? styles.open_sidebar : styles.close_sidebar}>
        <nav className={styles.mobile_sidebar} >
            <h1>Savelink</h1>
            <ul>
                <Link href='/dashboard' >
                    <li  className={router.pathname === '/dashboard' ? styles.mobile_active_route : ""} >
                        <div>
                            <Image 
                                src='/links.svg' 
                                alt='links'
                                width={25}
                                height={25}   
                            /> 
                        </div>
                        <span >All links </span>
                    </li>
                </Link>

                <Link href='/bookmarked' >
                    <li className={router.pathname === '/bookmarked' ? styles.mobile_active_route : ""} >
                        <div>
                            <Image 
                                src='/bookmark.svg' 
                                alt='links'
                                width={25}
                                height={25}
                            />
                        </div> 
                        <span>Starred</span>
                    </li>
                </Link>

                <Link href='/categories'>
                    <li  className={router.pathname === '/categories' ? styles.mobile_active_route : ""} >
                        <div>
                            <Image 
                                src='/lightbulb.svg' 
                                alt='links'
                                width={25}
                                height={25}
                            /> 
                        </div> 
                        <span >Categories</span>
                    </li>
                </Link>
            </ul>
        </nav>
        <div className={styles.empty} onClick={() =>  setSide(false)} >

        </div>
        </div>
    )
}
export default MobileSidebar;