type Props = {
  distance: number;
  name: string;
  opening_hours: string;
};

export default function PlaceCard({ distance, name, opening_hours }: Props) {
  return (
    <div className="w-full h-full lg:h-auto aspect-square flex flex-col space-y-2 bg-gray-200">
      <span>
        <b>Distance:</b> {distance} km
      </span>
      <span>
        <b>Name:</b> {name}
      </span>
      <span>
        <b>Opening Hours:</b> {opening_hours}
      </span>
    </div>
  );
}
