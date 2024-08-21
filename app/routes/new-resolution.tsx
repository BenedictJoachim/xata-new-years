import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { sql } from "lib/neon.server";

interface LoaderData {
    year: number;
}
export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
  
    // Handle user creation
    /*const userEmail = formData.get('email');
    const userPassword = formData.get('password');
  
    const userResult = await sql`
      INSERT INTO users (email, password)
      VALUES (${userEmail}, ${userPassword})
      RETURNING id
    `;
  
    const userId = (userResult as any).rows[0].id;*/
  
    // Handle resolution creation
    const resolutionText = formData.get('resolution');
    const year = formData.get('year');
  
    await sql`
      INSERT INTO resolution (resolution, iscomplete, user_id, year)
      VALUES (${resolutionText}, false, 1, ${year})
    `;
  
    return redirect("/resolutions");
};

export const loader = async ({request}: LoaderFunctionArgs)=>{
    return {year:2024};
}

const NewResolution = () => {
    const currentYear = new Date().getFullYear()
    const {year} : LoaderData = useLoaderData()

    return (
        <div className="flex flex-col space-y-8">
            <div>
                {/* User Registration Form */}
                <Form 
                    method="post"
                    className="grid grid-flow-col justify-start items-center text-gray-500"
                >
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
                     />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
                     />

                    <button 
                        type="submit"
                        name='action'
                        value='createUser'
                        className="bg-blue-500 text-white py-1 px-3 rounded-md font-semibold"
                    >
                        Create User
                    </button>
                </Form>
            </div>
            <div>
                <Form
                    method="post"
                    className="grid grid-flow-col justify-start items-center text-gray-500"
                >
                    <label className="font-semibold mr-2" htmlFor="year">
                        Year
                    </label>

                    <select
                        name="year"
                        id="year"
                        className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1 h-9"
                        defaultValue={year}
                    >
                        {Array.from(Array(10).keys()).map(index => {
                            const year = currentYear + index
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            )
                        })}
                    </select>

                    <label className="font-semibold mr-2" htmlFor="resolution">
                        Resolution
                    </label>
                    <input
                        type="text"
                        name="resolution"
                        id="resolution"
                        className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
                    />
                    <button
                        type="submit"
                        name="action"
                        value="createResolution"
                        className="bg-blue-500 text-white py-1 px-3 rounded-md font-semibold"
                    >
                        Add
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default  NewResolution ;
