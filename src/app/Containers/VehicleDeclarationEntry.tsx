import React, { useEffect } from "react";
import Input from "../Components/InputControl";
import SelectDropDown from "../Components/SelectDropDown";
import Section from "../Components/FieldSection";
import CustomDropdown from "../Components/CustomDropDown";

type Field = {
    label: string;
    type: "text" | "phone" | "date" | "dropdown";
    placeholder?: string;
    options?: { label: string; value: string }[];
};

type Block = {
    reference?: string; // <-- changed to optional
    blockName: string;
    numberOfEntry?: number;
    fields: Field[];
};

type VehicleDeclarationProps = {
    title: string;
    block: Block;
    values: Record<string, string>[];
    onFieldChange: (index: number, label: string, value: string) => void;
    onTrimEntries?: (trimmed: Record<string, string>[]) => void; // pass this
};


const VehicleDeclarationEntry = ({
    title,
    block,
    values,
    onFieldChange,
    onTrimEntries
}: VehicleDeclarationProps) => {
    const [entryCount, setEntryCount] = React.useState(block.numberOfEntry || 1);
    useEffect(() => {
        if (entryCount === 1 && values.length > 1) {
            onTrimEntries?.(values.slice(0, 1));
        }
    }, [entryCount]);

    return (
        <div className="pb-4">
            <Section
                title={title}
                subSection={true}
                dropdownValue={entryCount}
                onDropdownChange={setEntryCount}
                numberForFields={block.numberOfEntry}
            >
                {Array.from({ length: entryCount }).map((_, index) => (
                    <div key={index} className=" mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {block.fields.map((field) => {
                                const fieldValue = values?.[index]?.[field.label] || "";
                                return (
                                    <Input
                                        label={field.label}
                                        key={field.label}
                                        type={field.type}
                                        options={field.options || []}
                                        value={fieldValue}
                                        placeholder={field.placeholder}
                                        onChange={(val) =>
                                            onFieldChange(index, field.label, val)
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </Section>
        </div>
    );
};

export default VehicleDeclarationEntry;