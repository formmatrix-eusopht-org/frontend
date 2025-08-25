type RadioButtonProps = {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void; // standard radio change
  className: string
};

export default function RadioButton({
  label,
  name,
  value,
  checked,
  onChange,
  className
}: RadioButtonProps) {
  return (
    <label className={`inline-flex items-center space-x-2 cursor-pointer  ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="form-radio text-blue-600 "
      />
      <span className=" text-gray-700">{label}</span>
    </label>
  );
}
