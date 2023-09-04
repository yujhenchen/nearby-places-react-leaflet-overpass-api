type Props = {
  isSelected: boolean;
  distance: number;
  name: string;
  opening_hours: string;
};

export default function PlaceCard({
  isSelected,
  distance,
  name,
  opening_hours,
}: Props) {
  return (
    <div
      className={
        isSelected
          ? "w-52 h-full aspect-[4/3] rounded-lg flex flex-col space-y-1 scale-110 bg-gray-100 px-4 py-2 text-xs lg:text-sm lg:w-full lg:h-40 shadow-lg lg:overflow-y-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:duration-300"
          : "w-52 h-full aspect-[4/3] rounded-lg flex flex-col space-y-1 bg-gray-100 px-4 py-2 text-xs lg:text-sm lg:w-full lg:h-40 hover:shadow-lg duration-300 lg:overflow-y-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:duration-300"
      }
    >
      <span>{name}</span>
      <span>
        <b>Distance:</b> {distance} km
      </span>
      <span>
        <b>Opening Hours:</b> {opening_hours}
      </span>
    </div>
  );
}
