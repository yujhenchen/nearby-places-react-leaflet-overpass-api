import { Category, CategoryKey } from "./libs/enums";
import { NavigationProps } from "./libs/types";

export const navigationProps: NavigationProps[] = [
    {
        categoryKey: CategoryKey.amenity,
        category: Category.restaurant,
        imgSrc: "./restaurant.svg",
        imgAlt: "Restaurant Icon",
        text: "Restaurants",
    },
    {
        categoryKey: CategoryKey.amenity,
        category: Category.library,
        imgSrc: "./library.svg",
        imgAlt: "Library Icon",
        text: "Libraries",
    },
    {
        categoryKey: CategoryKey.attraction,
        category: Category.animal,
        imgSrc: "./animal.svg",
        imgAlt: "Animal Icon",
        text: "Animals",
    },
];
