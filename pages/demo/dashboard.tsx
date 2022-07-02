import Image from 'next/image'
import List from '../../components/lists'
import styles from '../../styles/dashboard.module.css'
import links from '../../data/dummydata.json' 
// import Layout from '../components/layout'
import { NextPage } from 'next'
import React, { FormEvent, useEffect, useState } from 'react'
import { Modal, Dialog } from 'react-dialog-polyfill'
import DemoList from '../../components/demo/lists'
import MoreSvg from '../../components/svg/moresvg'

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
    const [modal, setModal] = useState(false)

   

    function handleSubmit (e : FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement);
        let nutitle :string = data.get("title")?.toString() || ''
        let nulink:string =  data.get("link")?.toString()!
        const form : HTMLFormElement = document.forms['input-form'].categories;
        console.log(form)
        let latestID = DLinks[DLinks.length - 1]._id++
        let nucategory :string = data.get("category")?.toString() || ''

        let category = form.value === "Choose..." ? nucategory : form.value;

        
        const newDlinks :IData = {
            _id : Math.random(),
            title : nutitle,
            url: nulink,
            category: category,
            starred: false
        }
        DLinks.push(newDlinks)
        console.log("nuu linkaa", DLinks)
        const stringifyData = JSON.stringify(DLinks)
        
        localStorage.setItem('savelink-data', stringifyData)
        setDialog(false)

    }


    useEffect(() => {
        const retrievedData : IData =  JSON.parse(localStorage.getItem('savelink-data'))

        if(retrievedData === null) {
            const stringifyData = JSON.stringify(DLinks)
            localStorage.setItem('savelink-data', stringifyData)
        }
        setDLinks(retrievedData)
        console.log(retrievedData)
    },[])

    
    const [newCategory, setNewCategory] = useState('');
    const handleNewCategory = (e) => {
        e.preventDefault()
        setNewCategory(e.target.value)
    }


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
            <input name = "title"   placeholder='Title'/>
            <input name = "link"  placeholder='Link' required />

            <section>
                <div className={styles.create_category} >
                    <input type="text" placeholder='you can select from preexisting categories' />
                    <button onClick={handleNewCategory}>
                        <span>+</span> Create category
                    </button>
                </div>

                <div>
                    <p>Select Category</p>
                    <select name = "categories">
                        <option value="">Choose...</option>
                        {categories.map((e, index) => (
                            <>
                                <option key={index} value={e}> {e} </option>
                            </>
                        ))}
                    </select>
                </div>

               
            </section>

            <button type="submit">Save Link</button>
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



