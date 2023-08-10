import { Transition } from "@headlessui/react";

interface Props {
  show: boolean;
  score?: number;
  isWinner: boolean;
}

const EloScore = ({ show, score, isWinner }: Props) => {
  return (
    <>
      <Transition
        show={show}
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`text-lg font-semibold ${
            isWinner ? "text-green-800" : "text-red-800"
          }`}
        >
          {score}
          {isWinner ? "(+)" : "(-)"}
        </div>
      </Transition>
    </>
  );
};

export default EloScore;
