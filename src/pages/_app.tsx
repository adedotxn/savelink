import "@styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { UtilityProvider } from "@utils/context";
import Layout from "@components/layout";
import ErrorBoundary from "@components/ui/errorboundary";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const pathName = appProps.router.pathname;

  if (pathName === "/" || pathName === "/signin") {
    return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  return (
    <ErrorBoundary fallback={"An error occured :("}>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <UtilityProvider>
              <Layout>
                <Toaster expand={false} position="top-right" />
                <Component {...pageProps} />
              </Layout>
            </UtilityProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
