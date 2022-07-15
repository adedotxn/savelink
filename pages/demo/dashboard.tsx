import Image from 'next/image'
import styles from '../../styles/dashboard.module.css'
import { NextPage } from 'next'
import React, { FormEvent, useEffect, useState } from 'react'
import { Modal, Dialog } from 'react-dialog-polyfill'
import DemoList from '../../components/demo/lists'

type Data = {
    _id : number;
    title? : string;
    url : string;
    category? : string;
    starred? : boolean
}



const Dashboard:NextPage = () => {

    const data  =  [
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
    // const [modal, setModal] = useState(false)

   

    function handleSubmit (e : FormEvent<HTMLFormElement>) {
        e.preventDefault()

        
        const data = new FormData(e.target as HTMLFormElement);
        let inputedTitle :string = data.get("title")?.toString() || ''
        let inputedLink:string =  data.get("link")?.toString()!
        const form : HTMLFormElement = document.forms['input-form' as unknown as number].categories;
        let selectedCategory:string = form.value;


        const newDlinks = {
            _id : Math.random(),
            title : inputedTitle,
            url: inputedLink,
            category: selectedCategory,
            starred: false
        }

        DLinks.push(newDlinks)
        const stringifyData = JSON.stringify(DLinks)
        localStorage.setItem('savelink-data', stringifyData)

        setDialog(false)
    }


    // const [newCat, setNewCat] = useState<string | number>('')
    let [newCat, setNewCat] = useState<string | string[]>([])
    const [category, setCategory] = useState<string[] >([])
    const [word, setWord] = useState<string | string[]>([])

    const createCategory = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setWord(arr => [...arr, newCat])
        // console.log("category", word)
    }

    useEffect(() => {
        let categoriesArray = JSON.parse(localStorage.getItem('savelink-categories') || '{}')
        
        if(categoriesArray === null || !categoriesArray.length) {
            localStorage.setItem('savelink-categories', JSON.stringify(['default']) )
            categoriesArray = JSON.parse(localStorage.getItem('savelink-categories') || '{}')
        }

        if(!word.length) {  
            localStorage.setItem("savelink-categories", JSON.stringify(categoriesArray))
        }

        
        const previousWords = categoriesArray;
        let updated  = previousWords.concat(word)
        const stringifiedCategory = JSON.stringify(updated);
        localStorage.setItem("savelink-categories", stringifiedCategory)

        // console.log("gotten", JSON.parse(localStorage.getItem("savelink-categories") || '{}'))
        setCategory(JSON.parse(localStorage.getItem("savelink-categories") || '{}'))
    },[word])

    useEffect(() => {
        const retrievedData =  JSON.parse(localStorage.getItem('savelink-data') || '{}')
        if(retrievedData === null || !retrievedData.length ) {
            const stringifiedData = JSON.stringify(data)
            localStorage.setItem('savelink-data', stringifiedData)
            setDLinks(JSON.parse(localStorage.getItem('savelink-data') || '{}'));
            return
        } else {
            setDLinks( retrievedData)
        }

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
            <input name = "title"   placeholder='Title'/>
            <input name = "link"  placeholder='Link' required />

            <section>
                <div className={styles.create_category} >
                    <input onChange={e => setNewCat(e.target.value)}  type="text" placeholder='you can select from preexisting categories' />
                    <button onClick={createCategory}>
                        <span>+</span> Create category
                    </button>
                </div>

                <div>
                    <p>Select Category</p>
                    <select name = "categories">
                        <option value="">Choose...</option>
                        {category.map((e, index) => (
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



