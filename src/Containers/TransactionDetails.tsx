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
  disabledItems?: string[]; // <-- add this
};

export const TransactionDetails = ({
  title,
  block,
  senerio,
  selectedItems,
  onChange,
  disabledItems = [],
}: TransactionProps) => {
  const isGiftSelected = selectedItems.includes("Vehicle is a Gift");
  const isFamilyTransferSelected = selectedItems.includes("Family Transfer");

  // NEW: Motorcycle <-> Commercial Vehicle mutual exclusivity
  const isMotorcycleSelected = selectedItems.includes("Is the Vehicle a Motorcycle");
  const isCommercialSelected = selectedItems.includes("Commercial Vehicle(BUS/LIMO/TAXI)");

  const shouldHideWithTitle =
    senerio.includes("Simple Transfer") || senerio.includes("Multiple Transfer") && (senerio.includes("Add Lienholder") || senerio.includes("Remove Lienholder"));
  const filteredFields = shouldHideWithTitle
    ? block.fields.filter((field) => field.label !== "With Title" || "Transaction with Vehicle Title")
    : block.fields;

  return (
    <div className="pb-4">
      <Section title={title}>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {filteredFields.map((field, index) => {
            const shouldDisableFamilyTransfer =
              field.label === "Family Transfer" && isGiftSelected;
            const shouldDisableGift =
              field.label === "Vehicle is a Gift" && isFamilyTransferSelected;

            // NEW: disable commercial if motorcycle selected, and vice versa
            const shouldDisableCommercial =
              field.label === "Commercial Vehicle(BUS/LIMO/TAXI)" && isMotorcycleSelected;
            const shouldDisableMotorcycle =
              field.label === "Is the Vehicle a Motorcycle" && isCommercialSelected;

            const isDisabledByParent = disabledItems.includes(field.label);

            const isDisabled =
              shouldDisableFamilyTransfer ||
              shouldDisableGift ||
              shouldDisableCommercial ||   // NEW
              shouldDisableMotorcycle ||   // NEW
              isDisabledByParent ||
              (senerio.includes("Multiple Transfer") &&
                ((field.label === "Smog Exemption" && isFamilyTransferSelected) ||
                  (field.label === "Family Transfer" && selectedItems.includes("Smog Exemption"))));

            return (
              <Checkbox
                key={index}
                label={field.label}
                className="tracking-tight whitespace-nowrap"
                checked={selectedItems.includes(field.label)}
                onChange={() => {
                  if (isDisabled) return;

                  onChange(field.label, !selectedItems.includes(field.label));

                  if (field.label === "Family Transfer") {
                    const isChecking = !selectedItems.includes("Family Transfer");
                    if (isChecking && !selectedItems.includes("Smog Exemption")) {
                      onChange("Smog Exemption", true);
                    }
                    if (!isChecking && selectedItems.includes("Smog Exemption")) {
                      onChange("Smog Exemption", false);
                    }
                  }
                }}
                disabled={isDisabled}
              />
            );
          })}
        </div>
      </Section>
    </div>
  );
};