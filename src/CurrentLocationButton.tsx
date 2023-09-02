import React from "react";

export default function CurrentLocationButton() {
  return (
    <button className="w-full h-full flex items-center place-content-center">
      <svg
        // width="512"
        // height="512"
        className="w-full aspect-square"
        viewBox="0 0 15 15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="#6b7280"
          stroke-linecap="square"
          d="M7.5.5v14m7-7.005H.5m13 0a6.006 6.006 0 0 1-6 6.005c-3.313 0-6-2.694-6-6.005a5.999 5.999 0 0 1 6-5.996a6 6 0 0 1 6 5.996Z"
        />
      </svg>
    </button>
  );
}
