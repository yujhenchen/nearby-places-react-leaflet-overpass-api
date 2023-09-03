import { Marker, Popup } from "react-leaflet";
import { GeoPosition } from "./libs/types";
import { renderToStaticMarkup } from "react-dom/server";
import { LeafletMouseEvent, divIcon } from "leaflet";

type Props = {
  position: GeoPosition;
  imagePath: string;
  text: string;
  backgroundColor: string;
  onClickMarker: (event: LeafletMouseEvent) => void;
};

export default function CustomMapMarker({
  position,
  imagePath,
  text,
  backgroundColor,
  onClickMarker,
}: Props) {
  const iconMarkup = renderToStaticMarkup(
    <div
      className={`flex items-center place-content-center w-8 shadow-md rounded-full p-1 ${backgroundColor}`}
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
      <Popup>{text}</Popup>
    </Marker>
  );
}
