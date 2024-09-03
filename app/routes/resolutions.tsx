import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Link, useLoaderData } from "@remix-run/react";
import { sql } from "lib/neon.server";
import { authenticator } from "utils/auth.server";
import Resolution from "~/components/Resolution";


export interface ResolutionProp {
    id: number;
    resolution: string;
    isComplete: boolean;
    year: number;
    user_id: number;
  }

  interface LoaderData {
    items: ResolutionProp[];
  }

  export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const action = formData.get('action');   

    
  switch (action) {
    case 'createUser':
      return createUser(formData,);
    case 'createResolution':{
      return createResolution(formData);}
    case 'toggleCompletion':
      return toggleCompletion(formData);
    case 'deleteResolution':
      return deleteResolution(formData);
    case "logout": {
        return await authenticator.logout(request, {redirectTo: "/login"})
    };
    default:
      throw new Error('Invalid action');
  }
};

async function createUser(formData: FormData) {
  const userEmail = formData.get('email');
  const userPassword = formData.get('password');

  const userResult =await sql`
    INSERT INTO users (email, password)
    VALUES (${userEmail}, ${userPassword})
    RETURNING id
  `;

  const userId = (userResult as any).rows[0].id;

  return json({ success: true, userId });
}

async function createResolution(formData: FormData) {
  const resolutionText = formData.get('resolution');
  const year = formData.get('year');
  const userId = 1;
  await sql`
    INSERT INTO resolution (resolution, iscomplete, user_id, year)
    VALUES (${resolutionText}, false, ${userId}, ${year})
  `;

  return json({ success: true });
}

async function toggleCompletion(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string") {
    return null;
  }

  const isComplete = !!formData.get("isComplete");
  await sql`
    UPDATE resolution
    SET isComplete = ${isComplete}
    WHERE id = ${id};
  `;

  return json({ success: true });
}

async function deleteResolution(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string") {
    return null;
  }

  await sql`
    DELETE FROM resolution WHERE id = ${id};
  `;

  return json({ success: true });
};


export async function loader({request}: ActionFunctionArgs) {
  let loggedInUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  console.log({loggedInUser})
    try {
      const rows = await sql(`SELECT * FROM resolution WHERE user_id = ${loggedInUser.id}`);
      const user = await sql(`SELECT * FROM users`);
      console.log({user});//TODO: Make a users route to list all users,
      
      const rowsNumb = rows.length;
      console.log({rowsNumb})
      console.log({rows});
      const items: ResolutionProp[] = rows.map((record) => ({
        id: record.id,
        resolution: record.resolution,
        isComplete: Boolean(record.isComplete), // Convert to boolean
        year: record.year,
        user_id: record.user_id,
      }));
      return {loggedInUser, items};
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const ResolutionsPage = () => {
  const {loggedInUser, items:resolutions} = useLoaderData<typeof loader>();
  
  return (
    <div className="p-10">
      <div className="grid grid-flow-col justify-between mb-16">
              <h1 className="text-3xl font-bold">
                New Year's Resolutions
              </h1>
              <Link className="inline-block bg-gray-700 rounded-[100%] p-4 items-center justify-center" to="/new-resolution">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </Link>
      </div>
      <div className="grid grid-flow-row gap-y-10">
                {/* <NewResolution /> */}
                <div className="flex flex-col space-y-8">
                    {resolutions.length === 0 ? (
                        <p className="text-gray-500 italic">{`You made no resolutions`}</p>
                    ) : (
                        resolutions.map(resolution => {
                            return (
                                <Resolution key={resolution.id}  resolution ={resolution}/>
                            )
                        })
                    )}
                </div>
        </div>
        {/* <div>
        {loggedInUser ? (
                    <Form method="post">
                        <button
                            type="submit"
                            name="action"
                            value="logout"
                            className="absolute bottom-2 right-2 bg-white tetx-black border-2 border-black py-1 px-3 rounded-md font-semibold"
                        >
                            Logout
                        </button>
                    </Form>
                ) : null}
        </div> */}
    </div>
    )
};

export default ResolutionsPage;
