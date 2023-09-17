import { PositionType } from "./libs/enums";
import { ChangePositionProps } from "./libs/types";

export const changePositionProps: ChangePositionProps[] = [
    {
        positionType: PositionType.default,
        imgPath: "./sweden.svg",
        imgAlt: "Sweden Icon",
        title: "Go to Sweden",
    },
    {
        positionType: PositionType.userCurrent,
        imgPath: "./current.svg",
        imgAlt: "Current Location Icon",
        title: "Go to current",
    },
];
