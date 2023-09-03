import PlaceCard from "./PlaceCard";
import { GeoPosition, PlaceNode } from "./libs/types";
import { distance } from "./libs/utils";

type Props = {
  currentPosition: GeoPosition;
  places: PlaceNode[];
};

export default function PlaceContainer({ currentPosition, places }: Props) {
  return (
    <section className="fixed flex flex-nowrap w-screen h-48 bottom-2 left-0 lg:top-0 lg:bottom-auto lg:w-48 lg:h-screen backdrop-blur lg:inline-block items-center p-4 space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-scroll overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 ">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          distance={distance(
            currentPosition.lat,
            currentPosition.lon,
            place.lat,
            place.lon
          )}
          name={place.tags.name}
          opening_hours={place.tags.opening_hours}
        />
      ))}
    </section>
  );
}
