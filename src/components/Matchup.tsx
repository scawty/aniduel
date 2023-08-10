import { useState } from "react";
import MatchupCard from "~/components/MatchupCard";
import { api } from "~/utils/api";
import EloScore from "./EloScore";

const Matchup = () => {
  const { data: matchup, refetch } = api.matchups.getMatchup.useQuery();
  const mutation = api.matchups.postMatchupResult.useMutation();

  const [matchupComplete, setMatchupComplete] = useState<boolean>(false);
  const [lingeringScores, setLingeringScores] = useState<number[]>([0, 0]);
  const [winner, setWinner] = useState<"CharacterOne" | "CharacterTwo" | null>(
    null
  );

  if (!matchup) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="m-2 text-2xl">Who do you rank higher?</h2>
        <div className="flex h-4/5 w-3/4 flex-row justify-evenly">
          <MatchupCard isLoading={true} />
          <MatchupCard isLoading={true} />
        </div>
      </div>
    );
  }

  const handleMatchupResult = (
    winner: number,
    loser: number,
    winnerName: "CharacterOne" | "CharacterTwo"
  ) => {
    setMatchupComplete(true);

    setLingeringScores([matchup[0]?.elo ?? 0, matchup[1]?.elo ?? 0]);

    setWinner(winnerName);

    mutation.mutate(
      { winnerId: winner, loserId: loser },
      {
        onSuccess: () => {
          setTimeout(() => {
            setMatchupComplete(false);
          }, 800);
          refetch()
            .then()
            .catch((error) => {
              console.log(error);
            });
        },
      }
    );
  };

  const handleSkip = () => {
    refetch()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="m-2 text-2xl">Who do you rank higher?</h2>
        <div className="flex h-8 w-full flex-row justify-evenly">
          <EloScore
            show={matchupComplete}
            score={lingeringScores[0]}
            isWinner={winner === "CharacterOne"}
          />
          <EloScore
            show={matchupComplete}
            score={lingeringScores[1]}
            isWinner={winner === "CharacterTwo"}
          />
        </div>
        <div className="flex h-4/5 w-3/4 flex-col ">
          <div className="flex h-fit w-full flex-row justify-evenly">
            {matchup[0] ? (
              <MatchupCard
                handleMatchupResult={() => {
                  if (matchup[0]?.id && matchup[1]?.id) {
                    handleMatchupResult(
                      matchup[0].id,
                      matchup[1].id,
                      "CharacterOne"
                    );
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
                    handleMatchupResult(
                      matchup[1].id,
                      matchup[0].id,
                      "CharacterTwo"
                    );
                  }
                }}
                isLoading={false}
                character={matchup[1]}
              />
            ) : (
              <MatchupCard isLoading={true} />
            )}
          </div>
          <div className="flex w-full flex-row justify-center">
            <button
              className="rounded-md bg-indigo-800 px-4 py-2 text-xl font-semibold shadow hover:bg-indigo-700"
              onClick={handleSkip}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Matchup;
