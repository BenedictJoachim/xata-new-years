import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import { sql } from "lib/neon.server";

// Define the User interface
interface User {
    id: number;
    email: string;
    password: string;
}

// Create the Authenticator, specifying the User type
const authenticator = new Authenticator<User>(sessionStorage);

// Define the Form Strategy with proper typing
const formStrategy = new FormStrategy<User>(async ({ form }) => {
    // Capture email and password from the form
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    // Query the database to find the user and ensure it is correctly typed
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;

    // Extract the first user from the result, or set to undefined if no user is found
    const user = result.length > 0 ? (result[0] as User) : undefined;

    // If no user is found, throw an authorization error
    if (!user) {
        console.log("Wrong email");
        throw new AuthorizationError();
    }

    // Compare the provided password with the stored hashed password
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        throw new AuthorizationError();
    }

    // Return the user, ensuring the correct type is returned
    return user;
});

// Register the strategy with the authenticator
authenticator.use(formStrategy, "form");

// Export the authenticator for use in your app
export { authenticator };
