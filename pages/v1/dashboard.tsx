import Image from 'next/image'
import List from '../../components/lists'
import styles from '../../styles/dashboard.module.css'
import links from '../../data/dummydata.json' 
// import Layout from '../components/layout'
import { NextPage } from 'next'
import React, { FormEvent, useRef, useState } from 'react'
import { Modal, Dialog } from 'react-dialog-polyfill'


const Dashboard:NextPage = () => {
    const link = links.data


    const [dialog, setDialog] = useState(false);

    function handleSubmit (e : React.SyntheticEvent) {
        e.preventDefault()

        setDialog(false)
    }

    return (
        <div className={styles.container}>
            <main className = {styles.main}>
                <section>
                    <List array = {link} />               
                </section>  
            </main>

            <div>
      <Dialog className={styles.dialog} open={dialog}>
        <form  onSubmit={handleSubmit} action="">
            <input  placeholder='Title'/>
            <input  placeholder='Link'/>

            <p>Select Category</p>
            <select>
                <option value="default">Choose...</option>
                <option>Brine shrimp</option>
                <option>Red panda</option>
                <option>Spider monkey</option>
            </select>

            <button type="submit">Add</button>
        </form>
      </Dialog>
    </div>

            <footer className={styles.footer}>
                <div  onClick={() => setDialog(!dialog)} className={styles.add} >
                    <div className={styles.cr8}>
                        <Image 
                            src='/add-circle.svg'
                            alt='add'
                            width={60}
                            height={60} 
                        />
                    </div>
                </div>
            </footer>
        </div>
  )
}


export default Dashboard;



