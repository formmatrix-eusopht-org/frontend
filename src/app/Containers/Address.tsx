import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";
import { states } from "../Data/statesData";

type AddressProps = {
  title: string;
  block: any;
  residentialAddress: Record<string, string>;
  mailingAddress: Record<string, string>;
  isMailingDifferent: boolean;
  onAddressChange: (section: "residential" | "mailing", label: string, value: string) => void;
  onToggleMailingAddress: (isDifferent: boolean) => void;
};

export const OwnerAddress = ({
  title,
  block,
  residentialAddress = {},
  mailingAddress = {},
  isMailingDifferent,
  onAddressChange,
  onToggleMailingAddress,
}: AddressProps) => {
  // Extract fields from the block data
  const addressFields = block.fields || [];
  const radioOptions = block.subOption?.map((opt: any) => ({
    label: opt.label,
    value: opt.label.toLowerCase().replace(/\s+/g, '-')
  })) || [];

  return (
    <div className="pb-4">
      <Section
        title={title}
        subSection={true}
        radioOptions={radioOptions}
        selectedOptions={isMailingDifferent ? [radioOptions[0]?.value] : []}
        onToggleOption={(val) => onToggleMailingAddress(val === radioOptions[0]?.value)}
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
              value={residentialAddress[field.label] || ""}
              onChange={(val) => onAddressChange("residential", field.label, val)}
            />
          ))}
        </div>
      </Section>

      {isMailingDifferent && (
        <Section title="Mailing Address" subSection={true}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {addressFields
              .filter((field: any) => field.label !== "County")
              .map((field: any) => (
                <Input
                  key={`mailing-${field.label}`}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={
                    field.type === "dropdown" ? "dropdown" :
                      field.type === "phone" ? "phone" : "text"
                  }
                  options={field.type === "dropdown" ? states : []}
                  value={mailingAddress[field.label] || ""}
                  onChange={(val) => onAddressChange("mailing", field.label, val)}
                />
              ))}

          </div>
        </Section>
      )}
    </div>
  );
};