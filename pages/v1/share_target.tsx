import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateOnly } from "../../utils/api/api";
import styles from '../../styles/dashboard.module.css'


const ShareTarget = () => {
    const { data: session } = useSession()
    const name:string = session?.user?.email!
    const createMutation = useCreateOnly(toast)

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("")


    useEffect(() => {
        self.addEventListener('fetch', (event : any) => {
            const url = new URL(event.request.url);
            // If this is an incoming POST request for the
            // registered "action" URL, respond to it.
            if (event.request.method === 'POST' &&
                url.pathname === '/v1/share_target') {
            event.respondWith((async () => {
                const formData = await event.request.formData();
                const retTitle = formData.get('title') || '';
                setTitle(retTitle || "no title boxx")

                const retText = formData.get('text') || '';
                setText(retText || "no text boxx")

                const retUrl = formData.get('url') || '';
                setUrl(retUrl || "no url boxx")

                createMutation.mutate({
                    identifier: name, 
                    title: retTitle, 
                    url : retUrl,
                    category : 'Shared',
                })
                return Response.redirect(`/v1/${name}/`);
            })());
            }
        });
    }, [])

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