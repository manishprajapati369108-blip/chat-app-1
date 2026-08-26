import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-6 sm:px-6 md:px-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
        Login or Signup
      </h1>

      <div className="mx-auto mt-6 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
