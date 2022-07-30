import styles from '../styles/footer.module.css'
import HamburgerSvg from './svg/hamburger'
import MoreSvg from './svg/moresvg'
import { useDialog } from '../utils/helpers/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ThemeSwitcher } from './buttons/theme_switcher'
import AddSvg from './svg/add'
import Logout from './buttons/Logout'
import PinSvg from './svg/pin'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import { useDataGetter } from '../utils/api/api'
import { generateCSV, header } from '../utils/helpers/downloadCsv'
import { useSession } from 'next-auth/react'

interface IProps {
    side : boolean;
    setSide : React.Dispatch<React.SetStateAction<boolean>>,
    name: string
}
let deferredPrompt: Event;  

const Footer = ({side, setSide, name}:IProps) => {

    const btnRef = useRef<HTMLButtonElement>(null)

    function useData() {
        const { isLoading, error, data } = useDataGetter(name)
        return { data, error, isLoading }
    }
    const storedData = useData()
    const data = storedData?.data?.data;
    const {data : session} = useSession()

    const download = () => {
        generateCSV(header, data, `${session?.user?.name?.toLowerCase()}_savelink_data`)
    }
    
    const handleSidebar = () => {
        setSide(!side)
    }
    const router = useRouter()

    const {dialog, setDialog} = useDialog()
    const [options, setOptions] = useState(false)


    // useEffect(() => {
    //     let downloadBtn = btnRef.current;
    //     let deferredPrompt: Event | null;

    //     window.addEventListener('beforeinstallprompt', (e) => {
    //         deferredPrompt = e;
    //     })

    //     const downloadFn = async () => {
    //         if (deferredPrompt !== null) {
    //             deferredPrompt.prompt();
    //             const { outcome } = await deferredPrompt.userChoice;
    //             if (outcome === 'accepted') {
    //                 deferredPrompt = null;
    //             }
    //         }
    //     }

    //     if(downloadBtn) {
    //         downloadBtn.addEventListener('click', downloadFn)
    //     }
    // }, [options])


    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (!promptInstall && !supportsPWA) {
      return;
    }
    promptInstall.prompt();
  };


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

        {options && 
            <div className={styles.options}>
                <ul>
                    <li  onClick={download} > Export my savelink data</li>
                    <li onClick = {onClick}>Install web app</li>
                </ul>
            </div>
        }
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

            <div  onClick={() => setOptions(!options)}>
                <MoreSvg/>
            </div>
        </div>
    </div>
    )
}

export default Footer;