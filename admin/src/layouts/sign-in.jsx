import { Link } from "react-router-dom";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";


const SignIn = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-[url('/assets/images/auth/bg.jpg')] p-5 dark:bg-none">
      <div className="absolute inset-0 bg-white dark:bg-[#121212] opacity-90"></div>
      <div className="relative z-10 w-full max-w-[520px] rounded-lg bg-white p-5 shadow-lg dark:bg-[#1D1D1D]">
        <div className="mb-10 flex justify-center">
          <img src={logoLight} alt="Logo" />
        </div>
        <Breadcrumb pageName="Sign In" />
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email and password to access your account.
          </p>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
