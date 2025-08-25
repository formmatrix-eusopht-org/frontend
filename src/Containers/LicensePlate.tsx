import Checkbox from "../Components/CheckBox";
import Section from "../Components/FieldSection";

type Field = {
    label: string;
    value: string;
};

type LicensePlateMissingProps = {
    title: string;
    block: {
        blockName: string;
        fields: Field[];
    };
    selectedOption: string;
    handleSelectedOptionOnChange: (value: string) => void;
};

export const LicensePlateMissingBlock = ({
    title,
    block,
    selectedOption,
    handleSelectedOptionOnChange,
}: LicensePlateMissingProps) => {

    return (
        <div className="pb-4">
            <Section title={title}>
                <div className="space-y-2 text-sm text-gray-700">
                    {block.fields.map((field) =>
                        <Checkbox
                            key={field.label}
                            label={field.label}
                            checked={selectedOption === field.value}
                            onChange={() => handleSelectedOptionOnChange(field.value)}
                        />)}
                </div>
            </Section>
        </div>
    );
};
