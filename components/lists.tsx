import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/dashboard.module.css'

const List = () => {
  return (
    <div className={[styles.link_list, styles.dark_scheme, styles.light_scheme].join(" ")}>
        <div className={styles.links}>
            <h3>a  tweet explaining the useeffect hook in-depth ny dan-abhrov</h3>
            <p> 
                <Link href='https://twitter.com/adedotxn'>
                    https://twitter.com/adedotxn
                </Link>
            </p>
        </div>
        <div className={styles.link__footer} >
            <div className={styles.link__category}>
                <h3>socials</h3>
            </div>

            <div  className={styles.link__images}>
                <div className={styles.link__image}>
                    <Image 
                        src='/star.svg'
                        alt='share button'
                        width={20}
                        height={20}
                    />
                </div>

                <div className={styles.link__image}>
                    <Image 
                        src='/share.svg'
                        alt='share button'
                        width={20}
                        height={20}
                    />
                </div>
            </div>    
        </div>
    </div>
  )
}

export default List