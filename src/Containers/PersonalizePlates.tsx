import React from "react";
import Section from "../Components/FieldSection";
import RadioButton from "../Components/RadioButton";
import Checkbox from "../Components/CheckBox";

type PlateOption = {
    label: string;
    type: "checkbox";
    placeholder?: string;
};

type PlateCategory = {
    label: string;
    fields: PlateOption[];
};

type Block = {
    blockName: string;
    fields: PlateCategory[];
    options?: string[];
};

type Props = {
    block: Block;
    plateInfo: {
        selectedPlate: string;
        veteranCode: string;
        duplicatePlate: string;
    };
    onPlateChange: (label: string) => void;
    onInputChange: (field: "veteranCode" | "duplicatePlate", value: string) => void;
    personalizePlatesState: string;
    setPersonalizePlatesState: any;
};

export const PlatesSelection = ({
    block,
    plateInfo,
    onPlateChange,
    onInputChange,
    personalizePlatesState,
    setPersonalizePlatesState
}: Props) => {
    const { selectedPlate, veteranCode, duplicatePlate } = plateInfo;
    const checkboxOptions = block?.options || [];

    return (
        <div className="pb-4">
            <Section title="Plates Options">
                <div className="flex justify-between">
                    {checkboxOptions?.map((f: string) => (
                        <Checkbox
                            key={f}
                            label={f}
                            checked={personalizePlatesState === f}
                            onChange={() =>
                                setPersonalizePlatesState(personalizePlatesState === f ? "" : f)}
                        />

                    ))}
                </div>
            </Section>

            <Section title="Plate Selection" subSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {/* Left Column */}
                    {block.fields[0] && (
                        <div>
                            <h4 className="font-semibold text-sm border-b border-gray-300 mb-2 pb-1">
                                {block.fields[0].label}
                            </h4>
                            <div className="flex flex-col gap-2">
                                {block.fields[0].fields.map((field, idx) => (
                                    <RadioButton
                                        key={idx}
                                        label={field.label}
                                        name="plate-option"
                                        value={field.label}
                                        checked={selectedPlate === field.label}
                                        onChange={() => onPlateChange(field.label)}
                                        className="text-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">
                        {block.fields.slice(1).map((category, catIdx) => (
                            <div key={catIdx}>
                                <h4 className="font-semibold text-sm border-b border-gray-300 mb-2 pb-1">
                                    {category.label}
                                </h4>
                                <div className="flex flex-col gap-2">
                                    {category.fields.map((field, idx) => (
                                        <RadioButton
                                            key={idx}
                                            label={field.label}
                                            name="plate-option"
                                            value={field.label}
                                            checked={selectedPlate === field.label}
                                            onChange={() => onPlateChange(field.label)}
                                            className="text-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Veterans' Organization Input */}
                {selectedPlate === "Veterans' Organization" && (
                    <div className="mt-8">
                        <hr className="my-8 border-gray-300" />
                        <div className="text-gray-600 text-sm">
                            (PROVIDE ORGANIZATIONAL CODE OF DECAL)
                        </div>
                        <div className="text-sm mt-2">List of Logos can be found at</div>
                        <a
                            href="https://www.calvet.ca.gov/VetServices/Pages/License-Plates.aspx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            https://www.calvet.ca.gov/VetServices/Pages/License-Plates.aspx
                        </a>
                        <input
                            type="text"
                            value={plateInfo.veteranCode}
                            placeholder="Enter Organizational Code"
                            onChange={(e) => onInputChange("veteranCode", e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-1 h-9 min-w-[500px] text-sm"
                        />

                    </div>
                )}

                {/* Duplicate Plate Input */}
                {selectedPlate === "Duplicate Decal" && (
                    <div className="mt-8">
                        <hr className="my-8 border-gray-300" />
                        <div className="text-gray-600 text-sm">CURRENT LICENSE PLATE NUMBER</div>
                        <input
                            type="text"
                            value={plateInfo.duplicatePlate}
                            placeholder="CURRENT LICENSE PLATE NUMBER"
                            onChange={(e) => onInputChange("duplicatePlate", e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-1 h-9 min-w-[500px] text-sm"
                        />
                    </div>
                )}
            </Section>
        </div>
    );
};
