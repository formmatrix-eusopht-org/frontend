export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <label className={`flex items-start gap-2 text-[12px] ${className} ${disabled ? "opacity-50" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="accent-blue-600 mt-1"
      />
      <span className="leading-tight">{label}</span>
    </label>
  );
}
