import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/app.module.css'
import { FC, ReactNode, useState } from 'react'
import Layout from '../components/layout'
import DemoLayout from '../components/demo/layout'

function MyApp({ Component, pageProps, ...appProps }: AppProps) {

  const getContent = () => {
    if([`/`].includes(appProps.router.pathname)){
      return <Component {...pageProps} />
    }

    if((appProps.router.pathname).includes('/demo')){
      return (
        <DemoLayout>
          <Component {...pageProps} />
        </DemoLayout>
      )
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }

  return <> {getContent()} </>
}

export default MyApp
