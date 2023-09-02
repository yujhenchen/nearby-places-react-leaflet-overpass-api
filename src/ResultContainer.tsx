import React from "react";
import ResultCard from "./ResultCard";

export default function ResultContainer() {
  return (
    <section className="fixed flex flex-nowrap w-screen h-48 bottom-4 left-0 lg:left-4 lg:top-0 lg:bottom-auto lg:w-48 lg:h-screen bg-gray-500 lg:inline-block items-center p-4 space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-scroll overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100">
      {Array.from(Array(10).keys()).map((x) => (
        <ResultCard key={x} />
      ))}
    </section>
  );
}
