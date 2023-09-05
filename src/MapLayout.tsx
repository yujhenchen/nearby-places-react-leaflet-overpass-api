import { useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import { fetchPlaces } from "./api/overpass";
import Navigation from "./Navigation";
import {
  GeoPosition,
  MarkerIconProps,
  NavButtonProps,
  PlaceNode,
} from "./libs/types";
import { Category, CategoryKey, PositionType } from "./libs/enums";
import {
  YOU_ARE_HERE,
  defaultPosition,
  displayedPlaceCount,
  markerIconPropsDict,
} from "./libs/constants";
import NavLocationButton from "./NavLocationButton";
import MapMarker from "./MapMarker";
import PlaceContainer from "./PlaceContainer";
import CustomMapMarker from "./CustomMapMarker";
import useMapStore from "./store/useMapStore";
import { LeafletMouseEvent } from "leaflet";
import Loading from "./Loading";

type Props = {
  flyToPositionType: PositionType;
  flyToPosition: GeoPosition;
};

function LocationMarker({ flyToPositionType, flyToPosition }: Props) {
  const [setStorePosition] = useMapStore((state) => [state.setPosition]);

  const map = useMap();

  useEffect(() => {
    if (flyToPositionType === PositionType.userCurrent) {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, map.getZoom());
        setStorePosition({ lat: e.latlng.lat, lon: e.latlng.lng });
      });
    } else if (flyToPositionType === PositionType.newPosition) {
      map.flyTo([flyToPosition.lat, flyToPosition.lon], map.getZoom());
      setStorePosition({ lat: flyToPosition.lat, lon: flyToPosition.lon });
    }
  }, [map, flyToPositionType]);

  return flyToPosition === null ? null : (
    <MapMarker
      position={{ lat: flyToPosition.lat, lon: flyToPosition.lon }}
      text={YOU_ARE_HERE}
    />
  );
}

export default function MapLayout() {
  const [flyToPositionType, setFlyToPositionType] = useState<PositionType>(
    PositionType.newPosition
  );

  const [position, setPosition] = useState<GeoPosition>(defaultPosition);

  const [places, setPlaces] = useState<PlaceNode[]>([]);

  const [showLoading, setShowLoading] = useState(false);

  const [
    storePosition,
    storeFlyToPositionType,
    setStorePosition,
    setStoreFlyToPositionType,
  ] = useMapStore((state) => [
    state.position,
    state.flyToPositionType,
    state.setPosition,
    state.setFlyToPositionType,
  ]);

  const [selectedPosition, setSelectedPosition] = useState<GeoPosition | null>(
    null
  );

  const [markerIconProps, setMarkerIconProps] = useState<MarkerIconProps>(
    markerIconPropsDict[Category.restaurant]
  );

  useEffect(() => {
    setPosition(storePosition);
    setFlyToPositionType(storeFlyToPositionType);
  }, [storePosition, storeFlyToPositionType]);

  const onClickCustomMapMarker = (event: LeafletMouseEvent): void => {
    setSelectedPosition({ lat: event.latlng.lat, lon: event.latlng.lng });
  };

  const onClickPlaceCategory = async (
    categoryKey: CategoryKey,
    category: Category
  ) => {
    setShowLoading(true);
    const places: PlaceNode[] = await fetchPlaces(
      categoryKey,
      category,
      position
    );
    setPlaces(places.slice(0, displayedPlaceCount));
    setMarkerIconProps(markerIconPropsDict[category]);
    setShowLoading(false);
  };

  const navButtonProps: NavButtonProps[] = [
    {
      onClick: () =>
        onClickPlaceCategory(CategoryKey.amenity, Category.restaurant),
      imgSrc: "./restaurant.svg",
      imgAlt: "Restaurant Icon",
      text: "Restaurants",
    },
    {
      onClick: () =>
        onClickPlaceCategory(CategoryKey.amenity, Category.library),
      imgSrc: "./library.svg",
      imgAlt: "Library Icon",
      text: "Libraries",
    },
    {
      onClick: () => onClickPlaceCategory(CategoryKey.amenity, Category.bbq),
      imgSrc: "./bbq.svg",
      imgAlt: "BBQ Icon",
      text: "BBQs",
    },
    {
      onClick: () =>
        onClickPlaceCategory(CategoryKey.attraction, Category.animal),
      imgSrc: "./animal.svg",
      imgAlt: "Animal Icon",
      text: "Animals",
    },
  ];

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
            text={place.tags.name}
            imagePath={markerIconProps.imagePath}
            backgroundColor={markerIconProps.backgroundColor}
            onClickMarker={onClickCustomMapMarker}
          />
        ))}

        <LocationMarker
          flyToPositionType={flyToPositionType}
          flyToPosition={position}
        />
        <ZoomControl position="topright" />
      </MapContainer>

      <div className="fixed flex flex-col space-y-4 bottom-64 right-8 lg:bottom-24 lg:right-24">
        <NavLocationButton
          onClick={() => {
            setPlaces([]);
            setFlyToPositionType(PositionType.newPosition);
            setStoreFlyToPositionType(PositionType.newPosition);
            setPosition(defaultPosition);
            setStorePosition(defaultPosition);
          }}
          iconPath="./sweden.svg"
          iconAlt="Sweden Icon"
        />

        <NavLocationButton
          onClick={() => {
            setPlaces([]);
            setFlyToPositionType(PositionType.userCurrent);
            setStoreFlyToPositionType(PositionType.userCurrent);
          }}
          iconPath="./current.svg"
          iconAlt="Current Location Icon"
        />
      </div>

      <Navigation buttonProps={navButtonProps} />

      <PlaceContainer
        currentPosition={position}
        places={places}
        selectedPosition={selectedPosition}
        onclickCard={(position) => setSelectedPosition(position)}
      />

      {showLoading ? <Loading /> : null}
    </div>
  );
}
