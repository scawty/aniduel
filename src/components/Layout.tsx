import Head from "next/head";
import { type ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
    children: ReactNode;
}

const Layout = ({children}: Props) => {
  return <>
  <Head>
    <title>Aniduel</title>
    <meta name="description" content="Anime character leaderboad" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <main className="flex h-screen justify-center overflow-clip">
    <div className="flex h-full w-full flex-col md:max-w-5xl">
      <Navbar />
      {children}
    </div>
  </main>
</>;
};

export default Layout;
