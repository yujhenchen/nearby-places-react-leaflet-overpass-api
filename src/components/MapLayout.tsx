import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { fetchPlaces } from "../api/overpass";
import Navigation from "./Navigation";
import { GeoPosition, MarkerIconProps } from "../libs/types";
import { Category, CategoryKey, PositionType } from "../libs/enums";
import {
  YOU_ARE_HERE,
  defaultPosition,
  displayedPlaceCount,
  markerIconPropsDict,
} from "../libs/constants";
import MapMarker from "./MapMarker";
import PlaceContainer from "./PlaceContainer";
import CustomMapMarker from "./CustomMapMarker";
import useMapStore from "../store/useMapStore";
import { LeafletMouseEvent } from "leaflet";
import Loading from "./Loading";
import ChangePositionContainer from "./ChangePositionContainer";
import { useQuery } from "@tanstack/react-query";
import useQueryStore from "../store/useQueryStore";

type Props = {
  flyToPositionType: PositionType;
};

function LocationMarker({ flyToPositionType }: Props) {
  const [storePosition, setStorePosition, setStoreFlyToPositionType] =
    useMapStore((state) => [
      state.position,
      state.setPosition,
      state.setFlyToPositionType,
    ]);

  const map = useMap();

  const [position, setPosition] = useState<GeoPosition>(defaultPosition);

  useEffect(() => {
    setPosition(storePosition);
    map.setView([storePosition.lat, storePosition.lon], map.getZoom());
  }, []);

  useEffect(() => {
    setStoreFlyToPositionType(PositionType.useStore);
  }, [storePosition]);

  const flyToPosition = (latitude: number, longitude: number): void => {
    map.flyTo([latitude, longitude], map.getZoom());
    setPosition({ lat: latitude, lon: longitude });
    setStorePosition({ lat: latitude, lon: longitude });
  };

  useEffect(() => {
    if (flyToPositionType === PositionType.userCurrent) {
      map.locate().on("locationfound", function (e) {
        flyToPosition(e.latlng.lat, e.latlng.lng);
      });
    } else if (flyToPositionType === PositionType.default) {
      flyToPosition(defaultPosition.lat, defaultPosition.lon);
    }
  }, [map, flyToPositionType]);

  useMapEvents({
    click(event) {
      flyToPosition(event.latlng.lat, event.latlng.lng);
    },
  });

  return position === null ? null : (
    <MapMarker
      position={{ lat: position.lat, lon: position.lon }}
      text={YOU_ARE_HERE}
    />
  );
}

export default function MapLayout() {
  const [flyToPositionType, setFlyToPositionType] = useState<PositionType>(
    PositionType.useStore
  );

  const [position, setPosition] = useState<GeoPosition>(defaultPosition);

  const [
    storeCategoryKey,
    storeCategory,
    setStoreCategoryKey,
    setStoreCategory,
  ] = useQueryStore((state) => [
    state.categoryKey,
    state.category,
    state.setCategoryKey,
    state.setCategory,
  ]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchedPlaces", storeCategoryKey, storeCategory, position],
    queryFn: () => fetchPlaces(storeCategoryKey, storeCategory, position),
    staleTime: 10000,
  });

  const toDisplayPlaces = useMemo(
    () => data?.slice(0, displayedPlaceCount),
    [data]
  );

  const [
    storePosition,
    storeFlyToPositionType,
    storeMarkerIconProps,
    setStoreFlyToPositionType,
    storeSetMarkerIconProps,
  ] = useMapStore((state) => [
    state.position,
    state.flyToPositionType,
    state.markerIconProps,
    state.setFlyToPositionType,
    state.setMarkerIconProps,
  ]);

  const [selectedPosition, setSelectedPosition] = useState<GeoPosition | null>(
    null
  );

  const [markerIconProps, setMarkerIconProps] = useState<MarkerIconProps>(
    markerIconPropsDict[Category.restaurant]
  );

  const cardRefs: React.MutableRefObject<HTMLDivElement[]> = useRef<
    HTMLDivElement[]
  >([]);

  useEffect(() => {
    setMarkerIconProps(storeMarkerIconProps);
  }, []);

  useEffect(() => {
    setPosition(storePosition);
    setFlyToPositionType(storeFlyToPositionType);
  }, [storePosition, storeFlyToPositionType]);

  const onClickCustomMapMarker = (event: LeafletMouseEvent): void => {
    setSelectedPosition({ lat: event.latlng.lat, lon: event.latlng.lng });
    // cardRefs.current[9].scrollIntoView();
  };

  const onClickCategory = (
    newCategoryKey: CategoryKey,
    newCategory: Category
  ): void => {
    setStoreCategoryKey(newCategoryKey);
    setStoreCategory(newCategory);

    const iconProps = markerIconPropsDict[newCategory];
    setMarkerIconProps(iconProps);
    storeSetMarkerIconProps(iconProps);
  };

  const onClickChangePosition = (positionType: PositionType): void => {
    setFlyToPositionType(positionType);
    setStoreFlyToPositionType(positionType);
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

        {toDisplayPlaces?.map((place) => (
          <CustomMapMarker
            key={place.id}
            isCardSelected={
              selectedPosition !== null &&
              selectedPosition.lat === place.lat &&
              selectedPosition.lon === place.lon
            }
            position={{ lat: place.lat, lon: place.lon }}
            text={place.tags.name}
            imagePath={markerIconProps.imagePath}
            backgroundColor={markerIconProps.backgroundColor}
            onClickMarker={onClickCustomMapMarker}
          />
        ))}

        <LocationMarker flyToPositionType={flyToPositionType} />
        <ZoomControl position="topright" />
      </MapContainer>

      <ChangePositionContainer onClickButton={onClickChangePosition} />

      <Navigation onClickCategory={onClickCategory} />

      <PlaceContainer
        cardRefs={cardRefs}
        currentPosition={position}
        places={toDisplayPlaces ?? []}
        selectedPosition={selectedPosition}
        onclickCard={(position) => setSelectedPosition(position)}
      />

      {isLoading ? <Loading /> : null}

      {error ? <>Cannot get places data, please try again later</> : null}
    </div>
  );
}
