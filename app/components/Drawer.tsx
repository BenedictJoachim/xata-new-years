import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        {isOpen ? "Close Drawer" : "Open Drawer"}
      </button>

      <div
        className={`fixed inset-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-800 bg-opacity-75`}
      >
        <div className="relative w-64 bg-white h-full shadow-xl">
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 text-gray-600"
          >
            &times;
          </button>
          <div className="p-4">
            <h2 className="text-xl font-bold text-blue-500">
            <Link to="/users">
                users
              </Link>
            </h2>
            <p className="mt-2">Add your drawer content here.</p>
          </div>
        </div>
      </div>
    </>
  );
}
