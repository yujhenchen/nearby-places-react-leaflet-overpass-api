import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import CurrentLocationIcon from "./CurrentLocationIcon";
import { fetchPlaces } from "./api/overpass";
import Navigation from "./Navigation";
import { GeoPosition } from "./types";
import { Category } from "./enums";
import { defaultGeoPosition } from "./constants";
import NavLocationButton from "./NavLocationButton";
import DefaultLocationIcon from "./DefaultLocationIcon";

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

  const [geoPosition, setGeoPosition] =
    useState<GeoPosition>(defaultGeoPosition);

  useEffect(() => {
    setGeoPosition(defaultGeoPosition);
  }, []);

  return (
    <div className="w-screen h-screen ">
      <MapContainer
        center={[defaultGeoPosition.lat, defaultGeoPosition.lon]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[defaultGeoPosition.lat, defaultGeoPosition.lon]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <LocationMarker goToCurrentPosition={goToCurrentPosition} />
        <ZoomControl position="topright" />
      </MapContainer>

      <div className="fixed flex flex-col space-y-4 bottom-64 right-8 lg:bottom-24 lg:right-24">
        <NavLocationButton
          onClick={() => setGoToCurrentPosition(false)}
          iconElement={<DefaultLocationIcon />}
        />

        <NavLocationButton
          onClick={() => setGoToCurrentPosition(true)}
          iconElement={<CurrentLocationIcon />}
        />
      </div>

      <Navigation
        onClickRestaurants={async () => {
          const response = await fetchPlaces(Category.restaurant, geoPosition);
          console.log(JSON.stringify(response));
        }}
      />
    </div>
  );
}
