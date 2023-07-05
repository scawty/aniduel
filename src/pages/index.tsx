import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Image from "next/image";
import { useState } from "react";
import { type Character } from "@prisma/client";

export default function Home() {
  const { data: matchup, refetch } = api.matchups.getMatchup.useQuery();

  const handleMatchupResult = () => {
    refetch()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
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
            <div className="flex h-4/5 w-3/4 flex-row justify-evenly">
              <div className="m-4 h-fit hover:scale-110">
                <Image
                  src={matchup?.[0]?.imgUrl || ""}
                  alt={matchup?.[0]?.name || "image1"}
                  width={225}
                  height={350}
                  className="rounded-lg"
                  onClick={handleMatchupResult}
                ></Image>
                <h2 className="text-center text-xl">{matchup?.[0]?.name}</h2>
                <div className="flex w-full justify-center">
                  <a href={matchup?.[0]?.malUrl} target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 hover:cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="m-4 h-fit hover:scale-110">
                <Image
                  src={matchup?.[1]?.imgUrl || ""}
                  alt={matchup?.[1]?.name || "image2"}
                  width={225}
                  height={350}
                  className="rounded-lg"
                  onClick={handleMatchupResult}
                ></Image>
                <h2 className="text-center text-xl">{matchup?.[1]?.name}</h2>
                <div className="flex w-full justify-center">
                  <a href={matchup?.[1]?.malUrl} target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 hover:cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
