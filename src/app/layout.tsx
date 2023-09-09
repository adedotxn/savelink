import { Metadata } from "next";
import "@styles/globals.css";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import SessionProvider from "../lib/session-provider";

export const metadata: Metadata = {
  title: "Savelink",
  description:
    "Web app to safely store and categorise links from all across the web",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
