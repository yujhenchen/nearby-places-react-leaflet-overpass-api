import { Marker, Popup } from "react-leaflet";
import { GeoPosition } from "../libs/types";

type Props = {
  position: GeoPosition;
  text: string;
};

export default function MapMarker({ position, text }: Props) {
  return (
    <Marker position={[position.lat, position.lon]}>
      <Popup>{text}</Popup>
    </Marker>
  );
}
