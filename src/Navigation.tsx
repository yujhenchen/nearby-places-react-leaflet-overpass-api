type Props = {
  onClickRestaurants: () => void;
};

export default function Navigation({ onClickRestaurants }: Props) {
  return (
    <nav className="fixed top-2 w-content mx-12 h-20 flex box-border items-center px-8 lg:px-56 place-content-start">
      <button
        type="button"
        className="text-gray-900 w-fit shadow-lg flex space-x-2 items-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={onClickRestaurants}
      >
        <div className="flex items-center place-content-center w-8">
          <img
            src={"./restaurant.svg"}
            alt="Restaurant Icon"
            className="w-full h-full object-contain"
          />
        </div>
        <span>Restaurants</span>
      </button>
    </nav>
  );
}
