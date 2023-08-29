import { Metadata } from "next";
import "@styles/globals.css";
import Providers from "./providers";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Savelink",
  description: "Welcome to Next.js",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
