import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "utils/auth.server";
import Drawer from "./components/Drawer";

// Root loader to fetch user data
export async function loader({ request }: LoaderFunctionArgs) {
  const loggedInUser = await authenticator.isAuthenticated(request);
  console.log(loggedInUser);
  
  return json({ loggedInUser });
}

export async function action({request}: ActionFunctionArgs){
  const formData = await request.formData();
  const action = formData.get('action');
  if(action === 'logout')
  return await authenticator.logout(request, {redirectTo: "/login"});
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
      <header>
          <div className="flex items-center justify-between lg:border-b lg:border-gray-800 sm:pt-2 lg:pt-2 lg:pb-5">
            <p className="text-sm uppercase lg:text-lg">
              <span className="text-gray-500 font-semibold">the</span>
              <span className="font-bold text-gray-200">Resolutions</span>
            </p>
            <div className="text-sm font-medium text-gray-500 hover:text-gray-200">
              {loggedInUser
              ? <Form method="post">
                        <button
                            type="submit"
                            name="action"
                            value="logout"
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                </Form>
              : <Link to={"/login"} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Log in</Link>
              }
            </div>
          </div>
          {loggedInUser?.email === 'ben@qwert.com' && <Drawer />}
          <div className="my-20 lg:my-28">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tighter text-white lg:text-7xl">
                <Link to="/">New Year Resolutions</Link>
              </h1>
              <p className="mt-2 tracking-tight text-gray-500 lg:mt-4 lg:text-2xl">The Finish line: Goals that you plan to reach this year.</p>
            </div>
          </div>
        </header>
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
