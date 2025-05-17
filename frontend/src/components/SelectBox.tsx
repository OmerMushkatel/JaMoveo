interface SelectBoxProps {
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export default function SelectBox({
  label,
  value,
  onChange,
  options,
  placeholder,
}: SelectBoxProps) {
  return (
    <div className="relative flex flex-col gap-2">
      {label && <label className="text-sm">{label}</label>}
      <div className="relative">
        <select
          className="bg-bg-secondary border-border w-full appearance-none rounded-lg border px-4 py-4 pr-10"
          value={value}
          onChange={onChange}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
