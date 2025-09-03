import React, { useEffect } from "react";
import Checkbox from "../Components/CheckBox";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";

type Field = {
    label: string;
    type: "input field" | "checkbox";
    placeholder?: string;
    options?: { value: string; name: string }[];
    subText?: string;
    subOptions?: { label: string }[];
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

const StatementForSmogExemption = ({
    title,
    block,
    onFieldChange,
    values,
}: VehicleStatusProps) => {
    const checkboxFields = block.fields.filter((f) => f.type === "checkbox");

    // Auto-uncheck subOptions if parent is unchecked
    useEffect(() => {
        checkboxFields.forEach((field) => {
            const isChecked = Boolean(values?.[field?.label]);

            if (!isChecked && field.subOptions?.length) {
                field.subOptions.forEach((sub) => {
                    if (values?.[sub?.label]) {
                        onFieldChange(sub.label, false);
                    }
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]); // Re-run if values change

    return (
        <div className="pb-2">
            <Section title={title}>
                <p>The vehicle does not require a smog certification for transfer of ownership because:</p>
                <div className="grid gap-4">
                    {checkboxFields.map((field, index) => {
                        const isChecked = Boolean(values?.[field?.label]);

                        return (
                            <div key={index}>
                                {/* Parent Checkbox */}
                                <Checkbox
                                    label={field.label}
                                    className="mb-1"
                                    checked={isChecked}
                                    onChange={() =>
                                        onFieldChange(field.label, !isChecked)
                                    }
                                />

                                {/* Sub-options */}
                                <div key={`${index}-subOptions`} className="flex items-center gap-4 flex-wrap ml-4">
                                    {field.subOptions?.map((subOption, subIdx) => {
                                        const subValue = Boolean(values?.[subOption?.label]);

                                        return (
                                            <div key={`${index}-${subIdx}`} className="flex items-center gap-2">
                                                <Checkbox
                                                    label={subOption.label}
                                                    checked={subValue}
                                                    className=""
                                                    onChange={() => onFieldChange(subOption.label, !subValue)}
                                                    disabled={!isChecked}
                                                />

                                                {/* 👇 Inline input if "Other" is selected */}
                                                {subOption.label === "Other" && subValue && (
                                                    <Input
                                                        label=""
                                                        placeholder="Specify other"
                                                        type="text"
                                                        className="w-[10rem] h-6"
                                                        value={typeof values?.["Other"] === "string" ? values["Other"] : ""}
                                                        onChange={(val) => onFieldChange("Other", val)}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Subtext */}
                                {field.subText && (
                                    <p className="ml-4 text-[12px] text-gray-600">{field.subText}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
};

export default StatementForSmogExemption;
