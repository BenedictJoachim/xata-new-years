import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, json, Link } from "@remix-run/react";
import { sql } from "lib/neon.server";
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
  
    // Handle user creation
    const userEmail = formData.get('email');
    const userPassword = formData.get('password');
  
    const userResult = await sql`
      INSERT INTO users (email, password)
      VALUES (${userEmail}, ${userPassword})
      RETURNING id
    `;
  
    const userId = (userResult as any).rows[0].id;
  
    // Handle resolution creation
    const resolutionText = formData.get('resolution');
    const year = formData.get('year');
  
    await sql`
      INSERT INTO resolutions (resolution, iscomplete, user_id, year)
      VALUES (${resolutionText}, false, ${userId}, ${year})
    `;
  
    return json({ success: true });
};


export async function loader() {
    try {
      const rows = await sql(`SELECT * FROM resolution`);
      console.log(rows);
      const items: ResolutionProp[] = rows.map((record) => ({
        id: record.id,
        resolution: record.resolution,
        isComplete: Boolean(record.isComplete), // Convert to boolean
        year: record.year,
        user_id: record.user_id,
      }));
      return {items};
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const ResolutionsPage = () => {
    const {items:resolutions} = useLoaderData<typeof loader>();
  return (
    <div className="p-10">
      <div className="grid grid-flow-col justify-between mb-16">
          <Link className="inline-block" to="/new-resolution">
              <h1 className="text-3xl font-bold">
                New Year's Resolutions
              </h1>          
          </Link>
      </div>
      <div className="grid grid-flow-row gap-y-10">
                {/* <NewResolution /> */}

                <div className="grid grid-cols-[repeat(4,auto)] justify-start items-center gap-x-8 gap-y-4">
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
    </div>
    )
};

export default ResolutionsPage;