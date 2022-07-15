import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import List from '../../components/lists'
import styles from '../../styles/categories.module.css'
import Sidebar from '../../components/sidebar'
import { useEffect, useState } from 'react'

const Categories: NextPage = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('savelink-categories') || '{}')
        setCategories(storedCategories);
    },[])
    return(
        <div className={styles.container}>
            <div className={styles.categories}>
                {categories?.map((data) => (
                    <div className={styles.category_cards} key={data}>
                        <h1>{data}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories;