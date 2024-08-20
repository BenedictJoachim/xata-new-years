import { Link } from "@remix-run/react";
import { useLoaderData, json } from 'react-router-dom';
import { createClient } from "@libsql/client";


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
  const turso = createClient({
    url: 'libsql://bjn-year-resolutions-benedictjoachim.turso.io',
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  try {
    const { rows } = await turso.execute(`
        SELECT r.id, r.resolution, r.year
        FROM resolutions r;
      `);

    return json({ items: rows });
  } catch (error) {
    console.error('Error fetching resolutions:', error);
    throw new Error('Failed to fetch resolutions');
  }
}

const ResolutionsPage = () => {
    const loaderData = useLoaderData();
    const { items } = loaderData as LoaderData;
  return (
    <ul>
      <ul>
      {items.map((resolution) => (
        <li key={resolution.id}>
          <Link to={`/resolutions/${resolution.id}`}>
            {resolution.resolution} ({resolution.year})
          </Link>
        </li>
      ))}
    </ul>
    </ul>
  );
};

export default ResolutionsPage;