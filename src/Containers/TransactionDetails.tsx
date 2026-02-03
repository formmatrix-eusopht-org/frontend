import Checkbox from "../Components/CheckBox";
import Section from "../Components/FieldSection";

type Field = {
  label: string;
  type: string;
  placeholder?: string;
};

type Block = {
  blockName: string;
  fields: Field[];
};

type TransactionProps = {
  title: string;
  block: Block;
  senerio: Array<any>;
  selectedItems: string[];
  onChange: (label: string, checked: boolean) => void;
};

export const TransactionDetails = ({
  title,
  block,
  senerio,
  selectedItems,
  onChange,
}: TransactionProps) => {
  // Determine if we should disable checkboxes
  const isGiftSelected = selectedItems.includes("Vehicle is a Gift");
  const isFamilyTransferSelected = selectedItems.includes("Family Transfer");
  const shouldHideWithTitle =
    senerio.includes("Simple Transfer") || senerio.includes("Multiple Transfer") && (senerio.includes("Add Lienholder") || senerio.includes("Remove Lienholder"));
  const filteredFields = shouldHideWithTitle
    ? block.fields.filter((field) => field.label !== "With Title")
    : block.fields;

  return (
    <div className="pb-4">
      <Section title={title}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredFields.map((field, index) => {
            // Disable Family Transfer if Vehicle is a Gift is selected
            const shouldDisableFamilyTransfer =
              field.label === "Family Transfer" && isGiftSelected;

            // Disable Vehicle is a Gift if Family Transfer is selected
            const shouldDisableGift =
              field.label === "Vehicle is a Gift" && isFamilyTransferSelected;

            return (
              <Checkbox
                key={index}
                label={field.label}
                className="tracking-tight"
                checked={selectedItems.includes(field.label)}
                onChange={() => {
                  // If trying to select a disabled option, do nothing
                  if (shouldDisableFamilyTransfer || shouldDisableGift || (senerio.includes("Multiple Transfer") && (
                    (field.label === "Smog Exemption" && isFamilyTransferSelected) ||
                    (field.label === "Family Transfer" && selectedItems.includes("Smog Exemption"))
                  ))) return;
                  onChange(field.label, !selectedItems.includes(field.label));
                }}
                disabled={shouldDisableFamilyTransfer || shouldDisableGift ||
                  (senerio.includes("Multiple Transfer") && (
                    (field.label === "Smog Exemption" && isFamilyTransferSelected) ||
                    (field.label === "Family Transfer" && selectedItems.includes("Smog Exemption"))
                  ))
                }
              />
            );
          })}
        </div>
      </Section>
    </div>
  );
};