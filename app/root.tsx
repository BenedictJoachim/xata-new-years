import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "utils/auth.server";
import Drawer from "./components/Drawer";

// Root loader to fetch user data
export async function loader({ request }: LoaderFunctionArgs) {
  const loggedInUser = await authenticator.isAuthenticated(request);
  console.log(loggedInUser);
  
  return json({ loggedInUser });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-900 text-white">
            {loggedInUser?.email === 'ben@qwert.com' && <Drawer />}
            {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
