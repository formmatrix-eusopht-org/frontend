type RadioButtonProps = {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string | null) => void;
};

export default function RadioStyleCheckBox({
  label,
  name,
  value,
  checked,
  onChange,
}: RadioButtonProps) {
  const handleClick = () => {
    onChange(checked ? null : value);
  };

  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer">
      <span
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          checked ? "border-blue-600" : "border-gray-400"
        }`}
        onClick={handleClick}
      >
        {checked && <span className="w-2 h-2 bg-blue-600 rounded-full" />}
      </span>
      <span className="text-sm text-gray-700" onClick={handleClick}>
        {label}
      </span>
    </label>
  );
}
