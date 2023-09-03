import ResultCard from "./ResultCard";

export default function ResultContainer() {
  return (
    <section className="fixed flex flex-nowrap w-screen h-48 bottom-2 left-0 lg:left-2 lg:top-0 lg:bottom-auto lg:w-48 lg:h-screen backdrop-blur lg:inline-block items-center p-4 space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-scroll overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 ">
      {Array.from(Array(20).keys()).map((x) => (
        <ResultCard key={x} />
      ))}
    </section>
  );
}
