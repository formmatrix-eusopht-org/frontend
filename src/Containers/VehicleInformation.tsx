import React from "react";
import Checkbox from "../Components/CheckBox";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";

type Field = {
  label: string;
  type: "input field" | "checkbox" | "dropdown";
  placeholder?: string;
  value?: string | boolean;
  options?: { value: string; name: string }[]; // for dropdowns
};

type Block = {
  blockName: string;
  fields: Field[];
};

type VehicleInformationProps = {
  title: string;
  block: Block;
  onFieldChange: (label: string, value: string | boolean) => void;
};

export const VehicleInformationDetails = ({
  title,
  block,
  onFieldChange,
}: VehicleInformationProps) => {
  return (
    <div className="pb-4">
      <Section title={title}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {block.fields.map((field, index) => {
            if (field.type === "input field" || field.type === "dropdown") {
              return (
                <Input
                  key={index}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type === "dropdown" ? "dropdown" : "text"}
                  value={field.value as string}
                  onChange={(val) => onFieldChange(field.label, val)}
                  options={
                    field.options
                      ? field.options.map(({ value, name }) => ({
                          value,
                          label: name,
                        }))
                      : undefined
                  }
                />
              );
            }

            if (field.type === "checkbox") {
              return (
                <Checkbox
                  key={index}
                  label={field.label}
                  className=""
                  checked={field.value as boolean}
                  onChange={() =>
                    onFieldChange(field.label, !(field.value as boolean))
                  }
                />
              );
            }

            return null;
          })}
        </div>
      </Section>
    </div>
  );
};
