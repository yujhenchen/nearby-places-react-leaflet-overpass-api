import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import CurrentLocationIcon from "./CurrentLocationIcon";
import { fetchPlaces } from "./api/overpass";
import Navigation from "./Navigation";
import { GeoPosition } from "./libs/types";
import { Category, PositionType } from "./libs/enums";
import { defaultPosition } from "./libs/constants";
import NavLocationButton from "./NavLocationButton";
import DefaultLocationIcon from "./DefaultLocationIcon";
import MapMarker from "./MapMarker";
// import useMapStore from "./store/useMapStore";

type Props = {
  toPositionType: PositionType;
  targetPosition: GeoPosition;
};

function LocationMarker({ toPositionType, targetPosition }: Props) {
  const [position, setPosition] = useState<LatLng | null>(null);

  const [toPosition, setToPosition] = useState<PositionType>(
    PositionType.default
  );

  const map = useMap();

  useEffect(() => {
    setToPosition(toPositionType);
  }, [toPositionType]);

  useEffect(() => {
    if (toPosition === PositionType.userCurrent) {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        //   const radius = e.accuracy;
        //   const circle = L.circle(e.latlng, radius);
        //   circle.addTo(map);
        //   setBbox(e.bounds.toBBoxString().split(","));
      });
    } else if (toPosition === PositionType.newPosition && targetPosition) {
      map.flyTo([targetPosition.lat, targetPosition.lon], map.getZoom());
    } else {
      map.flyTo([defaultPosition.lat, defaultPosition.lon], map.getZoom());
    }
  }, [map, toPosition]);

  return position === null ? null : (
    <MapMarker
      position={{ lat: position.lat, lon: position.lng }}
      text={"You are here"}
    />
  );
}

export default function MapLayout() {
  const [toPositionType, setToPositionType] = useState<PositionType>(
    PositionType.default
  );

  const [position, setPosition] = useState<GeoPosition>(defaultPosition);

  // const [storePosition, setStorePosition] = useMapStore((state) => [
  //   state.position,
  //   state.setPosition,
  // ]);

  // useEffect(() => {
  //   setPosition(storePosition);
  // }, []);

  // useEffect(() => {
  //   setStorePosition(position);
  // }, [position]);

  return (
    <div className="w-screen h-screen ">
      <MapContainer
        center={[position.lat, position.lon]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapMarker
          position={{ lat: position.lat, lon: position.lon }}
          text={"You are here"}
        />

        <LocationMarker
          toPositionType={toPositionType}
          targetPosition={position}
        />
        <ZoomControl position="topright" />
      </MapContainer>

      <div className="fixed flex flex-col space-y-4 bottom-64 right-8 lg:bottom-24 lg:right-24">
        <NavLocationButton
          onClick={() => {
            setToPositionType(PositionType.default);
            setPosition(defaultPosition);
          }}
          iconElement={<DefaultLocationIcon />}
        />

        <NavLocationButton
          onClick={() => setToPositionType(PositionType.userCurrent)}
          iconElement={<CurrentLocationIcon />}
        />
      </div>

      <Navigation
        onClickRestaurants={async () => {
          const response = await fetchPlaces(Category.restaurant, position);
          console.log(JSON.stringify(response));
        }}
      />
    </div>
  );
}
