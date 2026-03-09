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

type TypeOfVehicleProps = {
  title: string;
  block: Block;
  selectedItems: string;
  onChange: (label: string, checked: boolean) => void;
};

export const TypeOfVehicle = ({
  title,
  block,
  selectedItems,
  onChange,
}: TypeOfVehicleProps) => {
  return (
    <div className="pb-4">
      <Section title={title}>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {block.fields.map((field, index) => (
            <Checkbox
              key={index}
              label={field.label}
              className="whitespace-nowrap"
              checked={selectedItems.includes(field.label)}
              onChange={() => onChange(field.label, !selectedItems.includes(field.label))}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};
