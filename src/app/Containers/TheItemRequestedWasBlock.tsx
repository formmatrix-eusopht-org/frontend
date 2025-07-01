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

  return (
    <div className="pb-4">
      <Section title={title}>
        <p className="text-sm italic text-gray-600 mb-2">(Check appropriate box(es))</p>

        <div className="space-y-2 text-sm text-gray-700">
          {block.fields.map((field) => {
            if (field.value === "SURRENDERED") {
              return (
                <div key={field.value} className="flex items-center gap-2 text-sm text-gray-700">
                  <Checkbox
                    label="SURRENDERED"
                    checked={isChecked("SURRENDERED")}
                    onChange={() => onCheckChange("SURRENDERED")}
                  />
                  {isChecked("SURRENDERED") && (
                    <>
                      <span className="text-gray-700">Number of plates surrendered to DMV</span>
                      <Checkbox
                        label="ONE"
                        checked={plateCount.includes("ONE")}
                        onChange={() => onPlateCountChange("ONE")}
                      />
                      <Checkbox
                        label="TWO"
                        checked={plateCount.includes("TWO")}
                        onChange={() => onPlateCountChange("TWO")}
                      />
                    </>
                  )}
                </div>
              );
            }

            return (
              <Checkbox
                key={field.value}
                label={field.label}
                className=""
                checked={isChecked(field.value)}
                onChange={() => onCheckChange(field.value)}
              />
            );
          })}

          {/* Special case: OTHER */}
          <div className="flex items-start gap-2">
            <Checkbox
              label="OTHER – EXPLAIN:"
              className=""
              checked={isChecked("OTHER")}
              onChange={() => onCheckChange("OTHER")}
            />
            {isChecked("OTHER") && (
              <div className="flex-1">
                <Input
                  label="Requesting a duplicate registration..."
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
