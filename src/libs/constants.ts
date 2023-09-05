import { Category } from "./enums";
import { GeoPosition, MarkerIconProps } from "./types";

export const defaultPosition: GeoPosition = { lat: 59.3285, lon: 18.0782 };

export const YOU_ARE_HERE = "You are here";

export const displayedPlaceCount = 10;

export const markerIconPropsDict: { [key: string]: MarkerIconProps } = {
    [Category.restaurant]: { imagePath: './restaurant.svg', backgroundColor: 'bg-orange-300' },
    [Category.library]: { imagePath: './library.svg', backgroundColor: 'bg-blue-300' }
};
