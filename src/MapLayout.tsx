import React from "react";
import CurrentLocationButton from "./CurrentLocationButton";

export default function MapLayout() {
  return (
    <div className="w-screen h-screen bg-gray-200">
      <div className="fixed w-10 aspect-square flex items-center place-content-center bottom-64 right-8 lg:bottom-24 lg:right-24">
        <CurrentLocationButton />
      </div>
    </div>
  );
}
