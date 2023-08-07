import Head from "next/head";
import { type ReactNode } from "react";
import Navbar from "./Navbar";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
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
      <footer className="w-full">
        <div className="mb-8 mt-12 flex min-h-full flex-row items-center justify-center gap-2">
          <a href="https://github.com/scawty/aniduel">
            <AiFillGithub size={28} />
          </a>
          <a href="https://twitter.com/scott_cilento">
            <AiFillTwitterCircle size={28} />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
