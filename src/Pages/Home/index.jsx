import { Link } from "react-router-dom";
import { Layout } from "../../Layouts";
import { useAuthContext } from "../../hooks/useAuth";
import { useQuizContext } from "../../hooks/useQuiz";

export const Home = () => {
  const { isAuth } = useAuthContext();
  const { resetGame, isResume } = useQuizContext();

  return (
    <Layout>
      <div className="w-full h-screen bg-blue-600 flex items-center justify-center">
        <div className="w-[90%] lg:max-w-[1184px] flex items-center justify-center">
          <div className="w-full max-w-[420px] px-4 bg-white rounded-sm shadow-sm py-3 flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">
              Hi, {isAuth ? isAuth.email : "Guest"}
            </h1>
            {isAuth ? (
              <p>Let&apos;s Start the quiz</p>
            ) : (
              <p>Before you start the game please login first.</p>
            )}
            {isAuth ? (
              <Link
                to="/quiz"
                onClick={() => resetGame()}
                className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
              >
                Play
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
              >
                Login
              </Link>
            )}
            {isResume && (
              <Link
                to="/quiz"
                className="text-blue-950 border border-blue-950 px-3 py-1 rounded-md bg-white font-bold"
              >
                Resume
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
