import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.characters.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Aniduel</title>
        <meta name="description" content="Anime character leaderboad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center overflow-clip">
        <div className="flex h-full w-full flex-col md:max-w-5xl">
          <header className="flex h-14 w-full flex-row items-center justify-between">
            <h1 className="m-2 text-2xl">Aniduel</h1>
            <div className="flex items-center">
              <Link href="/leaderboard" className="m-2 text-xl">
                Matchups
              </Link>
              <Link href="/leaderboard" className="m-2 text-xl">
                Leaderboard
              </Link>
            </div>
          </header>
        </div>
      </main>
    </>
  );
}
