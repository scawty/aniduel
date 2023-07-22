import { api } from "~/utils/api";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Image from "next/image";

const RankingTable = () => {
  const itemsPerPage = 20;
  const { ref, inView } = useInView();
  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    api.characters.getInfinite.useInfiniteQuery(
      {
        limit: itemsPerPage,
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <>
      <table className="rounded-3xl md:w-2/3">
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
                    className="h-10 rounded-md bg-indigo-950 bg-opacity-10 shadow-md hover:cursor-pointer"
                    ref={ref}
                  >
                    <td className="text-center">{currentRank}</td>
                    <td className="">
                      <div className="ml-2 flex flex-row gap-x-2 align-bottom">
                        <Image
                          src={character.smallImgUrl}
                          alt={character.name}
                          width={21}
                          height={32}
                          className="rounded-full"
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
    </>
  );
};

export default RankingTable;
