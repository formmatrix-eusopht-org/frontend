import React from "react";
import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";

type Field = {
    label: string;
    type: "input field" | "date";
    placeholder?: string;
    value?: string;
};

type Block = {
    blockName: string;
    fields: Field[];
};

type SalvageCertificateProps = {
    title: string;
    block: Block;
    values: { [label: string]: string }; // Add this
    onFieldChange: (label: string, value: string) => void;
};

const SalvageCertificate = ({
    title,
    block,
    values,
    onFieldChange,
}: SalvageCertificateProps) => {
    return (
        <div className="">
            <Section title={title}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {block.fields.map((field, index) => (
                        <Input
                            key={index}
                            label={field.label}
                            placeholder={field.placeholder}
                            type={field.type === "date" ? "date" : "text"}
                            value={values[field.label] || ""} // ✅ from state
                            onChange={(val) => onFieldChange(field.label, val)} // ✅ to parent
                        />
                    ))}
                </div>
            </Section>
        </div>
    );
};


export default SalvageCertificate;