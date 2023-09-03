import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
// import CurrentLocationButton from "./CurrentLocationButton";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  //   useMapEvents,
} from "react-leaflet";
import CurrentLocationIcon from "./CurrentLocationIcon";

type Props = {
  goToCurrentPosition: boolean;
};

function LocationMarker({ goToCurrentPosition }: Props) {
  const [position, setPosition] = useState<LatLng | null>(null);

  const [goToCurrent, setGoToCurrent] = useState(false);

  const map = useMap();

  useEffect(() => {
    setGoToCurrent(goToCurrentPosition);
  }, [goToCurrentPosition]);

  useEffect(() => {
    if (goToCurrent) {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        //   const radius = e.accuracy;
        //   const circle = L.circle(e.latlng, radius);
        //   circle.addTo(map);
        //   setBbox(e.bounds.toBBoxString().split(","));
      });
    }
  }, [map, goToCurrent]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function MapLayout() {
  const [goToCurrentPosition, setGoToCurrentPosition] = useState(false);

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

        <LocationMarker goToCurrentPosition={goToCurrentPosition} />
      </MapContainer>

      <button
        // className="fixed w-14 aspect-square flex items-center place-content-center bottom-64 right-8 lg:bottom-24 lg:right-24 bg-white p-2 rounded-full"
        className="fixed w-14 aspect-square flex items-center place-content-center bottom-64 right-8 lg:right-24 bg-white p-2 rounded-full"
        onClick={() => setGoToCurrentPosition(true)}
      >
        <CurrentLocationIcon />
      </button>
    </div>
  );
}
