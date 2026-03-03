type Option<T = string> = {
  value: T;
  name: string;
};

type SelectDropDownProps<T = string> = {
  value?: T;
  onChange?: (val: T) => void;
  placeholder: string;
  options?: Option<T>[];
};

export default function SelectDropDown<T extends string | number = string>({
  value,
  onChange,
  placeholder,
  options = [],
}: SelectDropDownProps<T>) {
  return (
    <select
      className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
      value={value ?? ''}
      onChange={(e) => {
        const selectedValue = e.target.value as T;
        onChange?.(selectedValue);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={String(opt.value)} value={opt.value}>
          {opt.name}
        </option>
      ))}
    </select>
  );
}
