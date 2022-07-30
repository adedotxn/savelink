import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'
import { signIn, useSession} from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const {data : session} = useSession();


  const handleSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("google")
  }
  const router = useRouter()
  let name = session?.user?.email

  useEffect(() => {
    if(session) {console.log(session?.user?.email, session?.user?.image)}
    
    if(session) {router.push(`/v1/${name}/`)}
  }, [session])
  

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Welcome to savelinks</h1>

        <p>Save and categorise your important links from all across the internet in one place.</p>

        <div>
            <a href={`/api/auth/signin`}
             onClick={handleSignIn}>
              <button> Sign in with google </button>
            </a>
          {/* <button> Sign in with twitter</button> */}
          {/* <Link href='/demo/dashboard'>  
            <button> Demo sign in </button>
          </Link>  */}

        </div>
      </main>
    </div>
  )
}

export default Home
