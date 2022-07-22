import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from 'react-query'
import { DialogProvider } from '../utils/helper/context'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps, ...appProps}: AppProps) {

  const getContent = () => {
    if([`/`].includes(appProps.router.pathname)){
      return (
      <SessionProvider  session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
      )
    }


    return (
      <SessionProvider  session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <DialogProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </DialogProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    )
  }

  return <> {getContent()} </>
}

export default MyApp
