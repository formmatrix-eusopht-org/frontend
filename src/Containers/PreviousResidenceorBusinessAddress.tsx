import React from "react";
import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";
import { states } from "../Data/statesData";

interface Field {
  label: string;
  type: "text" | "phone" | "date" | "dropdown" | "datepicker";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface Block {
  blockName: string;
  fields: Field[];
}

interface PreviousResidenceorBusinessAddressProps {
  title: string;
  block: Block;
  values: Record<string, string | boolean>;
  onFieldChange: React.Dispatch<React.SetStateAction<Record<string, string | boolean>>>;
}

const PreviousResidenceorBusinessAddress: React.FC<PreviousResidenceorBusinessAddressProps> = ({
  title,
  block,
  values,
  onFieldChange,
}) => {
  const handleChange = (label: string, val: string) => {
    onFieldChange((prev) => ({
      ...prev,
      [label]: val,
    }));
  };

  return (
    <div className="pb-4">
      <Section title={title}>
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {block.fields.map((field) => {
              // Ensure value is a string
              const fieldValue = typeof values[field.label] === "boolean"
                ? String(values[field.label])
                : (values[field.label] as string) || "";

              return (
                <Input
                  key={field.label}
                  label={field.label}
                  type={field.type}
                  options={field.type === "dropdown" ? states : []}
                  value={fieldValue}
                  placeholder={field.placeholder || ""}
                  onChange={(val) => handleChange(field.label, val)}
                />
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PreviousResidenceorBusinessAddress;
