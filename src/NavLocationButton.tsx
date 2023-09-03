type Props = {
  iconElement: React.ReactNode;
  onClick: () => void;
};

export default function NavLocationButton({ iconElement, onClick }: Props) {
  return (
    <button
      className="w-14 aspect-square flex items-center place-content-center bg-white p-2 rounded-full shadow-lg"
      onClick={onClick}
    >
      {iconElement}
    </button>
  );
}
