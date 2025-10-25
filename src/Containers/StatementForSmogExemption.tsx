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
    }, [values]);

    return (
        <div className="pb-3">
            <Section title={title}>
                <p className="text-[14px] font-medium mb-2">
                    The vehicle does not require a smog certification for transfer of ownership because:
                </p>

                <div className="flex flex-col gap-2">
                    {checkboxFields.map((field, index) => {
                        const isChecked = Boolean(values?.[field?.label]);

                        return (
                            <div key={index} className="flex flex-col">
                                {/* Parent Checkbox */}
                                <div className="flex items-start gap-2">
                                    <Checkbox
                                        label=""
                                        checked={isChecked}
                                        onChange={() => onFieldChange(field.label, !isChecked)}
                                    />

                                    {/* Inline layout */}
                                    <div className="flex flex-wrap items-center gap-3 leading-tight">
                                        <span className="text-[14px] whitespace-nowrap">{field.label}</span>

                                        {field.subOptions?.map((subOption, subIdx) => {
                                            const subValue = Boolean(values?.[subOption?.label]);
                                            return (
                                                <div
                                                    key={`${index}-${subIdx}`}
                                                    className="flex items-center gap-1 translate-y-[1px]"
                                                >
                                                    <Checkbox
                                                        label=""
                                                        checked={subValue}
                                                        onChange={() => onFieldChange(subOption.label, !subValue)}
                                                        disabled={!isChecked}
                                                    />
                                                    <span className="text-[13px] whitespace-nowrap">
                                                        {subOption.label}
                                                    </span>

                                                    {/* Inline input for “Other” */}
                                                    {subOption.label === "Other" && subValue && (
                                                        <input
                                                            placeholder="_________________________"
                                                            type="text"
                                                            className="w-[8rem] h-5 ml-1 border-b border-black rounded-none focus:ring-0 focus:outline-none text-[13px] align-middle translate-y-[-1px]"
                                                            value={
                                                                typeof values?.["Other"] === "string"
                                                                    ? values["Other"]
                                                                    : ""
                                                            }
                                                            onChange={(e) => onFieldChange("Other", e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                        {field.subText && (
                                            <p className="ml-4 text-[12px] text-gray-600">{field.subText}</p>
                                        )}
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
};

export default StatementForSmogExemption;
