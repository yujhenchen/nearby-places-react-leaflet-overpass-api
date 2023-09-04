import { useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import { fetchPlaces } from "./api/overpass";
import Navigation from "./Navigation";
import { GeoPosition, PlaceNode } from "./libs/types";
import { Category, PositionType } from "./libs/enums";
import {
  YOU_ARE_HERE,
  defaultPosition,
  displayedPlaceCount,
} from "./libs/constants";
import NavLocationButton from "./NavLocationButton";
import MapMarker from "./MapMarker";
import PlaceContainer from "./PlaceContainer";
import CustomMapMarker from "./CustomMapMarker";
import useMapStore from "./store/useMapStore";
import { LeafletMouseEvent } from "leaflet";

type Props = {
  toPositionType: PositionType;
  targetPosition: GeoPosition;
};

function LocationMarker({ toPositionType, targetPosition }: Props) {
  const [position, setPosition] = useState<GeoPosition>(defaultPosition);

  const [toPosition, setToPosition] = useState<PositionType>(
    PositionType.default
  );

  const [storePosition, setStorePosition] = useMapStore((state) => [
    state.position,
    state.setPosition,
  ]);

  useEffect(() => {
    setPosition(storePosition);
  }, []);

  useEffect(() => {
    setStorePosition(position);
  }, [position]);

  const map = useMap();

  useEffect(() => {
    setToPosition(toPositionType);
  }, [toPositionType]);

  useEffect(() => {
    if (toPosition === PositionType.userCurrent) {
      map.locate().on("locationfound", function (e) {
        setPosition({ lat: e.latlng.lat, lon: e.latlng.lng });
        map.flyTo(e.latlng, map.getZoom());
      });
    } else if (toPosition === PositionType.newPosition && targetPosition) {
      map.flyTo([targetPosition.lat, targetPosition.lon], map.getZoom());
    } else {
      map.flyTo([defaultPosition.lat, defaultPosition.lon], map.getZoom());
    }
  }, [map, toPosition]);

  return position === null ? null : (
    <MapMarker
      position={{ lat: position.lat, lon: position.lon }}
      text={YOU_ARE_HERE}
    />
  );
}

export default function MapLayout() {
  const [toPositionType, setToPositionType] = useState<PositionType>(
    PositionType.default
  );

  const [position, setPosition] = useState<GeoPosition>(defaultPosition);

  const [restaurants, setRestaurants] = useState<PlaceNode[]>([]);

  const [storePosition, setStorePosition] = useMapStore((state) => [
    state.position,
    state.setPosition,
  ]);

  const [selectedPosition, setSelectedPosition] = useState<GeoPosition | null>(
    null
  );

  const [selectedCardId, setSelectedCardId] = useState<string>("");

  useEffect(() => {
    setPosition(storePosition);
  }, [storePosition]);

  useEffect(() => {
    setStorePosition(position);
  }, [position]);

  function onClickCustomMapMarker(event: LeafletMouseEvent): void {
    setSelectedPosition({ lat: event.latlng.lat, lon: event.latlng.lng });
  }

  return (
    <div className="w-screen h-screen">
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

        {restaurants.map((restaurant) => (
          <CustomMapMarker
            key={restaurant.id}
            isCardSelected={
              selectedCardId === restaurant.id.toString() ? true : false
            }
            position={{ lat: restaurant.lat, lon: restaurant.lon }}
            imagePath="./restaurant.svg"
            text={restaurant.tags.name}
            backgroundColor="bg-orange-300"
            onClickMarker={onClickCustomMapMarker}
          />
        ))}

        <LocationMarker
          toPositionType={toPositionType}
          targetPosition={position}
        />
        <ZoomControl position="topright" />
      </MapContainer>

      <div className="fixed flex flex-col space-y-4 bottom-64 right-8 lg:bottom-24 lg:right-24">
        <NavLocationButton
          onClick={() => {
            setRestaurants([]);
            setToPositionType(PositionType.default);
            setPosition(defaultPosition);
          }}
          iconPath="./sweden.svg"
          iconAlt="Sweden Icon"
        />

        <NavLocationButton
          onClick={() => {
            setRestaurants([]);
            setToPositionType(PositionType.userCurrent);
          }}
          iconPath="./current.svg"
          iconAlt="Current Location Icon"
        />
      </div>

      <Navigation
        onClickRestaurants={async () => {
          const restaurants: PlaceNode[] = await fetchPlaces(
            Category.restaurant,
            position
          );
          setRestaurants(restaurants.slice(0, displayedPlaceCount));
        }}
      />

      <PlaceContainer
        currentPosition={position}
        places={restaurants}
        selectedPosition={selectedPosition}
        onclickCard={(id) => setSelectedCardId(id)}
      />
    </div>
  );
}
