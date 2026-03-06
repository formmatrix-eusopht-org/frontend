import React from "react";
import Checkbox from "../Components/CheckBox";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";

type State = {
    assignedTo: string; // Only one can be selected
    assignedFor: string;
    vehicleIdentificationNumber: string;
    licensePlateNumber: string;
    plateChoices?: any;
    location?: string;
    deliveryType?: string;
    centered?: any;
};


type Props = {
    block: any;
    value: State;
    onChange: any;
};

const assignedDescriptions: Record<string, string> = {
    "Motorcycle": "(Select motorcycle plates will be issued a special interest decal on the left.)",
    // Add more if needed
};

const SelectConfiguration: React.FC<Props> = ({ block, value, onChange }) => {
    const toggleAssignedTo = (label: string) => {
        onChange({ ...value, assignedTo: label });
    };
    const toggleAssignedFor = (label: string) => {
        onChange({ ...value, assignedFor: label });
    };
    const handlePlateChoiceChange = (
        index: number,
        field: "text" | "meaning",
        val: string
    ) => {
        const updatedChoices = [...value.plateChoices];
        if (!updatedChoices[index]) updatedChoices[index] = { text: "", meaning: "" };
        updatedChoices[index][field] = val;
        onChange({ ...value, plateChoices: updatedChoices });
    };

    return (
        <div className="space-y-6">
            <Section title="SELECT CONFIGURATION">
                {/* Assigned To */}
                <div>
                    <p className="font-medium mb-1">PLATES WILL BE ASSIGNED TO:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {block?.fields?.map((field: any, idx: any) => (
                            <div
                                key={idx}
                                className={idx === 3 ? "col-span-2" : ""}
                            >
                                <Checkbox
                                    label={field.label}
                                    checked={value.assignedTo.includes(field.label)}
                                    onChange={() => toggleAssignedTo(field.label)}
                                />
                                {assignedDescriptions[field.label] && (
                                    <span className="text-xs text-gray-500">{assignedDescriptions[field.label]}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <hr className="my-8 border-gray-300" />

                {/* Plate Type */}
                <div className=" text-lg mb-2">
                    <Checkbox
                        label="Sequential (Non-Personalized) — Issued in number sequence."
                        checked={value.assignedFor.includes("Sequential")}
                        onChange={() => toggleAssignedFor(value.assignedFor.includes("Sequential") ? '' : "Sequential")}
                        className="!text-[20px] font-semibold"
                    />
                    <p className="text-sm mb-2 font-normal text-gray-500">Your existing sequential license plate number cannot be re-used. You must submit a copy of your current registration card.</p>
                    {value.assignedFor === "Sequential" && (
                        <div className="">
                            <h4 className="text-[16px]  font-semibold">Sequential plates will be assigned to:</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    key="CURRENT LICENSE PLATE NUMBER"
                                    label="CURRENT LICENSE PLATE NUMBER"
                                    placeholder="CURRENT LICENSE PLATE NUMBER"
                                    type="text"
                                    className=""
                                    value={value?.licensePlateNumber}
                                    onChange={(val) => onChange({ ...value, licensePlateNumber: val })}
                                />
                                <Input
                                    key="FULL VEHICLE IDENTIFICATION NUMBER"
                                    label="FULL VEHICLE IDENTIFICATION NUMBER"
                                    placeholder="FULL VEHICLE IDENTIFICATION NUMBER"
                                    type="text"
                                    className=""
                                    value={value.vehicleIdentificationNumber}
                                    onChange={(val) => onChange({ ...value, vehicleIdentificationNumber: val })}
                                />
                            </div>
                        </div>

                    )}
                    <Checkbox
                        label="Personalized"
                        checked={value.assignedFor.includes("Personalized")}
                        onChange={() => toggleAssignedFor(value.assignedFor.includes("Personalized") ? "" : "Personalized")}
                        className="!text-[20px] mt-4 mb-8 font-semibold"
                    />
                    {/* Personalized Section */}
                    {value.assignedFor === "Personalized" && (
                        <div className="space-y-4 pt-4 border-t">
                            <p className="font-semibold uppercase text-[14px] flex justify-center mb-2">Personalized Configuration Choice</p>
                            <div className="text-sm text-gray-700 mb-2">
                                DMV has the right to refuse any combination of letters and/or letters and numbers for any of the following reason(s): it could be considered offensive to good taste and decency in any language or slang term, it substitutes letters for numbers or vice versa (e.g. ROBERT/ROBERT), to look like another personalized plate, or it conflicts with any regular license plate series issued.
                                <br />
                                <br />
                                <div className="text-sm font-semibold text-gray-700 mb-2">
                                    Your application will not be accepted if the <strong>MEANING</strong> of the plate is not entered, even if it appears obvious, OR if the plate configuration is unacceptable.
                                </div>
                            </div>

                            <Checkbox
                                label="If you do NOT want the plate centered, check this box"
                                checked={value?.centered}
                                onChange={() => onChange({ ...value, centered: !value.centered })}
                            />
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div>
                                        <p className="font-semibold">{["First Choice", "Second Choice", "Third Choice"][i]}</p>
                                        <span className="text-xs text-gray-500">Maximum 8 characters</span>
                                        <Input
                                            type="text"
                                            label={`PLATE${i + 1}`}
                                            placeholder={`PLATE${i + 1}`}
                                            value={value.plateChoices[i]?.text || ""}
                                            className="h-8"
                                            onChange={(val) => handlePlateChoiceChange(i, "text", val)}
                                        />
                                        <Input
                                            type="text"
                                            label="Meaning (REQUIRED)"
                                            placeholder="Meaning (REQUIRED)"
                                            value={value.plateChoices[i]?.meaning || ""}
                                            className="h-8"
                                            onChange={(val) => handlePlateChoiceChange(i, "meaning", val)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>



                {/* Delivery */}
                {value.assignedFor !== "" && (
                    <div className="flex items-start justify-between gap-6 pt-4 border-t">

                        <div className="min-w-0">
                            <Checkbox
                                label="DMV Office"
                                checked={value.deliveryType === "DMV Office"}
                                onChange={() => onChange({ ...value, deliveryType: "DMV Office" })}
                                className="truncate"
                            />
                        </div>

                        <div className="min-w-0">
                            <Checkbox
                                label="Auto Club (must be a member)"
                                checked={value.deliveryType === "Auto Club"}
                                onChange={() => onChange({ ...value, deliveryType: "Auto Club" })}
                                className="truncate"
                            />
                        </div>

                        <div className="flex flex-col min-w-0 w-[220px]">
                            <label className="text-[12px] font-medium truncate">
                                LOCATION (city)
                            </label>

                            <Input
                                type="text"
                                label=""
                                placeholder="LOCATION (city)"
                                value={value.location}
                                onChange={(val) => onChange({ ...value, location: val })}
                                className="h-8"
                            />
                        </div>

                    </div>


                )}
            </Section>
            <hr className="my-8 border-gray-300" />
        </div>
    );
};

export default SelectConfiguration;
