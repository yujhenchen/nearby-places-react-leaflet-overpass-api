import { useState } from "react";
import PlaceCard from "./PlaceCard";
import { GeoPosition, PlaceNode } from "./libs/types";
import { distance } from "./libs/utils";

type Props = {
  currentPosition: GeoPosition;
  places: PlaceNode[];
  selectedPosition: GeoPosition | null;
};

export default function PlaceContainer({
  currentPosition,
  places,
  selectedPosition,
}: Props) {
  const [showDetailsCards, setShowDetailsCards] = useState<string[]>([]);

  if (places.length > 0) {
    return (
      <section
        className={`${
          showDetailsCards.length > 0 ? "h-96 lg:w-96" : "h-40 lg:w-56"
        } fixed flex flex-nowrap w-screen bottom-3 left-0 lg:left-3 lg:top-0 lg:bottom-auto lg:h-screen backdrop-blur lg:inline-block items-end p-4 space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-scroll overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-scroll scrollbar-none scrollbar-thumb-gray-600`}
      >
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            onShowDetails={(id) =>
              setShowDetailsCards((cards) => {
                if (cards.indexOf(id, 0) > -1) {
                  return [...cards];
                } else {
                  return [...cards, id];
                }
              })
            }
            onCloseDetails={(id) => {
              setShowDetailsCards((cards) => {
                const index = cards.indexOf(id, 0);
                if (index > -1) {
                  cards = cards.splice(index, 1);
                }
                return cards;
              });
            }}
            isSelected={
              selectedPosition !== null &&
              selectedPosition.lat === place.lat &&
              selectedPosition.lon === place.lon
            }
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
      </section>
    );
  } else {
    return null;
  }
}
