import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import bcrypt from 'bcryptjs';
import { sql } from "lib/neon.server";
import { authenticator } from "utils/auth.server";

export const action = async({request}: ActionFunctionArgs) => {
    // Capturing sgnup credentials
    const form = await request.clone().formData();
    const email = form.get('email');
    const password = form.get('password')?.toString();

    console.log(email, password);
    
    // Validate email and password
    if (!email || !password) {
        return json("Email and password are required.", { status: 400 });
    }

    // Check if email already exists
    const existingUser = await sql`
        SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
        return json("Email already exists.", { status: 400 });
    }

    // Hashed and salted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [user] =await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hashedPassword})
    RETURNING id
  `;
    // Clone the request object
    //const clonedRequest = new Request(request.url, request);

  return await authenticator.authenticate("form", request, {
    successRedirect: "/resolutions",
    failureRedirect: "/login",
    context: {id: user.id},
    })
}

const SignUpPage = () => {
    return(
        <Form method="post" className="p-10 text-center border-[1px] border-purple-700 rounded-md w-full mx-auto max-w-xl">
            <h1 className="font-bold text-xl">
                Welcome! Sign up to create resolutions.
            </h1>

            <p className="mb-6">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                    Login
                </Link>
            </p>

            <div className="space-y-4">
                <div className="flex items-center">
                    <div className="w-1/3">
                        <label className="font-semibold mr-2" htmlFor="email">
                            Email
                        </label>
                    </div>
                    <div className="w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="email"
                            name="email"
                            id="email"
                        />
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
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="password"
                            name="password"
                            id="password"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-3 rounded"
                >
                    Signup
                </button>
            </div>
        </Form>
    )
};

export default SignUpPage;