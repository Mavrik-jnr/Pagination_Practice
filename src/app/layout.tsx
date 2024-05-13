import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloClient, gql, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./globals.css";
import { Providers } from "@/utils/Provider";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-4 md:px-8 xl:px-12`}>
        <Providers>

        {children}
        </Providers>
        </body>
    </html>
  );
}
