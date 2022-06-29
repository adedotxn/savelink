import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react'
import styles from '../../styles/dashboard.module.css'
import BookmarkSvg from '../svg/bookmarksvg'
import CategoriesSvg from '../svg/categoriesvg'
import LinkSvg from '../svg/linksvg'

const Sidebar:FC = () => {
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
                            <LinkSvg/>
                        </div>
                        <span className={hovering ? 'show' : 'hide'} >All links </span>
                    </li>
                </Link>

                <Link href='/demo/bookmarked' >
                    <li className={hovering ? styles.sidebar__li : ''}>
                        <div className={router.pathname === '/demo/bookmarked' ? styles.active_route : ""} >
                            <BookmarkSvg/>
                        </div> 
                        <span className={hovering ? 'show' : 'hide'}>Starred</span>
                    </li>
                </Link>

                <Link href='/demo/categories'>
                    <li className={hovering ? styles.sidebar__li : ''}>
                        <div className={router.pathname === '/demo/categories' ? styles.active_route : ""} >
                            <CategoriesSvg/>
                        </div> 
                        <span className={hovering ? 'show' : 'hide'} >Categories</span>
                    </li>
                </Link>
            </ul>
        </nav>
    )
}
export default Sidebar;