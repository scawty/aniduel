import Head from "next/head";
import Link from "next/link";

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
          <header className="flex h-14 w-full flex-row items-end justify-between">
            <h1 className="m-2 text-2xl font-bold">Aniduel</h1>
            <div className="flex items-end">
              <Link href="/" className="m-2 text-xl">
                Matchups
              </Link>
              <Link href="/leaderboard" className="m-2 text-xl">
                Leaderboard
              </Link>
            </div>
          </header>
          <div className="flex w-full justify-center justify-items-center overflow-scroll p-4">
            <RankingTable />
          </div>
        </div>
      </main>
    </>
  );
}
