import type { NextPage } from 'next'
import List from '../../components/lists'
import styles from '../../styles/dashboard.module.css'
import links from '../../data/dummydata.json'

const Bookmark: NextPage = () => {
    const link = links.data
    let starred = link.filter(e => e?.starred === true);

    return(
    <div className={styles.container}>
        <main className = {styles.main}>
            <section>
                <List array = {starred} />               
            </section>  
        </main>
            
    </div>
    )
}

export default Bookmark;
