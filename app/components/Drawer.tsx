import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="p-2 mt-4 mb-4 absolute right-4 bg-blue-500 text-white rounded-full"
      >
        <span className="sr-only">Expand menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"   
         className="h-6 w-6 text-gray-800">
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>     
   </button>

      <div
        className={`fixed inset-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-gray-800 bg-opacity-75`}
        aria-hidden={!isOpen}
        aria-label="Drawer"
      >
        <div className="relative w-64 bg-gray-400 h-full shadow-xl pt-8">
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 text-gray-100 border border-gray-800 rounded-full"
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-6 w-6 text-gray-800">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
          </button>
          <div className="p-4">
            <h2 className="text-xl font-bold text-blue-500">
              <Link to="/users">Users</Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}