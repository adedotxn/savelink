import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, session, pageProps, ...appProps}: AppProps) {

  const getContent = () => {
    if([`/`].includes(appProps.router.pathname)){
      return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      )
    }


    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    )
  }

  return <> {getContent()} </>
}

export default MyApp
