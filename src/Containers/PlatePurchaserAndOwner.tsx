import React from "react";
import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";
import { states } from "../Data/statesData";

interface Props {
    block: any;
    values: any;
    onChange: any;
}

const PlatePurchaserAndOwner = ({ block, values, onChange }: Props) => {
    const handlePurchaserChange = (label: string, val: string) => {
        onChange((prev: any) => ({
            ...prev,
            platePurchase: {
                ...prev.platePurchase,
                [label]: val,
            },
        }));
    };

    const handleOwnerChange = (label: string, val: string) => {
        onChange((prev: any) => ({
            ...prev,
            plateOwner: {
                ...prev.plateOwner,
                [label]: val,
            },
        }));
    };

    const handleToggleSameAsOwner = () => {
        onChange((prev: any) => ({
            ...prev,
            ifPlateOwnerIsDifferent: !prev.ifPlateOwnerIsDifferent,
        }));
    };

    const normalizeKey = (str: string) =>
        str.toLowerCase().replace(/\s+/g, "-");

    const radioOptions = block.subOptions?.map((opt: any) => ({
        label: opt.label,
        value: normalizeKey(opt.label),
    })) || [];

    return (
        <div className="pb-4">
            <Section
                title={block?.blockName}
                radioOptions={radioOptions}
                allowToggle={true}
                useStyledRadio={true}
                selectedOptions={
                    values.ifPlateOwnerIsDifferent ? [normalizeKey("If Plate Owner is Different")] : []
                }
                onToggleOption={(val) => {
                    if (val === normalizeKey("If Plate Owner is Different")) {
                        handleToggleSameAsOwner();
                    }
                }}
            >
                <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {block.fields.map((field: any) => (
                            <Input
                                key={field.label}
                                label={field.label}
                                type={field.type}
                                options={field.type === "dropdown" ? states : []}
                                value={values?.platePurchase?.[field?.label] || ""}
                                placeholder={field.placeholder || ""}
                                onChange={(val) =>
                                    handlePurchaserChange(field.label, val)
                                }
                            />
                        ))}
                    </div>
                </div>
            </Section>

            {values.ifPlateOwnerIsDifferent && (
                <Section
                    title={block.subOptions[0].fieldName || "Plate Owner"}
                    subSection
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {block.subOptions[0].subFields.map((field: any) => (
                            <Input
                                key={field.label}
                                label={field.label}
                                placeholder={field.placeholder}
                                type={
                                    field.type === "dropdown"
                                        ? "dropdown"
                                        : field.type === "phone"
                                            ? "phone"
                                            : "text"
                                }
                                options={field.type === "dropdown" ? states : []}
                                value={values.plateOwner[field.label] || ""}
                                onChange={(val) =>
                                    handleOwnerChange(field.label, val)
                                }
                            />
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
};


export default PlatePurchaserAndOwner;