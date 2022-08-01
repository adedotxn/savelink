import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateOnly } from "../utils/api/api";
import styles from '../styles/dashboard.module.css'

const ShareTarget = () => {
    const { data: session } = useSession()
    const name:string = session?.user?.email!
    const createMutation = useCreateOnly(toast)

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("")


    useEffect(() => {
        window.addEventListener('DOMContentLoaded', () => {
            const loc : Location = window.location
            const parsedUrl  = new URL(loc.href);
            // searchParams.get() will properly handle decoding the values.

            const returnedTitle = parsedUrl.searchParams.get('title')
            setTitle(returnedTitle || 'no title dommm')
            toast.success('Title shared: ' + parsedUrl.searchParams.get('title'));

            const returnedText = parsedUrl.searchParams.get('text')
            setText(returnedText || 'no text dommm')
            // console.log('Text shared: ' + parsedUrl.searchParams.get('text'));

            console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
            const returnedUrl = parsedUrl.searchParams.get('url')
            setUrl(returnedUrl || "no url boxx dommmm")
            // toast.success('URL shared: ' + parsedUrl.searchParams.get('url'));


            // createMutation.mutate({
            //     identifier: name, 
            //     title: parsedUrl.searchParams.get('title') || '', 
            //     url : parsedUrl.searchParams.get('url') || '',
            //     category : 'Shared',
            // })
        });
    })

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
                <h3>Title : {title}</h3>
                <h3>Text : {text}</h3>
                <h3>Url : {url}</h3>
            </div>

            <button onClick={saveLink}> Save </button>
        </>
    )
}

export default ShareTarget