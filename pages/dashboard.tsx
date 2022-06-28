import Image from 'next/image'
import List from '../components/lists'
import styles from '../styles/dashboard.module.css'

import Layout from '../components/layout'
import { NextPage } from 'next'

const Dashboard:NextPage = () => {

    return (
        <div className={styles.container}>
            <main className = {styles.main}>
                <section>
                    <List/>               
                </section>  
            </main>

            <footer className={styles.footer}>
                <div className={styles.add} >
                    <button>
                        <Image 
                            src='/add-circle.svg'
                            alt='add'
                            width={60}
                            height={60}
                        />
                    </button>
                </div>
            </footer>
        </div>
  )
}


export default Dashboard;



