import { useLoaderData } from "@remix-run/react";
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
        </div>
    )
}

export default Users;