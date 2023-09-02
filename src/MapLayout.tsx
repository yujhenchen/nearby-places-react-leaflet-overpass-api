import CurrentLocationButton from "./CurrentLocationButton";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapLayout() {
  return (
    <div className="w-screen h-screen ">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      <div className="fixed w-14 aspect-square flex items-center place-content-center bottom-64 right-8 lg:bottom-24 lg:right-24 backdrop-blur shadow-lg p-2 rounded-full">
        <CurrentLocationButton />
      </div>
    </div>
  );
}
