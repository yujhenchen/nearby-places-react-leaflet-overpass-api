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
    if (toPositionType === PositionType.userCurrent) {
      map.locate().on("locationfound", function (e) {
        setPosition({ lat: e.latlng.lat, lon: e.latlng.lng });
        map.flyTo(e.latlng, map.getZoom());
      });
    } else if (toPositionType === PositionType.newPosition && targetPosition) {
      map.flyTo([targetPosition.lat, targetPosition.lon], map.getZoom());
    } else {
      map.flyTo([defaultPosition.lat, defaultPosition.lon], map.getZoom());
    }
  }, [map, toPositionType]);

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

  const [places, setPlaces] = useState<PlaceNode[]>([]);

  const [storePosition, setStorePosition] = useMapStore((state) => [
    state.position,
    state.setPosition,
  ]);

  const [selectedPosition, setSelectedPosition] = useState<GeoPosition | null>(
    null
  );

  useEffect(() => {
    setPosition(storePosition);
  }, [storePosition]);

  useEffect(() => {
    setStorePosition(position);
  }, [position]);

  const onClickCustomMapMarker = (event: LeafletMouseEvent): void => {
    setSelectedPosition({ lat: event.latlng.lat, lon: event.latlng.lng });
  };

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

        {places.map((place) => (
          <CustomMapMarker
            key={place.id}
            isCardSelected={
              selectedPosition !== null &&
              selectedPosition.lat === place.lat &&
              selectedPosition.lon === place.lon
                ? true
                : false
            }
            position={{ lat: place.lat, lon: place.lon }}
            imagePath="./restaurant.svg"
            text={place.tags.name}
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
            setPlaces([]);
            setToPositionType(PositionType.default);
            setPosition(defaultPosition);
          }}
          iconPath="./sweden.svg"
          iconAlt="Sweden Icon"
        />

        <NavLocationButton
          onClick={() => {
            setPlaces([]);
            setToPositionType(PositionType.userCurrent);
          }}
          iconPath="./current.svg"
          iconAlt="Current Location Icon"
        />
      </div>

      <Navigation
        onClickRestaurants={async () => {
          const places: PlaceNode[] = await fetchPlaces(
            Category.restaurant,
            position
          );
          setPlaces(places.slice(0, displayedPlaceCount));
        }}
      />

      <PlaceContainer
        currentPosition={position}
        places={places}
        selectedPosition={selectedPosition}
        onclickCard={(position) => setSelectedPosition(position)}
      />
    </div>
  );
}
