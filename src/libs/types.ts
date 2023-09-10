import { PositionType } from "./enums";

export type GeoPosition = {
    lat: number;
    lon: number;
}

export type MapState = {
    flyToPositionType: PositionType;
    position: GeoPosition;
    setPosition: (position: GeoPosition) => void;
    setFlyToPositionType: (flyToType: PositionType) => void;
}

export type PlaceNodeTags = {
    amenity: string;
    name: string;
    opening_hours: string;
    phone: string;
    website: string;
}

export type PlaceNode = {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: PlaceNodeTags;
}

export type MarkerIconProps = {
    imagePath: string;
    backgroundColor: string;
}

export type NavButtonProps = {
    onClick: () => void;
    imgSrc: string;
    imgAlt: string;
    text: string;
}


export type ChangePositionButtonProps = {
    onClick: (positionType: PositionType) => void;
    imgPath: string;
    imgAlt: string;
    title: string;
}
