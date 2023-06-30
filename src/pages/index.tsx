import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Image from "next/image";

export default function Home() {
  const matchup = api.matchups.getMatchup.useQuery();

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
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h2 className="m-2 text-2xl">Choose your favorite</h2>
            <div className="flex h-4/5 w-4/5 flex-row justify-evenly">
              <div className="m-4 h-fit hover:scale-110">
                <Image
                  src={matchup?.data?.[0]?.imgUrl || ""}
                  alt={matchup?.data?.[0]?.name || "image1"}
                  width={200}
                  height={200}
                ></Image>
                <h2 className="text-center text-xl">
                  {matchup?.data?.[0]?.name}
                </h2>
              </div>
              <div className="m-4 h-fit hover:scale-110">
                <Image
                  src={matchup?.data?.[1]?.imgUrl || ""}
                  alt={matchup?.data?.[1]?.name || "image2"}
                  width={200}
                  height={200}
                ></Image>
                <h2 className="text-center text-xl">
                  {matchup?.data?.[1]?.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
