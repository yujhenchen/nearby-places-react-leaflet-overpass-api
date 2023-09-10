import { useState } from "react";
import PlaceCard from "./PlaceCard";
import { GeoPosition, PlaceNode } from "./libs/types";
import { distance, getCurrentDimension } from "./libs/utils";
import { largeScreenMinWidth } from "./libs/constants";

type Props = {
  currentPosition: GeoPosition;
  places: PlaceNode[];
  selectedPosition: GeoPosition | null;
  onclickCard: (position: GeoPosition) => void;
};

export default function PlaceContainer({
  currentPosition,
  places,
  selectedPosition,
  onclickCard,
}: Props) {
  const [showDetailsCards, setShowDetailsCards] = useState<string[]>([]);

  const [showStart, setShowStart] = useState(false);

  const [showEnd, setShowEnd] = useState(true);

  const onShowDetails = (id: string): void => {
    setShowDetailsCards((cards) =>
      cards.find((cardId) => id === cardId) ? [...cards] : [...cards, id]
    );
  };

  const onCloseDetails = (id: string): void => {
    setShowDetailsCards((cards) => cards.filter((cardId) => id !== cardId));
  };

  return places.length > 0 ? (
    <>
      <div
        className={`${
          showDetailsCards.length > 0 ? "h-96 lg:w-96" : "h-40 lg:w-56"
        } fixed flex flex-nowrap w-screen bottom-3 left-0 lg:left-3 lg:top-0 lg:bottom-auto lg:h-screen backdrop-blur lg:inline-block items-end p-4 space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-scroll overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-scroll scrollbar-none scrollbar-thumb-gray-600`}
        onScroll={(event) => {
          const target = event.target as HTMLElement;
          const isLargeScreen =
            getCurrentDimension().width >= largeScreenMinWidth;

          const isEnd: boolean = isLargeScreen
            ? target.scrollHeight - target.scrollTop === target.clientHeight
            : target.scrollLeft === target.scrollWidth;

          const isStart: boolean = isLargeScreen
            ? target.scrollTop === 0
            : target.scrollLeft === 0;

          if (isEnd) {
            setShowStart(true);
            setShowEnd(false);
          } else if (isStart) {
            setShowStart(false);
            setShowEnd(true);
          } else {
            setShowStart(true);
            setShowEnd(true);
          }
        }}
      >
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            onclickCard={onclickCard}
            onShowDetails={onShowDetails}
            onCloseDetails={onCloseDetails}
            isSelected={
              selectedPosition !== null &&
              selectedPosition.lat === place.lat &&
              selectedPosition.lon === place.lon
            }
            position={{ lat: place.lat, lon: place.lon }}
            distance={distance(
              currentPosition.lat,
              currentPosition.lon,
              place.lat,
              place.lon
            )}
            id={place.id.toString()}
            name={place.tags.name}
            opening_hours={place.tags.opening_hours}
            phone={place.tags.phone}
            website={place.tags.website}
          />
        ))}
      </div>
      <div
        className={`${
          showStart ? "" : "hidden"
        } h-40 fixed w-10 bottom-3 left-0 lg:w-56 lg:left-3 lg:top-0 lg:h-8 bg-gradient-to-r lg:bg-gradient-to-b from-gray-300`}
      ></div>
      <div
        className={`${
          showEnd ? "" : "hidden"
        } h-40 fixed w-8 bottom-3 right-0 lg:w-56 lg:left-3 lg:right-3 lg:bottom-0 lg:h-8 bg-gradient-to-l lg:bg-gradient-to-t from-gray-300`}
      ></div>
    </>
  ) : null;
}
