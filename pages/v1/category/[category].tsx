import styles from '../../../styles/dashboard.module.css'
import { GetServerSidePropsContext, NextPage } from 'next'
import { Modal, Dialog } from 'react-dialog-polyfill'
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from 'react-query'
import {getCategories} from '../../../utils/lib/api'
import {unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { authOptions } from '../../api/auth/[...nextauth]'
import { useRouter } from 'next/router'
import List from '../../../components/lists'

const Category = () => {
    const router = useRouter()
    const {category} = router.query;
    console.log('catashj', category)
    const { isLoading, error, data } = useQuery(['perCategory', category], () => getCategories(category));

    if(data) console.log("dataa",data.data)
    

    if(!isLoading) {
        const array = data?.data
        return (
            <div className={styles.container}>
                <main className = {styles.main}>
                    <section>
                        <List array = {array}/>               
                    </section>  
                </main>
            </div>
        )
    }
    }
   


export default Category;



// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const session = await unstable_getServerSession(
//         context.req,
//         context.res,
//         authOptions
//     )


//     const queryClient = new QueryClient()

//     await queryClient.prefetchQuery('perCategory', () => (session?.user?.email!))

//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient),
//         },
//     }
//   }



