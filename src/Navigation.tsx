import { NavButtonProps } from "./libs/types";

type Props = {
  buttonProps: NavButtonProps[];
};

export default function Navigation({ buttonProps }: Props) {
  return (
    <nav className="fixed top-2 w-content mx-12 h-20 flex space-x-4 items-center box-border px-8 lg:px-56 place-content-start">
      {buttonProps.map((buttonProp, index) => (
        <button
          key={index}
          type="button"
          className="text-gray-900 w-fit shadow-lg flex space-x-1 items-center bg-gray-100 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={buttonProp.onClick}
        >
          <div className="flex items-center place-content-center w-6 md:w-8">
            <img
              src={buttonProp.imgSrc}
              alt={buttonProp.imgAlt}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="hidden md:flex items-center place-content-center text-sm">
            {buttonProp.text}
          </span>
        </button>
      ))}
    </nav>
  );
}
