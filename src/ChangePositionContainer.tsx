import ChangePositionButton from "./ChangePositionButton";
import { PositionType } from "./libs/enums";
import { ChangePositionButtonProps } from "./libs/types";

type Props = {
  buttonProps: ChangePositionButtonProps[];
};

export default function ChangePositionContainer({ buttonProps }: Props) {
  return (
    <div className="fixed flex flex-col space-y-4 bottom-64 right-8 lg:bottom-24 lg:right-24">
      {buttonProps.map((buttonProp) => (
        <ChangePositionButton
          key={buttonProp.imgAlt}
          onClick={() => buttonProp.onClick(PositionType.default)}
          iconPath={buttonProp.imgPath}
          iconAlt={buttonProp.imgAlt}
          title={buttonProp.title}
        />
      ))}
    </div>
  );
}
