import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";
import { states } from "../Data/statesData";

interface Field {
  label: string;
  type: "text" | "phone" | "date" | "dropdown";
  placeholder?: string;
  options?: any[];
  value?: string | boolean;
}

interface SubOption {
  label: string;
  type: "checkbox";
  value?: boolean;
  subFields?: Field[]; // ✅ RENAMED
}

interface FormBlock {
  reference?: string;
  blockName: string;
  subOption?: SubOption[];
  fields?: Field[];
  subFields?: Field[];
}

interface Props {
  block: FormBlock;
  formState: Record<string, string | boolean>;
  mailingAddress: Record<string, string>;
  isMailingDifferent: boolean;
  onFieldChange: (label: string, value: string | boolean) => void;
  onMailingFieldChange: (label: string, value: string) => void;
  onToggleMailingAddress: (isDifferent: boolean) => void;
}

export const NewLienHolder = ({
  block,
  formState,
  mailingAddress,
  isMailingDifferent,
  onFieldChange,
  onMailingFieldChange,
  onToggleMailingAddress,
}: Props) => {
  const fields = block.fields || [];
  const subFields = block.subOption?.[0]?.subFields || []; // ✅ RENAMED
  // Map subOption to radio options
  const radioOptions = block.subOption?.map((opt) => ({
    label: opt.label,
    value: opt.label.toLowerCase().replace(/\s+/g, "-"),
  })) || [];

  const selectedRadio = isMailingDifferent ? radioOptions[0]?.value : null;

  return (
    <div className="pb-4">
      <Section
        title={block.blockName}
        subSection={true}
        allowToggle={true}
        useStyledRadio={true}
        radioOptions={[{ label: "Mailing address is different", value: "mailing-different" }]}
        selectedOptions={isMailingDifferent ? ["mailing-different"] : []}
        onToggleOption={() => onToggleMailingAddress(!isMailingDifferent)}
      >

        {/* Primary Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <Input
              key={field.label}
              label={field.label}
              type={field.label === "ELT Number (3 digits)" ? "numeric" : field.type}
              maxLength={field.label === "ELT Number (3 digits)" ? 3 : undefined}
              placeholder={field.placeholder ?? ""}
              value={formState[field.label] as string}
              onChange={(val) => onFieldChange(field.label, val)}
              options={field.options || (field.type === "dropdown" ? states : [])}
            />
          ))}
        </div>
      </Section>

      {/* Mailing address fields only shown if user toggled them on */}
      {isMailingDifferent && (
        <Section title="Lienholder Mailing Address" subSection={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subFields.map((field: Field) => (
              <Input
                key={`mailing-${field.label}`}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder ?? ""}
                value={mailingAddress[field.label] || ""}
                onChange={(val) => onMailingFieldChange(field.label, val)}
                options={field.options || (field.type === "dropdown" ? states : [])}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};
