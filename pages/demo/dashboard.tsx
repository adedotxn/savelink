import Image from 'next/image'
import List from '../../components/lists'
import styles from '../../styles/dashboard.module.css'
import links from '../../data/dummydata.json' 
// import Layout from '../components/layout'
import { NextPage } from 'next'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Modal, Dialog } from 'react-dialog-polyfill'
import DemoList from '../../components/demo/lists'

interface IData {
    _id : number;
    title : string;
    url : string;
    category : string;
    starred : boolean
}

const Dashboard:NextPage = () => {

    const data : IData[] =  [
        {
            _id : 1,
            title : "Title from the shared link will go here",
            url : "https://link_you_want_to_save",
            category : "category_set",
            starred : true
        }
    ]

    const [DLinks, setDLinks] = useState(data);
    let categories = []
    for (let i = 0 ; i < DLinks.length ; ++i) {
        categories.push(DLinks[i].category)
    }

    const [dialog, setDialog] = useState(false);

    function handleSubmit (e : FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.target);
        let nutitle :string = data.get("title")?.toString() || ''
        let nulink:string =  data.get("link")?.toString()!
        const form = document.forms['input-form'].categories;
        console.log(form)
        let latestID = DLinks[DLinks.length - 1]._id++
        
        const newDlinks :IData = {
            _id : Math.random(),
            title : nutitle,
            url: nulink,
            category: form.value,
            starred: false
        }
        DLinks.push(newDlinks)
        console.log("nuu linkaa", DLinks)
        const stringifyData = JSON.stringify(DLinks)
        
        localStorage.setItem('savelink-data', stringifyData)
        setDialog(false)

    }


    useEffect(() => {


        const retrievedData =  JSON.parse(localStorage.getItem('savelink-data'))

        if(retrievedData === null) {
            const stringifyData = JSON.stringify(DLinks)
            localStorage.setItem('savelink-data', stringifyData)
        }
        setDLinks(retrievedData)
        console.log(retrievedData)

    },[])

    


    return (
        <div className={styles.container}>
            <main className = {styles.main}>
                <section>
                    <DemoList array = {DLinks}/>               
                </section>  
            </main>

            <div>
      <Dialog className={styles.dialog} open={dialog}>
        <form id = "input-form" onSubmit={handleSubmit} action="">
            <input name = "title"  placeholder='Title'/>
            <input name = "link" placeholder='Link' required />

            <p>Select Category</p>
            <select name = "categories">
                <option value="">Choose...</option>
                {categories.map((e, index) => (
                    <>
                        <option key={index} value={e}> {e} </option>
                    </>
                ))}
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



