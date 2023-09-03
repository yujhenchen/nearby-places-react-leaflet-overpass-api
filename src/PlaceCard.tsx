type Props = {
  distance: number;
  name: string;
  opening_hours: string;
};

export default function PlaceCard({ distance, name, opening_hours }: Props) {
  return (
    <div className="w-40 h-full aspect-square flex flex-col space-y-1 bg-gray-100 p-2 text-xs lg:text-sm lg:w-full lg:h-40 hover:shadow-lg duration-300 lg:overflow-y-hidden hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 hover:duration-300">
      <span>
        <b>Name:</b> {name}
      </span>
      <span>
        <b>Distance:</b> {distance} km
      </span>
      <span>
        <b>Opening Hours:</b> {opening_hours}
      </span>
    </div>
  );
}
