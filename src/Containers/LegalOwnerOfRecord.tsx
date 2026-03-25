import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";
import { states } from "../Data/statesData";

type Field = {
  label: string;
  type: "text" | "phone" | "date" | "dropdown";
  placeholder?: string;
  options?: any[];
};

type SubOption = {
  label: string;
  fieldName: string;
  subFields: Field[];
};

type FormBlock = {
  blockName: string;
  fields?: Field[];
  subOptions?: SubOption[];
};

interface Props {
  block: FormBlock;
  legalOwnerAddress: Record<string, string>;
  isOutofStateTitle: Boolean;
  legalOwnerMailingAddress: Record<string, string>;
  showMailingCheckbox?: boolean;  //!added
  selectedRadio: string[];
  senerio: string[];
  onToggleOption: (val: string) => void;
  onAddressChange: (
    section: "residential" | "mailing",
    label: string,
    value: string
  ) => void;
}

const normalizeKey = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-");

export const LegalOwnerOfRecord = ({
  block,
  legalOwnerAddress,
  legalOwnerMailingAddress,
  selectedRadio,
  onToggleOption,
  onAddressChange,
  isOutofStateTitle,
  senerio,
  showMailingCheckbox = false  //! Add this with default false
}: Props) => {
  const fields = block?.fields || [];

  // Filter subOptions based on showMailingCheckbox prop
  // const filteredSubOptions = block?.subOptions?.filter((opt) => {
  //   // Only show "If mailing address is different" option if showMailingCheckbox is true
  //   if (opt?.label === "If mailing address is different") {
  //     return showMailingCheckbox;
  //   }
  //   // For any other subOptions, always show them (if any exist)
  //   return true;
  // }) || [];
  // With this:
  const mailingSubOption = {
    label: "If mailing address is different",
    fieldName: "Mailing Address",
    subFields: [
      { label: 'Street', type: "input field" as const, placeholder: 'Street' },
      { label: 'APT./SPACE/STE.#', type: "input field" as const, placeholder: 'APT./SPACE/STE.#' },
      { label: 'City', type: "input field" as const, placeholder: 'City' },
      { label: 'State', type: "dropdown" as const, placeholder: 'Select' },
      { label: 'ZIP Code', type: "input field" as const, placeholder: 'ZIP Code' },
    ]
  };

  const filteredSubOptions = showMailingCheckbox
    ? [mailingSubOption, ...(block?.subOptions?.filter(opt => opt?.label !== "If mailing address is different") || [])]
    : (block?.subOptions?.filter(opt => opt?.label !== "If mailing address is different") || []);


  const radioOptions = filteredSubOptions?.map((opt) => ({
    label: opt?.label,
    value: normalizeKey(opt?.label),
  })) || [];

  const addressMap: Record<
    string,
    { sectionKey: "mailing"; data: Record<string, string> }
  > = {
    [normalizeKey("If mailing address is different")]: {
      sectionKey: "mailing",
      data: legalOwnerMailingAddress,
    },
  };

  const isCommercialVehicle = senerio?.includes("Commercial Vehicle");

  return (
    <div className="pb-4">
      <Section
        title={block?.blockName}
        subSection={true}
        radioOptions={radioOptions}
        selectedOptions={selectedRadio}
        onToggleOption={onToggleOption}
        allowToggle={true}
        useStyledRadio={true}
      >
        {/* First field - Full width */}
        {fields?.[0] && (
          <div className="mb-4">
            <Input
              key={fields[0]?.label}
              label={fields[0]?.label}
              type={
                fields[0]?.type
              }
              placeholder={fields[0]?.placeholder ?? ""}
              options={fields[0]?.type === "dropdown" ? states : []}
              value={legalOwnerAddress?.[fields[0]?.label] || ""}
              onChange={(val) =>
                onAddressChange("residential", fields[0]?.label, val)
              }
            />
          </div>
        )}

        {/* Remaining fields - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {fields?.filter(field => isCommercialVehicle ? true : (isOutofStateTitle || field.label !== "ELT Number (3 digits)"))?.slice(1).map((field) => (
            <Input
              key={field?.label}
              label={field?.label}
              type={field.type}
              maxLength={field.label === "ELT Number (3 digits)" ? 3 : undefined}
              placeholder={field?.placeholder ?? ""}
              options={field?.type === "dropdown" ? states : []}
              value={legalOwnerAddress?.[field?.label] || ""}
              onChange={(val) =>
                onAddressChange("residential", field?.label, val)
              }
            />
          ))}
        </div>
      </Section>


      {/* Mailing Address (Conditional Sub Section) */}
      {filteredSubOptions?.map((option) => {
        const key = normalizeKey(option?.label);
        const isVisible = selectedRadio?.includes(key);
        const mapped = addressMap[key];

        if (!isVisible || !mapped) return null;

        return (
          <Section key={key} title={option?.fieldName} subSection={true}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {option?.subFields?.map((field) => (
                <Input
                  key={`${key}-${field?.label}`}
                  label={field?.label}
                  placeholder={field?.placeholder}
                  type={
                    field?.type === "dropdown"
                      ? "dropdown"
                      : field?.type === "phone"
                        ? "phone"
                        : "text"
                  }
                  options={field?.type === "dropdown" ? states : []}
                  value={mapped?.data?.[field?.label] || ""}
                  onChange={(val) =>
                    onAddressChange(mapped?.sectionKey, field?.label, val)
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