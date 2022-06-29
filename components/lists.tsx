import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/list.module.css'
import { useEffect, useState } from 'react'
import SvgComponent from './svg/starsvg'

const List = ({array}) => {
    const [bkmrkd, setBkmrkd] = useState(false)

    function star() {
        setBkmrkd(!bkmrkd)
    }

    
  return (
    <>
    {array.map(data => (
    <div key={data._id} className={styles.link_wrapper}>
        <div className={[styles.link_list, styles.dark_scheme, styles.light_scheme].join(" ")}>
            <div className={styles.links}>
                <h3>{data.title}</h3>
                <p> 
                    <Link href={data.url}>
                        {data.url}
                    </Link>
                </p>
            </div>
            <div className={styles.link__footer} >
                <div className={styles.link__category}>
                    <h3>{data.category}</h3>
                </div>

                <div  className={styles.link__images}>
                    <div className={styles.link__image}
                    onClick = {star} >
                        <SvgComponent starred = {bkmrkd} />
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
    </div>
     ))}
     </>
  )
}

export default List