export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur flex items-center place-content-center">
      <div className="px-3 py-1 text-base font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        loading...
      </div>
    </div>
  );
}
