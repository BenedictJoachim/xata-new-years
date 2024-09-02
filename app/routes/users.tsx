import { Link, useLoaderData } from "@remix-run/react";
import { sql } from "lib/neon.server";

export async function loader(){
    const user = await sql(`SELECT * FROM users`);
    return {user}
}

const Users = () => {
    const {user} = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>List of Users</h1>
            <ul>
                {user.map(u => (
                    <li key={u.id}>EMAIL: {u.email}</li>
                ))}
            </ul>
            <div className="absolute bottom-2 right-2 bg-white border-2 border-black py-1 px-3 rounded-md font-semibold">
                <Link to="/resolutions" className="tetx-black">
                    Resolutions
                </Link>
            </div>
        </div>
    )
}

export default Users;