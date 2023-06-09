import { Props } from "@/types";
import Head from "next/head";

export default function PageLayout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>    
      <main>
       {children}
      </main>
    </>
  ) 
};