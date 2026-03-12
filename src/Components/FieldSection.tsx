import CustomDropdown from "./CustomDropDown";
import RadioButton from "./RadioButton";
import RadioStyleCheckBox from "./RadioStyleCheckBox";

export default function Section({
  title,
  children,
  subSection,
  dropdownValue,
  onDropdownChange,
  numberForFields,
  radioOptions,
  selectedOptions,
  onToggleOption,
  allowToggle = false,
  useStyledRadio = false,
}: {
  title: string | React.ReactNode;
  children: React.ReactNode;
  subSection?: boolean;
  dropdownValue?: number;
  onDropdownChange?: (val: number) => void;
  numberForFields?: number;
  radioOptions?: { label: string; value: string }[];
  selectedOptions?: string[];
  onToggleOption?: (val: string) => void;
  allowToggle?: boolean;
  useStyledRadio?: boolean;
}) {
  const RadioComponent = useStyledRadio ? RadioStyleCheckBox : RadioButton;

  const dropdownOptions = numberForFields
    ? Array.from({ length: numberForFields }, (_, i) => i + 1).map((num) => ({
      label: num.toString(),
      value: num.toString(),
      name: num.toString(),
      abbreviation: num.toString(),
    }))
    : [];

  return (
    <div className="mt-6">
      <div className="flex items-left gap-4 flex-wrap">
        <h3 className="font-semibold text-lg ">{title}</h3>

        {dropdownValue !== undefined && onDropdownChange && dropdownOptions.length > 0 && (
          <div className="w-[4rem]">
            <CustomDropdown
              value={(dropdownValue ?? 1).toString()} // Default to 1 if undefined
              onChange={(val) => onDropdownChange(Number(val))}
              placeholder="Select"
              options={dropdownOptions}
            />
          </div>
        )}

        {radioOptions?.map((opt) => (
          <RadioComponent
            key={opt.value}
            label={opt.label}
            name={typeof title === "string" ? title : ""}
            value={opt.value}
            checked={selectedOptions?.includes(opt.value) || false}
            onChange={() => {
              if (allowToggle && onToggleOption) {
                onToggleOption(opt.value);
              }
            }}
            className=""
          />
        ))}
      </div>

      <div className="space-y-2 mx-2">{children}</div>
    </div>
  );
}
