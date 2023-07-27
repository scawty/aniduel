import Head from "next/head";
import Matchup from "~/components/Matchup";
import Navbar from "~/components/Navbar";

export default function Home() {
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
          <Matchup></Matchup>
        </div>
      </main>
    </>
  );
}
