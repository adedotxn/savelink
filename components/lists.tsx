import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/list.module.css'
import { FC, useEffect, useState } from 'react'
import SvgComponent from './svg/starsvg'
import DeleteSvg from './svg/delete'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import apiClient from '../utils/http-config'
import { AxiosResponse } from 'axios'
import { bookmarkLink, deleteLink } from '../utils/lib/api'

interface IProps {
    array : {
    bookmarked: boolean
    _id : number;
    title : string;
    url : string;
    category : string;
    }[]
}



const List= ({array} : IProps) => {

    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        deleteLink, 
        {
            onSuccess : () => {
                queryClient.invalidateQueries(['links'])
            }
        }
    )

    const bookmarkMutation = useMutation(
        bookmarkLink, 
        {
            onSuccess : () => {
                queryClient.invalidateQueries(['links'])
            }
        }
    )
  return (
    <>
    {array.map(data => (
    <div key={data._id} className={styles.link_wrapper}>
        <div className={[styles.link_list, styles.dark_scheme, styles.light_scheme].join(" ")}>
            <div className={styles.links}>
                <h3>{data.title}</h3>
                <p> 
                    {!data.url.includes('http') ? 
                    <Link href={`https://${data.url}`}>
                        <a target="_blank">
                            {data.url}
                        </a>
                    </Link> : 
                    <Link href={`${data.url}`}>
                        <a target="_blank">
                            {data.url}
                        </a>
                    </Link>
                    }
                </p>
            </div>
            <div className={styles.link__footer} >
                <div className={styles.link__category}>
                    <h3>{data.category}</h3>
                </div>

                <div  className={styles.link__images}>
                    <div className={styles.link__image}
                    onClick = {()=> {
                        bookmarkMutation.mutate(data._id)
                    }} >
                        <SvgComponent starred = {data.bookmarked} />
                    </div>

                    <div className={styles.link__image}>
                        <Image 
                            src='/share.svg'
                            alt='share button'
                            width={20}
                            height={20}
                        />
                    </div>

                    <div onClick={
                        () => deleteMutation.mutate(data._id)
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