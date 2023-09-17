import { Marker, Popup } from "react-leaflet";
import { GeoPosition } from "../libs/types";
import { renderToStaticMarkup } from "react-dom/server";
import { LeafletMouseEvent, divIcon } from "leaflet";
import { THIS_IS_A_SECRET_PLACE } from "../libs/constants";

type Props = {
  isCardSelected: boolean;
  position: GeoPosition;
  text: string;
  imagePath: string;
  backgroundColor: string;
  onClickMarker: (event: LeafletMouseEvent) => void;
};

export default function CustomMapMarker({
  isCardSelected,
  position,
  text,
  imagePath,
  backgroundColor,
  onClickMarker,
}: Props) {
  const iconMarkup = renderToStaticMarkup(
    <div
      className={`flex items-center place-content-center rounded-full p-1 -translate-y-2 -translate-x-2 ${backgroundColor} ${
        isCardSelected ? "w-12 shadow-lg" : "w-8 shadow-md"
      }`}
    >
      <img
        src={imagePath}
        alt={text}
        className="w-full h-full object-contain"
      />
    </div>
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });

  return (
    <Marker
      position={[position.lat, position.lon]}
      icon={customMarkerIcon}
      eventHandlers={{
        click: (e) => {
          onClickMarker(e);
        },
      }}
    >
      <Popup>
        {!text || text.trim().length < 0 ? THIS_IS_A_SECRET_PLACE : text}
      </Popup>
    </Marker>
  );
}
