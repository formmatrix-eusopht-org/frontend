import React from "react";
import Checkbox from "../Components/CheckBox";
import Section from "../Components/FieldSection";
import RadioButton from "../Components/RadioButton";

type Field = {
    label: string;
    type: "input field" | "checkbox" | "dropdown" | "radiobutton";
    placeholder?: string;
    options?: { value: string; name: string }[];
};

type Block = {
    blockName: string;
    fields: Field[];
};

type VehicleStatusProps = {
    title: string;
    block: Block;
    onFieldChange: (label: string, value: string | boolean) => void;
    values: Record<string, string | boolean>;
};

const VehicleStatusInformation = ({
    title,
    block,
    onFieldChange,
    values,
}: VehicleStatusProps) => {
    const checkboxFields = block.fields.filter((f) => f.type === "checkbox");
    const radioFields = block.fields.filter((f) => f.type === "radiobutton");

    return (
        <div className="pb-4">
            <Section title={title}>
                <div className="grid gap-4">
                    {checkboxFields.map((field, index) => {
                        const currentValue = values?.[field.label] ?? '';
                        return (
                            <Checkbox
                                key={index}
                                label={field.label}
                                className="mb-2"
                                checked={Boolean(currentValue)}
                                onChange={() =>
                                    onFieldChange(field.label, !Boolean(currentValue))
                                }
                            />
                        );
                    })}
                </div>

                {radioFields.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {radioFields.map((field, fieldIdx) => {
                            const currentValue = values?.[field.label] ?? '';
                            return (
                                <div key={fieldIdx} className="flex flex-col">
                                    <label className="text-[14px] text-gray-600 mb-2">{field.label}:</label>
                                    <div className="flex flex-col gap-2">
                                        {field.options?.map((option, optionIdx) => (
                                            <RadioButton
                                                key={optionIdx}
                                                label={option.name}
                                                name={field.label}
                                                value={option.value}
                                                checked={currentValue === option.value}
                                                className='text-[12px]'
                                                onChange={() =>
                                                    onFieldChange(field.label, option.value)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Section>
        </div>
    );
};

export default VehicleStatusInformation;
