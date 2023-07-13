import MatchupCard from "~/components/matchupcard";
import { api } from "~/utils/api";

const Matchup = () => {
  const { data: matchup, refetch } = api.matchups.getMatchup.useQuery();
  const mutation = api.matchups.postMatchupResult.useMutation();

  const handleMatchupResult = (winner: number, loser: number) => {
    //post the matchup result
    mutation.mutate({ winnerId: winner, loserId: loser });
    //get a new matchup
    refetch()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {matchup ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h2 className="m-2 text-2xl">Choose your favorite</h2>
          <div className="flex h-4/5 w-3/4 flex-row justify-evenly">
            {matchup[0] ? (
              <MatchupCard
                handleMatchupResult={() => {
                  if (matchup[0]?.id && matchup[1]?.id) {
                    handleMatchupResult(matchup[0].id, matchup[1].id);
                  }
                }}
                isLoading={false}
                character={matchup[0]}
              />
            ) : (
              <MatchupCard isLoading={true} />
            )}

            {matchup[1] ? (
              <MatchupCard
                handleMatchupResult={() => {
                  if (matchup[1]?.id && matchup[0]?.id) {
                    handleMatchupResult(matchup[1].id, matchup[0].id);
                  }
                }}
                isLoading={false}
                character={matchup[1]}
              />
            ) : (
              <MatchupCard isLoading={true} />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Matchup;