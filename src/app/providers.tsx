"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { UtilityProvider } from "@utils/context";
import Layout from "@components/layout";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <UtilityProvider>
          <Layout>{children}</Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </UtilityProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
