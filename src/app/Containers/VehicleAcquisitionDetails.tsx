import React from "react";
import Section from "../Components/FieldSection";
import RadioButton from "../Components/RadioButton";

type Field = {
    label: string;
    type: "radiobutton";
    options: { value: string; name: string }[];
};

type Block = {
    blockName: string;
    fields: Field[];
};

type Props = {
    title: string;
    block: Block;
    onFieldChange: (fieldLabel: string, value: string) => void;
    values: Record<string, string>;
};

const VehicleAcquisitionDetails = ({ title, block, onFieldChange, values }: Props) => {
    return (
        <div className="pb-4">
            <Section title={title}>
                <div className="flex flex-col gap-2">
                    {block.fields.map((field, fieldIdx) => (
                        <React.Fragment key={fieldIdx}>
                            {fieldIdx === 1 && (
                                <div>
                                    <h5 className="text-[14px] mb-2">FOR ALL VEHICLES:</h5>
                                    <p className="text-[12px]">Since purchasing or acquiring this vehicle, were any body type modifications, additions and/or alterations (e.g., changing from pickup to utility, etc.) made to this vehicle? If yes, a Statement of Construction (REG 5036) form must be completed.</p>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-1">
                                {field.options.map((option, optionIdx) => {
                                    const currentValue = values[field.label] || "";
                                    return (
                                        <div key={`${fieldIdx}-${optionIdx}`}>
                                            <RadioButton
                                                label={option.name}
                                                name={field.label}
                                                value={option.value}
                                                className="text-[12px]"
                                                checked={currentValue === option.value}
                                                onChange={() => onFieldChange(field.label, option.value)}
                                            />
                                            {/* Conditionally render relationship input */}
                                            {option.value === "family" && currentValue === "family" && (
                                                <input
                                                    type="text"
                                                    placeholder="Enter relationship"
                                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                                    value={values["family_relationship"] || ""}
                                                    onChange={(e) =>
                                                        onFieldChange("family_relationship", e.target.value)
                                                    }
                                                />
                                            )}
                                        </div>
                                    );
                                })}

                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default VehicleAcquisitionDetails;