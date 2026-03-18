import React from "react";
import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";
import Checkbox from "../Components/CheckBox";

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
    transactionSelections?: string[];
    handleTransactionChange?: (label: string, checked: boolean) => void;
};

const SalvageCertificate = ({
    title,
    block,
    values,
    onFieldChange,
    transactionSelections = [],
    handleTransactionChange,
}: SalvageCertificateProps) => {
    return (
        <div className="">
            <Section
                title={
                    <div className="flex items-center gap-6">
                        <span>{title}</span>
                        {handleTransactionChange && (
                            <div className="flex items-center gap-4">
                                <Checkbox
                                    label="Orginal"
                                    checked={transactionSelections.includes("Orginal")}
                                    onChange={() => handleTransactionChange("Orginal", !transactionSelections.includes("Orginal"))}
                                />
                                <Checkbox
                                    label="Duplicate"
                                    checked={transactionSelections.includes("Duplicate")}
                                    onChange={() => handleTransactionChange("Duplicate", !transactionSelections.includes("Duplicate"))}
                                />
                            </div>
                        )}
                    </div>
                }
            >
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