interface TextBoxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function TextBox({
  placeholder,
  label,
  value,
  onChange,
  type = "text",
}: TextBoxProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm">{label}</label>}
      <input
        className="bg-bg-secondary border-border rounded-lg border px-4 py-4"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
