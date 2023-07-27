import { api } from "~/utils/api";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";

const RankingTable = () => {
  const [query, setQuery] = useState("");

  const itemsPerPage = 20;

  const { ref, inView } = useInView();

  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    api.characters.getInfinite.useInfiniteQuery(
      {
        limit: itemsPerPage,
        query: query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        // initialCursor: 1, // <-- optional you can pass an initialCursor
      }
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(console.error);
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isError) return <div>Error!</div>;

  return (
    <div className="overflow-scroll">
      <div className="flex w-full flex-row justify-center">
        <input
          className="m-4 w-1/3 rounded-md border-2 border-indigo-200 bg-indigo-950 p-2 focus:outline-indigo-400"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        ></input>
      </div>
      {isLoading ? (
        <div className="w-full text-center">Loading...</div>
      ) : (
        <div className="flex w-full justify-center justify-items-center p-4">
          <table className="w-full rounded-3xl sm:w-2/3">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Character</th>
                <th>Elo</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.pages.map((page, pageIndex) =>
                  page.characters.map((character, characterIndex) => {
                    const currentRank =
                      pageIndex * itemsPerPage + characterIndex + 1;
                    return (
                      <tr
                        key={character.id}
                        className="h-10 rounded-md bg-indigo-950 bg-opacity-10 shadow-md"
                        ref={ref}
                      >
                        <td className="text-center text-xl font-semibold">
                          {currentRank}
                        </td>
                        <td className="">
                          <div className="ml-4 flex w-fit flex-row gap-x-2 align-bottom">
                            <Image
                              src={character.smallImgUrl}
                              alt={character.name}
                              width={21}
                              height={32}
                              className="scale-105 rounded-full"
                            ></Image>
                            <div className="align-text-bottom text-xl">
                              {character.name}
                            </div>
                          </div>
                        </td>
                        <td className="text-center">{character.elo}</td>
                      </tr>
                    );
                  })
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RankingTable;
