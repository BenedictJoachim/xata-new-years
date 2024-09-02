import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4 text-center flex justify-center items-center">
      <div className="max-w-md flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl font-bold">New Year Resolutions</h1>
        <p>
          <Link to="/signup" className="text-indigo-500">Sign up</Link> to record and track your resolutions, or <Link to="/login" className="text-indigo-500">Login</Link> if you already have an account.
        </p>
      </div>
    </div>
  );
}
