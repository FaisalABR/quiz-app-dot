import { useEffect } from "react";
import { useQuizContext } from "../../hooks/useQuiz";
import { Layout } from "../../Layouts";
import Timer from "../../components/Timer";
import Recap from "../../components/Recap";
import Choices from "../../components/Choices";

export const Quiz = () => {
  const { fetchQuestions, questions, index, isEnded } = useQuizContext();

  useEffect(() => {
    // if(localStorage.getItem('q'))
    fetchQuestions();
  }, []);

  return (
    <Layout>
      <div className="w-full h-screen bg-blue-600 flex items-center justify-center">
        <div className="w-[90%] lg:max-w-[1184px] ">
          {isEnded ? (
            <Recap />
          ) : (
            <div className="max-w-[520px] w-full rounded-sm bg-white mx-auto py-3">
              {/* Header */}
              <div className="flex w-full items-center justify-between px-4 mb-4">
                <h3 className="text-lg font-bold text-blue-950 ">
                  Dot Test Quiz
                </h3>

                <Timer />
              </div>
              {/* End of Header */}

              {/* Question */}
              <div className="px-4">
                <h3 className="text-xl font-bold text-blue-950 mb-5">
                  {index + 1}. {questions[index].question}
                </h3>
                <Choices />
              </div>
              {/* End of Question */}
              <hr className="w-full  border border-slate-500/40 my-5" />
              {/* Action */}

              <div className="flex px-4 items-center justify-between">
                <p className="text-lg text-blue-950 font-medium">
                  <span className="font-bold">{index + 1}</span> of{" "}
                  <span className="font-bold">{questions.length}</span> Question
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
