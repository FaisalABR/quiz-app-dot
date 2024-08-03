import { createContext, useEffect, useState } from "react";
import { questionQuiz } from "../utils/constants";
import PropTypes from "prop-types";

export const QuizContext = createContext(undefined);

const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState(questionQuiz);
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(15);
  const [isEnded, setIsEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState();
  const [countRight, setCountRight] = useState(0);
  const [isResume, setIsResume] = useState(false);

  const saveQuizState = () => {
    const quizState = {
      questions,
      index,
      timer,
      isEnded,
      score,
      countRight,
    };
    localStorage.setItem("quizState", JSON.stringify(quizState));
  };

  const getSavedQuizState = () => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      setIsResume(true);
      return JSON.parse(savedState);
    } else {
      setIsResume(false);
      return null;
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost:3000/questions");
      const data = await res.json();

      setQuestions(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleAnswer = (answer) => {
    if (answer === questions[index].correct_answer) {
      setScore((prevState) => prevState + 100);
      setCountRight((prevState) => prevState + 1);
    }

    const nextIndex = index + 1;
    const isLastQuestion = questions.length === nextIndex;

    if (isLastQuestion) {
      setIsEnded(true);
    } else {
      setIndex(nextIndex);
    }
  };

  const resetGame = () => {
    setTimer(15);
    setIsEnded(false);
    setIndex(0);
    setScore(0);
    setCountRight(0);
    localStorage.removeItem("quizState");
  };

  useEffect(() => {
    // Coba muat status kuis dari localStorage saat provider di-mount
    const savedState = getSavedQuizState();
    if (savedState) {
      setQuestions(savedState.questions);
      setIndex(savedState.index);
      setTimer(savedState.timer);
      setIsEnded(savedState.isEnded);
      setScore(savedState.score);
      setCountRight(savedState.countRight);
    }
  }, []);

  // Bug disini
  useEffect(() => {
    window.addEventListener("beforeunload", saveQuizState);
  }, [questions, index, timer, isEnded, score, countRight]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        timer,
        isEnded,
        setQuestions,
        setTimer,
        setIsEnded,
        score,
        setScore,
        index,
        setIndex,
        error,
        setError,
        countRight,
        setCountRight,
        isResume,
        fetchQuestions,
        resetGame,
        handleAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizProvider;
