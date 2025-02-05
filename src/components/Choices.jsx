import { useEffect, useState } from "react";
import { useQuizContext } from "../hooks/useQuiz";

const Choices = () => {
  const { index, questions, handleAnswer } = useQuizContext();
  const [answers, setAnswers] = useState([
    ...questions[index].incorrect_answers,
    questions[index].correct_answer,
  ]);

  useEffect(() => {
    setAnswers([
      ...questions[index].incorrect_answers,
      questions[index].correct_answer,
    ]);
  }, [questions, index]);

  return (
    <div className="w-full flex flex-col gap-2 ">
      {answers.map((item, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(item)}
          className="w-full px-2 py-1 rounded-md hover:animate-pulse font-medium cursor-pointer border border-blue-500 bg-blue-200 text-sm text-slate-950"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Choices;
