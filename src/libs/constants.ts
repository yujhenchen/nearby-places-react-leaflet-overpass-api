import { Category } from "./enums";
import { GeoPosition, MarkerIconProps } from "./types";

export const defaultPosition: GeoPosition = { lat: 59.3285, lon: 18.0782 };

export const YOU_ARE_HERE = "You are here";

export const THIS_IS_A_SECRET_PLACE = "This is a secret place :)";

export const displayedPlaceCount = 10;

export const markerIconPropsDict: { [key: string]: MarkerIconProps } = {
    [Category.restaurant]: { imagePath: './restaurant.svg', backgroundColor: 'bg-orange-300' },
    [Category.library]: { imagePath: './library.svg', backgroundColor: 'bg-blue-300' },
    [Category.bbq]: { imagePath: './bbq.svg', backgroundColor: 'bg-yellow-300' },
    [Category.animal]: { imagePath: './animal.svg', backgroundColor: 'bg-pink-300' },
};
