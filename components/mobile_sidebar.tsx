import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react'
import styles from '../styles/dashboard.module.css'

interface IProps  {
    side : boolean; 
    setSide : React.Dispatch<React.SetStateAction<boolean>>
}

const MobileSidebar  = ({side, setSide}: IProps) => {
    const router = useRouter()

    return (
        <div className={side ? styles.open_sidebar : styles.close_sidebar}>
        <nav className={styles.mobile_sidebar} >
            <h1>Savelink</h1>
            <ul>
                <Link href='/v1//dashboard' >
                    <li  className={router.pathname === '/v1/dashboard' ? styles.mobile_active_route : ""} >
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

                <Link href='/v1//bookmarked' >
                    <li className={router.pathname === '/v1/bookmarked' ? styles.mobile_active_route : ""} >
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

                <Link href='/v1//categories'>
                    <li  className={router.pathname === '/v1/categories' ? styles.mobile_active_route : ""} >
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