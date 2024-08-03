import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

export const Navbar = () => {
  const { isAuth, logout } = useAuthContext();
  return (
    <div className="w-full fixed top-0 left-0 right-0 bg-blue-400">
      <div className="w-[90%] lg:max-w-[1184px] mx-auto flex items-center justify-between py-4">
        <p className="text-white font-bold text-xl">Quiz App</p>
        {isAuth ? (
          <div className="flex items-center gap-3">
            <p className="text-white font-medium">Hi, {isAuth.email}</p>
            <button
              onClick={() => logout()}
              className="text-blue-950 border border-blue-950 px-3 py-1 rounded-md bg-white font-bold"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
