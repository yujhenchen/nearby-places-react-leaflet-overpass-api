type Props = {
  iconPath: string;
  iconAlt: string;
  title: string;
  onClick: () => void;
};

export default function GoToPositionButton({
  iconPath,
  iconAlt,
  title,
  onClick,
}: Props) {
  return (
    <button
      className="w-10 aspect-square flex items-center place-content-center bg-gray-100 p-2 rounded-full shadow-lg"
      onClick={onClick}
    >
      <img
        src={iconPath}
        alt={iconAlt}
        title={title}
        className="w-full h-full object-contain"
      />
    </button>
  );
}
