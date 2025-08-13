import React from "react";
import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";
import { states } from "../Data/statesData";
interface Field {
    label: string;
    type: "text" | "phone" | "date" | "dropdown" | "datepicker";
    placeholder?: string;
    options?: { value: string; label: string }[];
}

interface SubOption {
    label: string;
    fieldName?: string;
    subFields?: Field[];
}

interface Block {
    blockName: string;
    fields: Field[];
    subOptions?: SubOption[];
}

// Allow nested objects in values
type FieldValues = Record<string, string | boolean | Record<string, string>>;

interface Props {
    title: string;
    block: Block;
    values: FieldValues;
    onFieldChange: React.Dispatch<React.SetStateAction<FieldValues>>;
}

const NeworCorrectResidenceorBusinessAddressInfo: React.FC<Props> = ({
    title,
    block,
    values,
    onFieldChange,
}) => {
    const handleChange = (label: string, val: string) => {
        onFieldChange((prev) => ({
            ...prev,
            [label]: val,
        }));
    };

    const handleToggleOption = (label: string) => {
        onFieldChange((prev) => ({
            ...prev,
            [label]: !prev[label], // toggle boolean
        }));
    };

    const normalizeKey = (str: string) =>
        str.toLowerCase().replace(/\s+/g, "-");

    const radioOptions = block.subOptions?.map((opt) => ({
        label: opt.label,
        value: normalizeKey(opt.label),
    })) || [];

    // Derive selectedOptions from values where boolean === true
    const selectedOptions = radioOptions
        .filter((opt) => values[opt.label] === true)
        .map((opt) => opt.value);


    return (
        <div className="pb-4">
            <Section
                title={title}
                radioOptions={radioOptions}
                allowToggle={true}
                useStyledRadio={true}
                selectedOptions={selectedOptions}
                onToggleOption={(val) => {
                    const opt = radioOptions.find((o) => o.value === val);
                    if (opt) {
                        handleToggleOption(opt.label);
                    }
                }}
            >
                <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {block.fields.map((field) => {
                            const fieldValue = typeof values[field.label] === "boolean"
                                ? String(values[field.label])
                                : (values[field.label] as string) || "";

                            return (
                                <Input
                                    key={field.label}
                                    label={field.label}
                                    type={field.type}
                                    options={field.type === "dropdown" ? states : []}
                                    value={fieldValue}
                                    placeholder={field.placeholder || ""}
                                    onChange={(val) => handleChange(field.label, val)}
                                />
                            );
                        })}
                    </div>
                </div>
            </Section>
            {block?.subOptions?.map(opt => {
                const isSelected = values?.[opt.label] === true;

                // Pick the right key for the sub-object
                const subObjectKey =
                    opt.label === "If mailing address is different"
                        ? "mailingAddress"
                        : "locationAddress";

                const addressData =
                    typeof values[subObjectKey] === "object" && values[subObjectKey] !== null
                        ? (values[subObjectKey] as Record<string, string>)
                        : {};


                return (
                    isSelected && (
                        <Section
                            key={opt.label}
                            title={opt.fieldName || opt.label}
                            subSection
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {opt.subFields
                                    ?.filter(field => field.label !== "County")
                                    ?.map(field => (
                                        <Input
                                            key={`${subObjectKey}-${field.label}`}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            type={
                                                field.type === "dropdown"
                                                    ? "dropdown"
                                                    : field.type === "phone"
                                                        ? "phone"
                                                        : "text"
                                            }
                                            options={
                                                field.type === "dropdown" ? states : []
                                            }
                                            value={addressData[field.label] || ""}
                                            onChange={val =>
                                                onFieldChange(prev => ({
                                                    ...prev,
                                                    [subObjectKey]: {
                                                        ...addressData,
                                                        [field.label]: val,
                                                    } as Record<string, string>,
                                                }))

                                            }
                                        />
                                    ))}
                            </div>
                        </Section>
                    )
                );
            })}

        </div>
    );
};

export default NeworCorrectResidenceorBusinessAddressInfo;