import { type Character } from "@prisma/client";
import Image from "next/image";

interface Props {
  character?: Character;
  isLoading: boolean;
  handleMatchupResult?: () => void;
}

const MatchupCard = ({ character, isLoading, handleMatchupResult }: Props) => {
  return (
    <>
      {!isLoading && character ? (
        <div className="m-4 h-fit w-[225px] hover:scale-110">
          <Image
            src={character.imgUrl || ""}
            alt={character.name || "image1"}
            width={225}
            height={350}
            className="rounded-lg hover:cursor-pointer"
            onClick={handleMatchupResult}
          ></Image>
          <h2 className="text-center text-xl">{character.name}</h2>
          <div className="flex w-full justify-center">
            <a href={character.malUrl} target="_blank">
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
      ) : (
        <div className="m-4 h-fit w-[225px] animate-pulse">
          <div className="h-[350px] w-[225px] rounded-lg border-2 border-indigo-300 bg-indigo-950"></div>
          <div className="m-2 h-4 justify-self-center rounded bg-indigo-400"></div>
          <div className="flex w-full justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchupCard;
