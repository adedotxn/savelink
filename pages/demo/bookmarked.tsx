import type { NextPage } from 'next'
import List from '../../components/lists'
import styles from '../../styles/dashboard.module.css'
import links from '../../data/dummydata.json'
import { useEffect, useState } from 'react'
import DemoList from '../../components/demo/lists'



const Bookmark: NextPage = () => {
    const link = links.data
    let starred = link.filter(e => e?.starred === true);
    const mock = [
        {
            _id : 1,
            title : "Title from the shared link will go here",
            url : "https://link_you_want_to_save",
            category : "category_set",
            starred : true
        }
    ]
    const [data, setData] = useState([])

    // useEffect(() => {
    //     const arr:[] = []
    //     const storedData = JSON.parse(localStorage.getItem('savelink-data') || '{}')
    //     storedData.forEach((e) => {
    //         if(e.starred) {
    //             arr.push(e)
    //         }
    //         console.log("nu data", storedData)
    //     })
    //     setData(arr)
    //     console.log("data", data)

    // },[])

    return(
    <div className={styles.container}>
        <main className = {styles.main}>
            <section>
                {data.length === 0 ? <h2>Nothing to see here</h2> : 
                <DemoList array = {data} />}
            </section>  
        </main>
            
    </div>
    )
}

export default Bookmark;
