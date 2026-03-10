import { useEffect } from "react";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";
import RadioButton from "../Components/RadioButton";
import { states } from "../Data/statesData";

interface Block {
  fields: Array<{
    label: string;
    type: string;
    placeholder?: string;
  }>;
  ownersNumber?: number;
}

interface NewRegisteredOwnerDetailsProps {
  title: string;
  block: Block;
  newOwnerCount: number;
  onNewOwnerCountChange: (count: number) => void;
  newOwnerData: Record<number, Record<string, string>>;
  onNewOwnerFieldChange: (ownerIndex: number, label: string, value: string) => void;
  NewOwnershipTypes: Record<number, string>;
  onNewOwnershipChange: (ownerIndex: number, value: string) => void;
  isVehicleIsAGift: boolean;
  isMotorcycle: boolean;
  isTRAILERCOACH: boolean;
  isDisabledPersonPlacards?: boolean;
}

export const NewRegisteredOwnerDetails = ({
  title,
  block,
  newOwnerCount,
  onNewOwnerCountChange,
  newOwnerData,
  onNewOwnerFieldChange,
  NewOwnershipTypes,
  onNewOwnershipChange,
  isVehicleIsAGift,
  isMotorcycle,
  isTRAILERCOACH,
  isDisabledPersonPlacards = false,
}: NewRegisteredOwnerDetailsProps) => {
  const registeredOwnerNumbers = block.ownersNumber;
  const RadioButtonValues = [
    { label: "AND", value: "and" },
    { label: "OR", value: "or" },
  ];

  const filterFields = (fields: Block['fields'], ownerIndex: number) => {
    return fields.filter(field => {
      // Common filters for all owners
      if (!isMotorcycle && field.label === "Motorcycle Engine Number") return false;
      if (!isTRAILERCOACH && (field.label === "Length (IN)" || field.label === "Width (IN)")) return false;
      if (field.label === "Date of Sale" && ownerIndex !== 0) return false;

      // Date of Birth: only show for Owner 1 (index 0) when Disabled Person Placards/Plates is checked
      if (field.label === "Date of Birth") {
        if (!isDisabledPersonPlacards) return false;  // hide when flag is off
        if (ownerIndex !== 0) return false;           // only Owner 1
      }

      // Special filters for 2nd and 3rd owners
      if (ownerIndex > 0) {
        const excludedFields = [
          "Market Value",
          "Relationship with Gifter",
          "Gift Value",
          "Purchase Price/Value"
        ];
        if (excludedFields.includes(field.label)) return false;
      }

      // Gift/purchase specific filters for first owner
      if (ownerIndex === 0) {
        if (!isVehicleIsAGift && ["Market Value", "Relationship with Gifter", "Gift Value"].includes(field.label)) {
          return false;
        }
        if (isVehicleIsAGift && field.label === "Purchase Price/Value") {
          return false;
        }
      }

      return true;
    });
  };

  return (
    <div className="pb-4">
      <Section
        title={title}
        subSection={true}
        dropdownValue={newOwnerCount}
        onDropdownChange={onNewOwnerCountChange}
        numberForFields={registeredOwnerNumbers}
      >
        {[...Array(newOwnerCount)].map((_, ownerIndex) => (
          <div key={ownerIndex} className="mb-6">
            {ownerIndex > 0 ? (
              <div className="flex gap-4 mb-4 items-center">
                <h4 className="font-medium">New Registered Owner {ownerIndex + 1}</h4>
                {RadioButtonValues.map((radio) => (
                  <RadioButton
                    key={radio.value}
                    label={radio.label}
                    className=""
                    name={`ownershipType-${ownerIndex}`}
                    value={radio.value}
                    checked={NewOwnershipTypes[ownerIndex] === radio.value}
                    onChange={(val) => onNewOwnershipChange(ownerIndex, val)}
                  />
                ))}
              </div>
            ) : (
              <h4 className="font-medium mb-1">New Registered Owner {ownerIndex + 1}</h4>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filterFields(block.fields, ownerIndex).map((
                field: { label: string; type: string; placeholder?: string },
                index: number
              ) => (
                <Input
                  key={`${ownerIndex}-${index}`}
                  label={field.label}
                  type={field.type as "text" | "phone" | "date" | "dropdown"}
                  placeholder={field.placeholder}
                  options={field.type === "dropdown" ? states : []}
                  value={newOwnerData?.[ownerIndex]?.[field.label] || ""}
                  onChange={(val: string) =>
                    onNewOwnerFieldChange(ownerIndex, field.label, val)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
};