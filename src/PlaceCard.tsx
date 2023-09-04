type Props = {
  isSelected: boolean;
  distance: number;
  name: string;
  opening_hours: string;
  phone: string;
  website: string;
};

export default function PlaceCard({
  isSelected,
  distance,
  name,
  opening_hours,
  phone,
  website,
}: Props) {
  return (
    <div
      data-tooltip-target="tooltip-light"
      data-tooltip-style="light"
      className={
        isSelected
          ? "relative h-32 aspect-[4/3] rounded-lg flex flex-col space-y-1 scale-110 bg-gray-100 px-4 py-2 text-sm shadow-lg duration-300"
          : "relative h-32 aspect-[4/3] rounded-lg flex flex-col space-y-1 bg-gray-100 px-4 py-2 text-sm hover:shadow-lg duration-300"
      }
    >
      <span className="text-base">{name}</span>
      <span>
        <b>Distance:</b> {distance} km
      </span>

      <div className="absolute right-0 bottom-full lg:left-40 lg:top-0 z-10 h-56 lg:h-fit w-48 overflow-x-auto overflow-y-auto rounded-lg flex flex-col space-y-1 bg-gray-100 px-4 py-2 text-sm shadow-xl duration-300">
        <span>
          <b>Opening Hours:</b> {opening_hours}
        </span>

        <span>
          <b>Phone:</b> {phone}
        </span>

        <span>
          <b>Website:</b> {website}
        </span>
      </div>
    </div>
  );
}
