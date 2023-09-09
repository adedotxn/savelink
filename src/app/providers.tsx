"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { UtilityProvider } from "@utils/context";
import Layout from "@components/shared/layout/layout";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import ErrorBoundary from "@components/ui/errorboundary";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());
  const pathname = usePathname();

  return (
    <ErrorBoundary fallback={"An error occured :("}>
      <QueryClientProvider client={client}>
        <UtilityProvider>
          <Toaster />
          {pathname && pathname === "/sign-in" ? (
            <>{children}</>
          ) : (
            <Layout>{children}</Layout>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </UtilityProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
