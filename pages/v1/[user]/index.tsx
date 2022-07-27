import Image from 'next/image'
import List from '../../../components/lists'
import styles from '../../../styles/dashboard.module.css'
import { GetServerSidePropsContext, NextPage } from 'next'
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Dialog } from 'react-dialog-polyfill'
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from 'react-query'
import {userLinks,  useDataGetter, useCreate } from '../../../utils/lib/api'
import {unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { authOptions } from '../../api/auth/[...nextauth]'
import { useDialog } from '../../../utils/helper/context'
import {Toaster, toast} from 'react-hot-toast'
import AddSvg from '../../../components/svg/add'
import { Close } from '../../../components/buttons/close_dialog'

const Dashboard:NextPage = () => {
    const {dialog, setDialog, toggleDialog} = useDialog()
    const dref = useRef(null)
    const bref = useRef(null)


    const { data: session, status } = useSession()
    const name:string = session?.user?.email!

    function useData() {
        const { isLoading, error, data } = useDataGetter(name)
        return { data, error, isLoading }
    }
    const storedData = useData()
    
    // const { isLoading, error, data } = useQuery(['links', name], () => userLinks(name))
    let returnedCategories:string[] = []

    const data = storedData?.data?.data;
    const isLoading = storedData.isLoading
    const error = storedData.error
   
 
    if(error) {
        if(error instanceof Error) {
            console.log("creation error", error.message)
        } else {
            console.log(`Unexpected error in cr8 : ${error}`)
        }
    }

    if(!isLoading) {
        for(let i:number = 0 ; i < data.length ; ++i) { 
            // console.log(data[i].category)
            returnedCategories.push(data[i].category)
        }
    }
    const categories = [...new Set(returnedCategories)]
    // console.log("categories", categories)

    const [selected, setSelected] = useState("")
    const handleChange = useCallback((e: { target: { value: React.SetStateAction<string> } }) => {
        setSelected(e.target.value)
        console.log("selected handlechange", e.target.value)
    },[])



    // if(data) console.log("data", data)
    // console.log("isloading", isLoading)
    const createMutation = useCreate(setDialog)    

    // useEffect(() => {
    //     if(createMutation.isLoading) {
    //         toast("Saving link")
    //     }
    //     if(createMutation.isSuccess) {
    //         toast.success(`Saved ${createMutation.variables?.title}`)
    //     }
    //     if(createMutation.isError) {
    //         toast.error(`Error saving ${createMutation.variables?.title}. \n\n Try again`)
    //     }
    // }, [createMutation])

    const onSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user:string = name;
        const data = new FormData(event.target as HTMLFormElement);
        let inputedTitle :string = data.get("title")?.toString() || ''
        let inputedLink:string =  data.get("link")?.toString()!

        createMutation.mutate({
            identifier: name, 
            title:inputedTitle, 
            url : inputedLink,
            category : selected,
        })
        // console.log("selected", selected)
    }

    if(createMutation.error) {
        if(createMutation.error instanceof Error) {
            console.log("mutation error", createMutation.error)
        } else {
            console.log(`Unexpected error in mutation: ${createMutation.error}`)
        }
    }

    if(isLoading) 
        return (
        <div className="loading_container">
            <div className="lds_ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    );
    // const element = dref?.current;
    // const dialogClass = element?.getAttribute('class')
    // const btnRef = bref?.current;
    // const btnClass = btnRef?.getAttribute('class')

    // document.addEventListener('click',(e)=> {
    //     console.log("yay")
    //     console.log(dialogClass)
    //     console.log(e.target.classList.contains(dialogClass))
    //     console.log("cloosest",  !e.target.closest(dialogClass))

    //     if(dialog && !e.target.closest(dialogClass)) {
    //         setDialog(true)
    //     } else {

    //     }
    // }, false)



    return (
        <div className={styles.container}>
            <div>
                <Toaster 
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
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
                <Dialog ref = {dref} className={styles.dialog} open={dialog}>
                    <div className={styles.close_btn}>
                        <Close setDialog={setDialog}/>
                    </div>
                    <form id = "input-form" onSubmit={onSubmit} action="">
                        <input name="title"  placeholder='Title'/>
                        <input name="link" placeholder='Link'/>

                        <section className={styles.category}>
                            <p>Type in a new category to save to or select from pre-existing</p>

                            <div className={styles.add_category} >
                                <input onChange = {handleChange} type="text" placeholder='Example : "Software Eng. Links"' />
                        
                                <select value={selected} onChange = {handleChange} >
                                    {
                                        categories.map((data) => (
                                            <option key = {data} value={data}>{data}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </section>

                        <button type="submit">Save</button>
                    </form>
                </Dialog>
            </div>

            <footer className={styles.footer}>
                <div className={styles.desktop_footer}>
                    <div  onClick={toggleDialog} className={styles.add} >
                        <div className={styles.cr8}>
                            <AddSvg/>
                        </div>
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



