import Checkbox from "../Components/CheckBox";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";

type Field = {
  label: string;
  value: string;
};

type TheItemRequestedWasProps = {
  title: string;
  block: {
    blockName: string;
    fields: Field[];
  };
  checkedItems: string[];
  otherExplain: string;
  onCheckChange: (value: string) => void;
  onOtherExplainChange: (value: string) => void;
  plateCount: string[]; // <-- make sure you pass this
  onPlateCountChange: (value: string) => void; // <-- and this
};

export const TheItemRequestedWasBlock = ({
  title,
  block,
  checkedItems,
  otherExplain,
  onCheckChange,
  onOtherExplainChange,
  plateCount,
  onPlateCountChange,
}: TheItemRequestedWasProps) => {
  const isChecked = (val: string) => checkedItems?.includes(val);

  const getField = (val: string) => block.fields.find((f) => f.value === val);

  const renderBasicField = (val: string) => {
    const field = getField(val);
    if (!field) return null;
    return (
      <Checkbox
        label={field.label}
        checked={isChecked(field.value)}
        onChange={() => onCheckChange(field.value)}
        className="whitespace-normal text-[11px]"
      />
    );
  };

  return (
    <div className="pb-4">
      <Section
        title={
          <div className="flex items-center gap-2">
            <span>{title}</span>
            <span className="text-sm italic text-gray-500 font-normal">(Check appropriate box(es))</span>
          </div>
        }
      >
        <div className="flex flex-wrap items-start gap-x-6 gap-y-4 text-sm text-gray-700 mt-2">

          {renderBasicField("LOST")}
          {renderBasicField("STOLEN")}
          {renderBasicField("DESTROYED/MUTILATED")}

          {renderBasicField("NOT RECEIVED FROM DMV")}
          {renderBasicField("NOT RECEIVED FROM PRIOR OWNER")}

          {getField("SURRENDERED") && (
            <div className="flex items-center gap-2">
              <Checkbox
                label="SURRENDERED"
                checked={isChecked("SURRENDERED")}
                onChange={() => onCheckChange("SURRENDERED")}
                className="whitespace-normal text-[11px]"
              />
              <span className="hidden md:inline-block text-gray-700">—</span>
              <span className="text-gray-700 whitespace-normal text-[11px]">Number of plates surrendered to DMV</span>
              <div className="flex items-center gap-4">
                <Checkbox
                  label="ONE"
                  checked={plateCount.includes("ONE")}
                  onChange={() => onPlateCountChange("ONE")}
                  className="whitespace-normal text-[11px]"
                />
                <Checkbox
                  label="TWO"
                  checked={plateCount.includes("TWO")}
                  onChange={() => onPlateCountChange("TWO")}
                  className="whitespace-normal text-[11px]"
                />
              </div>
            </div>
          )}

          {renderBasicField("SPECIAL PLATES")}
          {renderBasicField("REQUESTING REGISTRATION CARD")}
          {renderBasicField("PER CVC §4467")}

          {/* Any other fields dynamically present but not explicitly mapped above */}
          {block.fields.map((field) => {
            const explicitlyMapped = [
              "LOST", "STOLEN", "DESTROYED/MUTILATED",
              "NOT RECEIVED FROM DMV", "NOT RECEIVED FROM PRIOR OWNER",
              "SURRENDERED", "SPECIAL PLATES", "REQUESTING REGISTRATION CARD",
              "PER CVC §4467"
            ];
            if (!explicitlyMapped.includes(field.value)) {
              return (
                <div key={field.value}>
                  <Checkbox
                    label={field.label}
                    checked={isChecked(field.value)}
                    onChange={() => onCheckChange(field.value)}
                    className="whitespace-normal text-[11px]"
                  />
                </div>
              );
            }
            return null;
          })}

          {/* Special case: OTHER */}
          <div className="flex items-center gap-2 mt-2 w-full md:w-auto">
            <Checkbox
              label="OTHER – EXPLAIN:"
              checked={isChecked("OTHER")}
              onChange={() => onCheckChange("OTHER")}
              className="whitespace-normal text-[11px]"
            />
            {isChecked("OTHER") && (
              <div className="flex-1 md:w-64">
                <Input
                  label=""
                  placeholder="Requesting a duplicate registration..."
                  value={otherExplain}
                  onChange={(val) => onOtherExplainChange(val)}
                />
              </div>
            )}
          </div>

        </div>
      </Section>
    </div>
  );
};
