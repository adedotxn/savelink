import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import List from '../../../components/lists'
import styles from '../../../styles/categories.module.css'
import { useDataGetter, userLinks } from '../../../utils/lib/api'

const Categories = () => {
    const { data: session, status } = useSession()
    const name:string = session?.user?.email!
    // const { isLoading, error, data } = useQuery(['bookmarks', name], () => userLinks(name))


    function useLinks() {
        const { isLoading, error, data } = useDataGetter(name)

        return {
            data, error, isLoading
        }
    }

    const storedData = useLinks()
    console.log("stored data", storedData?.data?.data)
    const data = storedData?.data?.data!;
    const isLoading = storedData.isLoading

    if(data) console.log("data", data)
    const categories:string[] = []

    if(isLoading) {
        return (
            <div className="loading_container">
                <div className="lds_ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

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
                        <Link key={data} href={ `/v1/${name}/category/${data}`}>
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