interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-primary font-600 text-xm w-full cursor-pointer rounded-lg py-4"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
