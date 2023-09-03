type Props = {
  onClick: () => void;
};

export default function Navigation({ onClick }: Props) {
  return (
    <nav className="fixed top-2 w-screen mx-12 h-20 flex box-border items-center px-8 lg:px-56 place-content-start">
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={onClick}
      >
        <span>Restaurants</span>
      </button>
    </nav>
  );
}
