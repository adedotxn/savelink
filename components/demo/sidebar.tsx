import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import styles from '../../styles/dashboard.module.css'

const Sidebar = () => {
    const navRef = useRef<HTMLElement>(null)
    const router = useRouter()

    const [hovering, setHovering] = useState(false)

    function mouseOver() {
        setHovering(true)
        navRef?.current?.classList.add('hoverOn')
    }

    function mouseLeave() {
        setHovering(false)
        navRef?.current?.classList.remove('hoverOn')
    }

    return (
        <nav ref = {navRef} className={[styles.sidebar, 'hide'].join(' ')} >
            <ul onMouseOver={mouseOver}
                onMouseLeave={mouseLeave }>

                <Link href='/demo/dashboard' >
                    <li className={hovering ? styles.sidebar__li : ''}>
                        <div className={router.pathname === '/demo/dashboard' ? styles.active_route : ""} >
                                <Image 
                                    src='/links.svg' 
                                    alt='links'
                                    width={25}
                                    height={25}   
                                /> 
                        </div>
                        <span className={hovering ? 'show' : 'hide'} >All links </span>
                    </li>
                </Link>

                <Link href='/demo/bookmarked' >
                    <li className={hovering ? styles.sidebar__li : ''}>
                        <div className={router.pathname === '/demo/bookmarked' ? styles.active_route : ""} >
                            <Image 
                                src='/bookmark.svg' 
                                alt='links'
                                width={25}
                                height={25}
                            />
                        </div> 
                        <span className={hovering ? 'show' : 'hide'}>Starred</span>
                    </li>
                </Link>

                <Link href='/demo/categories'>
                    <li className={hovering ? styles.sidebar__li : ''}>
                        <div className={router.pathname === '/demo/categories' ? styles.active_route : ""} >
                            <Image 
                                src='/lightbulb.svg' 
                                alt='links'
                                width={25}
                                height={25}
                            /> 
                        </div> 
                        <span className={hovering ? 'show' : 'hide'} >Categories</span>
                    </li>
                </Link>
            </ul>
        </nav>
    )
}
export default Sidebar;