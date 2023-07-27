import Head from "next/head";
import Navbar from "~/components/Navbar";

import RankingTable from "~/components/RankingTable";

export default function Leaderboard() {
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
          <RankingTable />
        </div>
      </main>
    </>
  );
}
