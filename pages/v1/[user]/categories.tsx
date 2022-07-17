import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import List from '../../../components/lists'
import styles from '../../../styles/categories.module.css'
import { userLinks } from '../../../utils/lib/api'

const Categories = () => {
    const { data: session, status } = useSession()
    const name:string = session?.user?.email!
    const { isLoading, error, data } = useQuery(['bookmarks', name], () => userLinks(name))

    if(data) console.log("data", data)
    const categories:string[] = []
    if(!isLoading) {
        for( let i = 0 ; i < data.length ; ++i) { 
            console.log("catss", data[i].category)
            categories.push(data[i].category)
        }
        const allcategories = [... new Set(categories)];
        console.log("catts", allcategories)

        return(
            <div className={styles.container}>
                <div className={styles.categories}>
                    {allcategories?.map((data) => (
                        <Link key={data} href={
                            {pathname : `/v1/${name}/category/[data]`,
                            query : {data: data}
                            }
                            }>
                            <div className={styles.category_cards} >
                                <h1>{data}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

}

export default Categories;