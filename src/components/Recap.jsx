import { Link } from "react-router-dom";
import { useQuizContext } from "../hooks/useQuiz";

const Recap = () => {
  const { questions, score, countRight, resetGame } = useQuizContext();

  return (
    <div className="max-w-[520px] w-full rounded-sm bg-white mx-auto py-3">
      {/* Header */}
      <div className="flex w-full items-center justify-between px-4 mb-4">
        <h3 className="text-lg font-bold text-blue-950 ">Dot Test Quiz</h3>
      </div>
      {/* End of Header */}

      {/* Question */}
      <div className="px-4 flex flex-col gap-1">
        <h1 className="text-lg">Game Selesai</h1>
        <h1 className="text-lg">Score: {score}</h1>
        <div className="flex items-center gap-3">
          <p className="text-lg text-green-500">Right: {countRight}</p>
          <p className="text-lg text-red-500">
            Wrong: {questions.length - countRight}
          </p>
        </div>
      </div>
      {/* End of Question */}

      <div className="flex items-start gap-3 mt-2  3 px-3">
        <Link
          to="/"
          onClick={() => localStorage.removeItem("quizState")}
          className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
        >
          Return to Home
        </Link>
        <button
          onClick={() => resetGame()}
          className="bg-white border border-blue-950 px-3 py-1 rounded-md text-blue-950 font-bold"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Recap;
