import { api } from "~/utils/api";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const RankingTable = () => {
  const [query, setQuery] = useState("");
  const [reverseOrder, setReverseOrder] = useState(false);

  const itemsPerPage = 20;

  const { ref, inView } = useInView();

  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    api.characters.getInfinite.useInfiniteQuery(
      {
        limit: itemsPerPage,
        query: query,
        reverse: reverseOrder,
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
                <th onClick={() => setReverseOrder(!reverseOrder)}>
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    Rank
                    {reverseOrder ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
                  </div>
                </th>
                <th>Character</th>
                <th>Elo</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.pages.map((page, pageIndex) =>
                  page.characters.map((character, characterIndex) => {
                    const currentRank = reverseOrder
                      ? 1000 - (pageIndex * itemsPerPage + characterIndex)
                      : pageIndex * itemsPerPage + characterIndex + 1;
                    return (
                      <tr
                        key={character.id}
                        className="h-10 rounded-md bg-indigo-950 bg-opacity-10 shadow-md"
                        ref={ref}
                      >
                        <td className="text-center text-xl font-semibold">
                          {!query && currentRank}
                        </td>
                        <td className="flex flex-row justify-between">
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
                          <a
                            href={character.malUrl}
                            target="_blank"
                            className="flex items-center pr-2"
                          >
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
