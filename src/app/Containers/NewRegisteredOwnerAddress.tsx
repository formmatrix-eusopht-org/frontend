import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";
import { states } from "../Data/statesData";

type AddressProps = {
  title: string;
  block: any;
  newOwnerAddress: Record<string, string>;
  newOwnerMailingAddress: Record<string, string>;
  newOwnerLesseeAddress: Record<string, string>;
  newOwnerKeptAddress: Record<string, string>;
  selectedOptions: string[]; // Multiple options
  onToggleOption: (val: string) => void;
  onAddressChange: (
    section: "residential" | "mailing" | "lessee" | "kept",
    label: string,
    value: string
  ) => void;
};

const normalizeKey = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-");

export const NewRegisteredOwnerAddress = ({
  title,
  block,
  newOwnerAddress,
  newOwnerMailingAddress,
  newOwnerLesseeAddress,
  newOwnerKeptAddress,
  selectedOptions,
  onToggleOption,
  onAddressChange,
}: AddressProps) => {
  const addressFields = block.fields || [];

  const radioOptions = block.subOptions?.map((opt: any) => ({
    label: opt.label,
    value: normalizeKey(opt.label),
  })) || [];

  const addressMap: Record<string, { sectionKey: "mailing" | "lessee" | "kept"; data: Record<string, string> }> = {
    [normalizeKey("If mailing address is different")]: {
      sectionKey: "mailing",
      data: newOwnerMailingAddress,
    },
    [normalizeKey("If lessee address is different")]: {
      sectionKey: "lessee",
      data: newOwnerLesseeAddress,
    },
    [normalizeKey("Trailer/Vessel location")]: {
      sectionKey: "kept",
      data: newOwnerKeptAddress,
    },
  };

  return (
    <div className="pb-4">
      <Section
        title={title}
        subSection={true}
        radioOptions={radioOptions}
        selectedOptions={selectedOptions}
        onToggleOption={onToggleOption}
        allowToggle={true}
        useStyledRadio={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {addressFields.map((field: any) => (
            <Input
              key={field.label}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type === "dropdown" ? "dropdown" :
                    field.type === "phone" ? "phone" : "text"}
              options={field.type === "dropdown" ? states : []}
              value={newOwnerAddress[field.label] || ""}
              onChange={(val) => onAddressChange("residential", field.label, val)}
            />
          ))}
        </div>
      </Section>

      {/* Dynamically Render Sub Address Sections */}
      {block.subOptions?.map((option: any) => {
        const key = normalizeKey(option.label);
        const isVisible = selectedOptions.includes(key);
        const mapped = addressMap[key];

        if (!isVisible || !mapped) return null;

        return (
          <Section key={key} title={option.fieldName} subSection={true}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {option.subFields.map((field: any) => (
                <Input
                  key={`${key}-${field.label}`}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={
                    field.type === "dropdown"
                      ? "dropdown"
                      : field.type === "phone"
                        ? "phone"
                        : "text"
                  }
                  options={field.type === "dropdown" ? states : []}
                  value={mapped.data[field.label] || ""}
                  onChange={(val) =>
                    onAddressChange(
                      mapped.sectionKey,
                      field.label,
                      val
                    )
                  }
                />
              ))}
            </div>
          </Section>
        );
      })}
    </div>
  );
};
