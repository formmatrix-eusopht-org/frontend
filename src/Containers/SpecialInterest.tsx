import React from "react";
import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";
import Checkbox from "../Components/CheckBox";

export default function SpecialInterestSection({ block, values, onChange }: any) {
    const inputFields = block.fields.filter((f: any) => f.type === "input field");

    // Separate feeEnclosed from releaseInterest options
    const releaseInterestFields = block.fields.filter(
        (f: any) => f.type === "checkbox" && f.label !== "Fee enclosed"
    );
    const feeField = block.fields.find(
        (f: any) => f.type === "checkbox" && f.label === "Fee enclosed"
    );

    return (
        <Section title={block?.blockName}>
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {inputFields?.map((field: any) => (
                    <Input
                        key={field.label}
                        type="text"
                        label={field.label}
                        placeholder={field.placeholder}
                        value={values[field.key] || ""}
                        onChange={(val: string) =>
                            onChange((prev: any) => ({
                                ...prev,
                                [field.key]: val
                            }))
                        }
                        className="border border-gray-300 rounded p-2"
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {/* Release Interest checkboxes (mutually exclusive) */}
                {releaseInterestFields?.map((field: any) => {
                    const optionValue = field.label; // unique string for each option
                    return (
                        <Checkbox
                            key={field.label}
                            label={field.label}
                            checked={values.releaseInterest === optionValue}
                            onChange={() =>
                                onChange((prev: any) => ({
                                    ...prev,
                                    releaseInterest:
                                        prev.releaseInterest === optionValue ? "" : optionValue
                                }))
                            }
                        />
                    );
                })}

                {feeField && values.releaseInterest === "RETAIN INTEREST FOR FUTURE USE" && (
                    <Checkbox
                        label={feeField.label}
                        checked={values.feeEnclosed}
                        onChange={() =>
                            onChange((prev: any) => ({
                                ...prev,
                                feeEnclosed: !prev.feeEnclosed
                            }))
                        }
                    />
                )}
            </div>
        </Section>
    );
}
