import React from "react";

export default function Navigation() {
  return (
    <nav className="fixed top-4 w-screen h-20 flex items-center px-8 lg:px-64 place-content-start bg-gray-300">
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Restaurants
      </button>
    </nav>
  );
}
