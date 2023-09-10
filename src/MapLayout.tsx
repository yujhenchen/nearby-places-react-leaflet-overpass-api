import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { fetchPlaces } from "./api/overpass";
import Navigation from "./Navigation";
import {
  ChangePositionButtonProps,
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
import MapMarker from "./MapMarker";
import PlaceContainer from "./PlaceContainer";
import CustomMapMarker from "./CustomMapMarker";
import useMapStore from "./store/useMapStore";
import { LeafletMouseEvent } from "leaflet";
import Loading from "./Loading";
import ChangePositionContainer from "./ChangePositionContainer";

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

  useEffect(() => {
    if (flyToPositionType === PositionType.userCurrent) {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, map.getZoom());
        setPosition({ lat: e.latlng.lat, lon: e.latlng.lng });
        setStorePosition({ lat: e.latlng.lat, lon: e.latlng.lng });
      });
    } else if (flyToPositionType === PositionType.default) {
      map.flyTo([defaultPosition.lat, defaultPosition.lon], map.getZoom());
      setPosition(defaultPosition);
      setStorePosition(defaultPosition);
    }
  }, [map, flyToPositionType]);

  useMapEvents({
    click(event) {
      map.flyTo([event.latlng.lat, event.latlng.lng], map.getZoom());
      setPosition({ lat: event.latlng.lat, lon: event.latlng.lng });
      setStorePosition({ lat: event.latlng.lat, lon: event.latlng.lng });
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

  const [places, setPlaces] = useState<PlaceNode[]>([]);

  const [showLoading, setShowLoading] = useState(false);

  const [storePosition, storeFlyToPositionType, setStoreFlyToPositionType] =
    useMapStore((state) => [
      state.position,
      state.flyToPositionType,
      state.setFlyToPositionType,
    ]);

  const [selectedPosition, setSelectedPosition] = useState<GeoPosition | null>(
    null
  );

  const [markerIconProps, setMarkerIconProps] = useState<MarkerIconProps>(
    markerIconPropsDict[Category.restaurant]
  );

  // const [showTipToast, setShowTipToast] = useState(true);

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
    // {
    //   onClick: () => onClickPlaceCategory(CategoryKey.amenity, Category.bbq),
    //   imgSrc: "./bbq.svg",
    //   imgAlt: "BBQ Icon",
    //   text: "BBQs",
    // },
    {
      onClick: () =>
        onClickPlaceCategory(CategoryKey.attraction, Category.animal),
      imgSrc: "./animal.svg",
      imgAlt: "Animal Icon",
      text: "Animals",
    },
  ];

  const changePositionButtonProps: ChangePositionButtonProps[] = [
    {
      onClick: () => {
        setPlaces([]);
        setFlyToPositionType(PositionType.default);
        setStoreFlyToPositionType(PositionType.default);
      },
      imgPath: "./sweden.svg",
      imgAlt: "Sweden Icon",
      title: "Go to Sweden",
    },
    {
      onClick: () => {
        setPlaces([]);
        setFlyToPositionType(PositionType.userCurrent);
        setStoreFlyToPositionType(PositionType.userCurrent);
      },
      imgPath: "./current.svg",
      imgAlt: "Current Location Icon",
      title: "Go to current",
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

        <LocationMarker flyToPositionType={flyToPositionType} />
        <ZoomControl position="topright" />
      </MapContainer>

      <ChangePositionContainer buttonProps={changePositionButtonProps} />

      <Navigation buttonProps={navButtonProps} />

      <PlaceContainer
        currentPosition={position}
        places={places}
        selectedPosition={selectedPosition}
        onclickCard={(position) => setSelectedPosition(position)}
      />

      {showLoading ? <Loading /> : null}

      {/* {showTipToast ? (
        <Toast
          text="Double-click on the map to explore a new location"
          onClick={(showToast) => setShowTipToast(showToast)}
        />
      ) : null} */}
    </div>
  );
}
