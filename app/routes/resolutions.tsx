import { useLoaderData, json, Link } from "@remix-run/react";
import { sql } from "lib/neon.server";


interface Resolution {
    id: number;
    resolution: string;
    isComplete: boolean;
    year: number;
    user_id: number;
  }

  interface LoaderData {
    items: Resolution[];
  }



export async function loader() {
    try {
      const rows = await sql(`SELECT * FROM resolution`);
      return rows;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const ResolutionsPage = () => {
    const resolutions = useLoaderData<typeof loader>();
  return (

<ul>
  <ul>
  {resolutions.map((resolution) => (
    <li key={resolution.id}>
      <Link to={`/resolutions/${resolution.id}`}>
        {resolution.resolution} ({resolution.year})
      </Link>
    </li>
  ))}
</ul>
</ul>)
};

export default ResolutionsPage;