import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { authenticator } from "utils/auth.server";
import { useForm } from "react-hook-form";

export const action = async ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("form", request, {
    successRedirect: "/resolutions",
    failureRedirect: "/login",
  });
};

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      // Perform login logic here, e.g., making a POST request to your server
      console.log("Login data:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Form method="post" className="p-10 text-center border-[1px] border-purple-700 rounded-md w-full mx-auto max-w-xl" onSubmit={handleSubmit}>
      <h1 className="font-bold text-xl">Welcome! Login to see your resolutions.</h1>
      <p className="mb-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>

      <div className="space-y-4">
                <div className="flex items-center">
                <div className="w-1/3">
                    <label className=" block font-semibold mr-2" htmlFor="email">
                        Email
                    </label>
                </div>
                <div className="w-2/3">
                    <input
                        {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        required
                    />
                {errors.email && <p className="text-red-500">Email is required</p>}
                </div>
                </div>
                <div className="flex items-center">
                    <div className="w-1/3">
                        <label className="font-semibold mr-2" htmlFor="password">
                            Password
                        </label>
                    </div>
                    <div className="w-2/3">
                        <input
                            {...register("password", { required: true, minLength: 8 })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500">
                            Password is required and must be at least 8 characters long
                            </p>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-3 rounded"
                 >
                  Login
                </button>
      </div>

    </Form>
  );
};

export default LoginPage;