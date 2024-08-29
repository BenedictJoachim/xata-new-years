import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import bcrypt from 'bcryptjs';
import { sql } from "lib/neon.server";
import { authenticator } from "utils/auth.server";

export const action = async({request}: ActionFunctionArgs) => {
    // Capturing sgnup credentials
    const form = await request.formData();
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
    const clonedRequest = new Request(request.url, request);

  return await authenticator.authenticate("form", clonedRequest, {
    successRedirect: "/resolutions",
    failureRedirect: "/login",
    context: {id: user.id},
    })
}

const SignUpPage = () => {
    return(
        <Form method="post" className="p-10 text-center">
            <h1 className="font-bold text-xl">
                Welcome! Sign up to create resolutions.
            </h1>

            <p className="mb-6">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                    Login
                </Link>
            </p>

            <label className="font-semibold mr-2" htmlFor="email">
                Email
            </label>
            <input
                className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1 text-gray-800"
                type="email"
                name="email"
                id="email"
            />

            <label className="font-semibold mr-2" htmlFor="password">
                Password
            </label>
            <input
                className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1 text-gray-800"
                type="password"
                name="password"
                id="password"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-3 rounded-md font-semibold"
            >
                Signup
            </button>
        </Form>
    )
};

export default SignUpPage;