import React from "react";
import Checkbox from "../Components/CheckBox";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";
import { states } from "../Data/statesData";

type Field = {
    label: string;
    type: "input field" | "checkbox" | "dropdown" | "date";
    placeholder?: string;
    value?: string | boolean;
    options?: { value: string; name: string }[];
};

type Block = {
    blockName: string;
    fields: Field[];
};

type VehicleStorageLocationProps = {
    title: string;
    block: Block;
    formState: Record<string, string | boolean>;
    onFieldChange: (label: string, value: string | boolean) => void;
};

export const VehicleStorageLocationDetails = ({
    title,
    block,
    formState,
    onFieldChange,
}: VehicleStorageLocationProps) => {
    return (
        <div className="pb-4">
            <Section title={title}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {block.fields
                        .filter((field) => field.label !== "Date of Sale")
                        .map((field, index) => {
                            const value = formState[field.label]; // ✅ pull current value from formState

                            return (
                                <Input
                                    key={index}
                                    label={field.label}
                                    type={
                                        field.type === "input field"
                                            ? "text"
                                            : field.type === "dropdown"
                                                ? "dropdown"
                                                : field.type === "date"
                                                    ? "date"
                                                    : "text"
                                    }
                                    placeholder={field.placeholder}
                                    options={
                                        field.type === "dropdown"
                                            ? states.map(({ label, value }) => ({
                                                label,
                                                value,
                                            }))
                                            : undefined
                                    }
                                    value={typeof value === "boolean" ? String(value) : value ?? ""}
                                    onChange={(val) => onFieldChange(field.label, val)}
                                />
                            );
                        })}
                </div>
            </Section>
        </div>
    );
};
