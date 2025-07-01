import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";
import { states } from "../Data/statesData";

interface Field {
    label: string;
    type: "text" | "phone" | "date" | "dropdown";
    placeholder?: string;
    options?: any[];
    value?: string | boolean;
}

interface FormBlock {
    blockName: string;
    fields?: Field[];
}

interface Props {
    block: FormBlock;
    formState: Record<string, string | boolean>;
    onFieldChange: (label: string, value: string | boolean) => void;
}

export const LegalOwnerOfRecord = ({
    block,
    formState,
    onFieldChange,
}: Props) => {
    const fields = block.fields || [];

    return (
        <div className="pb-4">
            <Section
                title={block.blockName}
            >
                {/* Primary Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field) => (
                        <Input
                            key={field.label}
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder ?? ""}
                            value={formState[field.label] as string}
                            onChange={(val) => onFieldChange(field.label, val)}
                            options={field.options || (field.type === "dropdown" ? states : [])}
                        />
                    ))}
                </div>
            </Section>
        </div>
    );
};
