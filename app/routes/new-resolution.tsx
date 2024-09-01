import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { sql } from "lib/neon.server";
import { authenticator } from 'utils/auth.server';

interface LoaderData {
    year: number;
}
export const action = async ({ request }: ActionFunctionArgs) => {
    let loggedInUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      });
    const formData = await request.formData();
  
    // Handle resolution creation
    const resolutionText = formData.get('resolution');
    const year = formData.get('year');
  
    await sql`
      INSERT INTO resolution (resolution, iscomplete, user_id, year)
      VALUES (${resolutionText}, false, ${loggedInUser.id}, ${year})
    `;
  
    return redirect("/resolutions");
};

export const loader = async ({request}: LoaderFunctionArgs)=>{
    let loggedInUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      });
    return {loggedInUser, year:2024};
}

const NewResolution = () => {
    const currentYear = new Date().getFullYear()
    const {year} : LoaderData = useLoaderData()

    return (
        <div className="flex flex-col space-y-8 items-center justify-center mt-8 border border-gray-700 rounded-md bg-gray-800 p-10 max-w-xl mx-auto">
            <div className='flex flex-col items-center'>
                <h1>Your New Adventure Begins</h1>
                <p>What's the most exciting thing you can imagine doing this year?</p>
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
