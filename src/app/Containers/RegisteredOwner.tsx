import React from "react";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";
import { states } from "../Data/statesData";

type RegisteredOwnerProps = {
  title: string;
  block: any;
  ownerCount: number;
  onOwnerCountChange: (count: number) => void;
  ownersData: Record<string, string>[];
  onFieldChange: (index: number, label: string, value: string) => void;
};

export const RegisteredOwnerDetails = ({
  title,
  block,
  ownerCount,
  onOwnerCountChange,
  ownersData,
  onFieldChange,
}: RegisteredOwnerProps) => {
  const registeredOwnerNumbers = block.ownersNumber;
  const registeredOwnerFields = block.fields
  return (
    <div className="pb-4">
      <Section
        title={title}
        subSection={true}
        dropdownValue={ownerCount}
        onDropdownChange={onOwnerCountChange}
        numberForFields={registeredOwnerNumbers}
      >
        {[...Array(ownerCount)].map((_, ownerIndex) => (
          <div key={ownerIndex} className="mb-6">
            <h4 className="font-medium mb-1">Registered Owner {ownerIndex + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {registeredOwnerFields
                .filter((field: { label: string; type: string; placeholder?: string }) => (field.label !== "Date of Sale" || ownerIndex === 0) && (field.label !== "Agent Name"))
                .map((field: { label: string; type: string; placeholder?: string }, index: number) => (
                  <Input
                    key={`${ownerIndex}-${index}`}
                    label={field.label}
                    type={field.type as "text" | "phone" | "date" | "dropdown"}
                    placeholder={field.placeholder}
                    options={states.map(({ label, value }) => ({ label: label, value }))}
                    value={ownersData[ownerIndex]?.[field.label] || ""}
                    onChange={(val) => { onFieldChange(ownerIndex, field.label, val) }}
                  />
                ))}

            </div>
          </div>
        ))}
        {registeredOwnerFields.find((f: { label: string; type: string; placeholder?: string }) => f.label === "Agent Name") && (
          <Input
            label="Agent Name"
            placeholder="Agent Name"
            type="text"
            value={ownersData[0]?.["Agent Name"] || ""}
            onChange={(val) => onFieldChange(0, "Agent Name", val)}
          />
        )}
      </Section>
      {block.commonFields && (
        <div className=" px-2">
          <Input
            label={block.commonFields.label}
            placeholder={block.commonFields.placeholder}
            type="text"
            value={ownersData[0]?.[block.commonFields.label] || ""}
            onChange={(val) =>
              onFieldChange(0, block.commonFields.label, val)
            }
          />
        </div>
      )}


    </div>
  );
};
