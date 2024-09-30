import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import './globals.css'

export const metadata: Metadata = {
  title: "view-demo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}
