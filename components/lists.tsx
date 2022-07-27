import Link from 'next/link'
import styles from '../styles/list.module.css'
import SvgComponent from './svg/starsvg'
import DeleteSvg from './svg/delete'
import ShareSvg from './svg/share'
import { useBookmark, useDelete } from '../utils/lib/api'
import toast, { Toaster } from 'react-hot-toast'
import { useSearch } from '../utils/helper/context'

interface IProps {
    array : {
    identifier : string,
    bookmarked: boolean
    _id : number;
    title : string;
    url : string;
    category : string;
    }[]
}



const List= ({array} : IProps) => {
    const deleteMutation = useDelete()
    const bookmarkMutation = useBookmark()

const handleShare =  (title: string, url:string) => {
    const shareOpts = {
        title: title,
        url: url
    };

    try {
        navigator.share(shareOpts)
       toast.success(`Shared ${title}`)
      } catch(err) {
       toast.error(`Error sharing :${err}`)
      }
    }

    const {search} = useSearch()
    array.filter((data) => {
        if(search === '') {
            return array;
        } else if (data.title.toLowerCase().includes(search.toLowerCase())
         || data.url.toLowerCase().includes(search.toLowerCase())) {
            return array
        }
    })

  return (
    <>
    {array.length === 0 ?   
    <div>
        <h2>Wow, such nothing 👀</h2>
    </div>
    :
    array.filter((data) => {
        if(search === '') {
            return array;
        } else if (data.title.toLowerCase().includes(search.toLowerCase())
         || data.url.toLowerCase().includes(search.toLowerCase())) {
            return array
        }
    })?.map(data => (
    <div key={data._id} className={styles.link_wrapper}>
        <div>
            <Toaster 
            position="top-center"
            reverseOrder={false}
            />
        </div>
        <div className={[styles.link_list, styles.dark_scheme, styles.light_scheme].join(" ")}>
            <Link href={data.url.includes('http') ? `${data.url}` : `https://${data.url}`}>
                <a target="_blank">
                    <div className={styles.links}>
                        <h3>{data.title}</h3>
                        <p> 
                        {data.url.includes('http') || data.url.includes('https')  ?
                            <Link href = {data.url}>
                                <a target="_blank">
                                    {data.url}
                                </a>
                            </Link>
                            :
                            <Link href = {`https://${data.url}`}>
                                 <a target="_blank">
                                    {`https://${data.url}`}
                                </a>
                            </Link>
                        }
                        </p>
                    </div>
                </a>
            </Link>
            <div className={styles.link__footer} >
                <div className={styles.link__category}>
                    <Link href={ `/v1/${data.identifier}/category/${data.category}`}>
                        <h3>{data.category}</h3>
                    </Link>
                </div>

                <div  className={styles.link__images}>
                    <div className={styles.link__image}
                    onClick = {()=> {
                        bookmarkMutation.mutate( data._id)
                    }} >
                        <SvgComponent starred = {data.bookmarked} />
                    </div>

                    <div onClick={() =>  { data.url.includes('http') ?
                        handleShare(data.title, `${data.url}`) : handleShare(data.title, `https://${data.url}`)
                        }} className={styles.link__image}>
                        <ShareSvg/>
                    </div>

                    <div onClick={
                        () => deleteMutation.mutate( data._id)
                    } className={styles.link__image}>
                        <DeleteSvg/>
                    </div>
                </div>    
            </div>
        </div>
    </div>
     ))}
     </>
  )
}

export default List