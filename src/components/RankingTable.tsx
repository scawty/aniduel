import { api } from "~/utils/api";

const RankingTable = () => {
  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = api.characters.getInfinite.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    }
  );

  console.log(data);

  return <h1>Table</h1>;
};

export default RankingTable;
