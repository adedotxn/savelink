import Image from 'next/image'
import styles from '../styles/footer.module.css'
import HamburgerSvg from './svg/hamburger'
import MoreSvg from './svg/moresvg'
import { useDialog } from '../utils/helper/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ThemeSwitcher } from './buttons/theme_switcher'
import AddSvg from './svg/add'
import Logout from './buttons/Logout'
import PinSvg from './svg/pin'

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
                <Logout/>
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
            {router.pathname.includes("bookmarked")
            || router.pathname.includes("category")
            ||  router.pathname.includes("categories")?
            <div 
            onClick={() => router.push(`/v1/${name}`)} 
            className={styles.cr8p}>
                <PinSvg/>
            </div>
            :
            <div 
            onClick={() => setDialog(!dialog)} 
            className={styles.cr8m}>
                <AddSvg/>
            </div>
            }

            <div>
                <MoreSvg/>
            </div>
        </div>
    </div>
    )
}

export default Footer;