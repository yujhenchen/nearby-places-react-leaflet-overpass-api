import { Category, CategoryKey, PositionType } from "./enums";

export type GeoPosition = {
    lat: number;
    lon: number;
}

export type MapState = {
    flyToPositionType: PositionType;
    position: GeoPosition;
    markerIconProps: MarkerIconProps;
    setPosition: (position: GeoPosition) => void;
    setFlyToPositionType: (flyToType: PositionType) => void;
    setMarkerIconProps: (iconProps: MarkerIconProps) => void;
}

export type MapCategoryState = {
    categoryKey: CategoryKey;
    category: Category;
    setCategoryKey: (key: CategoryKey) => void;
    setCategory: (category: Category) => void;
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

export type NavigationProps = {
    categoryKey: CategoryKey;
    category: Category;
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
