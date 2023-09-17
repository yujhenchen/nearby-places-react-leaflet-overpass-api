import ChangePositionButton from "./ChangePositionButton";
import { changePositionProps } from "./ChangePositionProps";
import { PositionType } from "./libs/enums";

type Props = {
  onClickButton: (positionType: PositionType) => void;
};

export default function ChangePositionContainer({ onClickButton }: Props) {
  return (
    <div className="fixed flex flex-col space-y-4 bottom-64 right-8 lg:bottom-24 lg:right-24">
      {changePositionProps.map(({ positionType, imgPath, imgAlt, title }) => (
        <ChangePositionButton
          key={imgAlt}
          onClick={() => onClickButton(positionType)}
          iconPath={imgPath}
          iconAlt={imgAlt}
          title={title}
        />
      ))}
    </div>
  );
}
