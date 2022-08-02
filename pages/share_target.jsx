import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateOnly } from "../utils/api/api";
import styles from '../styles/target.module.css'

const ShareTarget = () => {
    const { data: session } = useSession()
    const name= session?.user?.email
    const createMutation = useCreateOnly(toast)

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("")

    useEffect(() => {
        self.addEventListener('fetch', event => {
            const url = new URL(event.request.url);
            // If this is an incoming POST request for the
            // registered "action" URL, respond to it.
            console.log("path", url.pathname)
            if (event.request.method === 'POST' &&
                url.pathname === '/share_target/') {
              event.respondWith((async () => {
                const formData = await event.request.formData();
                const returnedTitle = formData.get('title') || 'nuhinn';
                const returnedText = formData.get('text') | "no text big g"
                const returnedURL = formData.get('url') || 'nourlbrev'

                setText(returnedText)
                setUrl(returnedURL)
                setTitle(returnedTitle)
                // await createMutation({
                //     identifier: name, 
                //     title: returnedTitle,
                //     url : returnedUrl === ''.trim() ? returnedText : returnedURL,
                //     category : 'Shared',
                // });
                return alert("Found!")
              })());
            }
          });
    },[])


    // useEffect(() => {
    //     window.addEventListener('DOMContentLoaded', () => {
    //         const loc = window.location
    //         const parsedUrl  = new URL(loc.href);
    //         // searchParams.get() will properly handle decoding the values.

    //         const returnedTitle = parsedUrl.searchParams.get('title')
    //         setTitle(returnedTitle || 'no title dommm')
    //         toast.success('Title shared: ' + parsedUrl.searchParams.get('title'));

    //         const returnedText = parsedUrl.searchParams.get('text')
    //         setText(returnedText || 'no text dommm')
    //         // console.log('Text shared: ' + parsedUrl.searchParams.get('text'));

    //         console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
    //         const returnedUrl = parsedUrl.searchParams.get('url')
    //         setUrl(returnedUrl || "no url boxx dommmm")
    //         // toast.success('URL shared: ' + parsedUrl.searchParams.get('url'));


    //         // createMutation.mutate({
    //         //     identifier: name, 
    //         //     title: parsedUrl.searchParams.get('title') || '', 
    //         //     url : parsedUrl.searchParams.get('url') || '',
    //         //     category : 'Shared',
    //         // })
    //     });
    // }, [])

    const saveLink = () => {
        createMutation.mutate({
            identifier: name, 
            title: title, 
            url : text,
            category : 'Shared',
        })
    }

    return (
        <>
            <div className={styles.container}>
                <h3>Titlee : {title}</h3>
                <h3>Text : {text}</h3>
                <h3>Url : {url}</h3>
                <button onClick={saveLink}> Save </button>

            </div>

        </>
    )
}

export default ShareTarget