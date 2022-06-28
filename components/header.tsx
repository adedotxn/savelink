import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/header.module.css'

const Header = ({side, setSide}) => {
    const handleSidebar =() => {
        setSide(!side)
        // alert("open")
    }

  return (
    <header  className={styles.header}>
        <div className={styles.hamburger}
        onClick={handleSidebar}
        >
            <Image
                src='/menu-fill.svg'
                alt='menu'
                width={30}
                height={30}
            />
        </div>

        <div className={styles.searchbar}>
            <input type="text" placeholder='Search through links' />
        </div>
    </header>
  ) 
}

export default Header