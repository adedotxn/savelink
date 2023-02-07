import "@styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { UtilityProvider } from "@utils/context";
import Layout from "@components/layout";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const getContent = () => {
    if ([`/`].includes(appProps.router.pathname)) {
      return (
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      );
    }

    return (
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <UtilityProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UtilityProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    );
  };

  return <> {getContent()} </>;
}

export default MyApp;
