import styles from "@styles/app.module.css";
import Head from "next/head";
import Header from "./header";
import Sidebar from "./sidebar";
import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import Footer from "./footer";

export default function Layout({ children }: { children: ReactNode }) {
  const [side, setSide] = useState(false);

  const { data: session, status } = useSession();

  const name: string = session ? session.user?.name! : "";
  const mail: string = session?.user?.email!;

  return (
    <>
      <Head>
        <title>Savelink</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#fff" />
        <meta
          name="Savelink"
          content="Web app to safely store and categorise links from all across the web"
        />
        <meta name="application-name" content="Savelink" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Web app to safely store and categorise links from all across the web"
        />
        <meta
          name="description"
          content="Web app to safely store and categorise links from all across the web"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://savelink.vercel.app" />
        <meta name="twitter:title" content="Savelink" />
        <meta
          name="twitter:description"
          content="Web app to safely store and categorise links from all across the web"
        />
        <meta name="twitter:image" content="/icon-192x192.png" />
        <meta name="twitter:creator" content="@adedotxn" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="" />
        <meta
          property="og:description"
          content="Web app to safely store and categorise links from all across the web"
        />
        <meta property="og:site_name" content="Savelink" />
        <meta property="og:url" content="https://savelink.vercel.app" />
        <meta property="og:image" content="/icon-512x512.png" />
      </Head>

      <header className={styles.header}>
        <Header name={name} />
      </header>

      <main className={styles.main}>
        <div className={styles.side}>
          <Sidebar name={mail} />
        </div>
        <div className={styles.pages}>
          <main>{children}</main>
        </div>
      </main>

      <footer>
        <Footer side={side} setSide={setSide} name={mail} />
      </footer>
    </>
  );
}
