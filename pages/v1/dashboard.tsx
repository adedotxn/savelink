import Image from 'next/image'
import List from '../../components/lists'
import styles from '../../styles/dashboard.module.css'
import { GetServerSidePropsContext, NextPage } from 'next'
import React, { FormEvent, useRef, useState } from 'react'
import { Modal, Dialog } from 'react-dialog-polyfill'
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from 'react-query'
import {userLinks, addLink } from '../../utils/lib/api'
import {unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'

const Dashboard:NextPage = () => {

    
    const queryClient = useQueryClient()
    const [dialog, setDialog] = useState(false);

    const { data: session, status } = useSession()
    const name:string = session?.user?.email!

    const { isLoading, error, data } = useQuery(['links', name], () => userLinks(name))
    
    const mutation = useMutation(addLink, {
        onSuccess : () => {
            queryClient.invalidateQueries(['links'])
        },
        onSettled :() => {
            setDialog(false)
        }
    })

    if(error) {
        if(error instanceof Error) {
            console.log("creation error", error.message)
        } else {
            console.log(`Unexpected error in cr8 : ${error}`)
        }
    }

    if(data) console.log("data", data)
    console.log("isloading", isLoading)

    const onSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user:string = name;
        const data = new FormData(event.target as HTMLFormElement);
        let inputedTitle :string = data.get("title")?.toString() || ''
        let inputedLink:string =  data.get("link")?.toString()!
        const form : HTMLFormElement = document.forms['input-form' as unknown as number].categories;
        // let selectedCategory:string = form.value;

        mutation.mutate({
            identifier: name, 
            title:inputedTitle, 
            url : inputedLink,
            category : "test",
        })
    }

    if(mutation.error) {
        if(mutation.error instanceof Error) {
            console.log("mutation error", mutation.error)
        } else {
            console.log(`Unexpected error in mutation: ${mutation.error}`)
        }
    }

    if(isLoading) return (
        <div>
            <h1>Loadinggggg</h1>
        </div>
    )

    return (
        <div className={styles.container}>
            {data.length === 0 ? 
            <div className={styles.such_nothing}>
                <h2>Such nothing 👀 </h2>
                <p>Click the button to start saving </p>
            </div> 
            :
            <main className = {styles.main}>
                <section>
                    <List array = {data} />               
                </section>  
            </main>}

            <div>
      <Dialog className={styles.dialog} open={dialog}>
        <form id = "input-form" onSubmit={onSubmit} action="">
            <input name="title"  placeholder='Title'/>
            <input name="link" placeholder='Link'/>

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



export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    )

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('links', () => userLinks(session?.user?.email!))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
  }



