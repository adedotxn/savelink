import { signOut } from "next-auth/react"
import LogOut from "./svg/power"
import styles from '../styles/logout.module.css'
import { useRouter } from "next/router"

const Logout = () => {
    const router = useRouter()
    const handleSignOut = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        signOut()
        router.push('/')
    }
    return (
        <div className={styles.box}>
            <a onClick={handleSignOut}>
                <LogOut/>
            </a>
        </div>
    )
}

export default Logout