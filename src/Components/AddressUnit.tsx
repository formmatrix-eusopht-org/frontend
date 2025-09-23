import React from "react";
import CustomDropdown from "./CustomDropDown";

type AddressUnitProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
};

const AddressUnit: React.FC<AddressUnitProps> = ({
  value,
  onChange,
  placeholder = "Unit number",
  className = "",
}) => {
  const options = ["APT", "SPACE", "STE.#", "UNIT"].map((opt) => ({
    label: opt,
    value: opt,
  }));

  // Split value into prefix + number
  const parseValue = (val: string) => {
    if (!val) return { prefix: "APT", number: "" };
    const [prefix, ...rest] = val.split(" ");
    return {
      prefix: options.some((o) => o.value === prefix) ? prefix : "APT",
      number: rest.join(" "),
    };
  };

  const { prefix, number } = parseValue(value);

  return (
    <div className={`flex w-full ${className}`}>
      {/* Dropdown (left side) */}
      <div className="w-28">
        <CustomDropdown
          value={prefix}
          onChange={(val) => onChange(`${val} ${number}`.trim())}
          options={options}
          className="rounded-l-md h-[37px] !px-2 text-[12px] !w-[80px]"
        />
      </div>

      {/* Input (right side) */}
      <input
        type="text"
        value={number}
        onChange={(e) => onChange(`${prefix} ${e.target.value}`.trim())}
        placeholder={placeholder}
        className="border border-gray-300 border-l-0 rounded-r-md px-3 py-2 text-sm max-w-[115px] text-center"
      />
    </div>
  );
};

export default AddressUnit;
