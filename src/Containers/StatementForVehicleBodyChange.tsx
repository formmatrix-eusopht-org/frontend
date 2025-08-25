import React from "react";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";
import Checkbox from "../Components/CheckBox";

type Field = {
    label: string;
    type: "input" | "checkbox" | "date";
    placeholder?: string;
};

type Props = {
    title: string;
    values: Record<string, any>;
    onChange: (label: string, value: any) => void;
};

const VehicleBodyChange: React.FC<Props> = ({ title, values, onChange }) => {
    return (
        <div className="pb-4">
            <Section title={title}>
                <div className="grid grid-cols-1 gap-4">
                    {/* Market value */}
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <label className="text-sm">The current market value of the vehicle or vessel is: $</label>
                        <Input
                            label=""
                            type="text"
                            placeholder=""
                            className="!h-[32px]"
                            value={values["Market Value"] || ""}
                            onChange={(e) => onChange("Market Value", e)}
                        />
                    </div>

                    {/* Change cost and date */}
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <label className="text-sm">Changes were made at a cost of $ </label>
                        <Input
                            label=""
                            type="text"
                            placeholder=""
                            className="!h-[32px]"
                            value={values["Change Cost"] || ""}
                            onChange={(e) => onChange("Change Cost", e)}
                        />
                        <label className="text-sm">on this date $ </label>
                        <Input
                            label=""
                            type="date"
                            className="!h-[32px]"
                            value={values["Change Date"] || ""}
                            onChange={(e) => onChange("Change Date", e)}
                        />
                    </div>

                    <div>
                        <p className="font-semibold text-sm">This is what I changed: <span className="italic">Check all that apply:</span></p>
                    </div>

                    {/* Unladen Weight */}
                    <Checkbox
                        label="Unladen Weight changed because"
                        checked={values["Unladen Weight Checked"] || false}
                        onChange={() =>
                            onChange("Unladen Weight Checked", !values["Unladen Weight Checked"])
                        }
                    />

                    {values["Unladen Weight Checked"] && (
                        <>
                            <Input
                                label=""
                                placeholder="Reason for unladen weight change"
                                className="!h-[32px]"
                                value={values["Unladen Weight Reason"] || ""}
                                onChange={(e) => onChange("Unladen Weight Reason", e)}
                            />
                            <p className="text-xs italic">(Public Weighmaster Certificate is required. Exception: Trailers)</p>
                        </>
                    )}

                    {/* Motive Power */}
                    <Checkbox
                        label="Motive Power changed"
                        checked={values["Motive Power Checked"] || false}
                        onChange={() =>
                            onChange("Motive Power Checked", !values["Motive Power Checked"])
                        }
                    />

                    {values["Motive Power Checked"] && (
                        <div className="flex gap-2">
                            <Input
                                label=""
                                placeholder="from"
                                className="!h-[32px]"
                                value={values["Motive Power From"] || ""}
                                onChange={(e) => onChange("Motive Power From", e)}
                            />
                            <Input
                                label=""
                                placeholder="to"
                                className="!h-[32px]"
                                value={values["Motive Power To"] || ""}
                                onChange={(e) => onChange("Motive Power To", e)}
                            />
                        </div>
                    )}

                    {/* Body Type */}
                    <Checkbox
                        label="Body Type changed"
                        checked={values["Body Type Checked"] || false}
                        onChange={() =>
                            onChange("Body Type Checked", !values["Body Type Checked"])
                        }
                    />
                    {values["Body Type Checked"] && (
                        <div className="flex gap-2">
                            <Input
                                label=""
                                placeholder="from"
                                className="!h-[32px]"
                                value={values["Body Type From"] || ""}
                                onChange={(e) => onChange("Body Type From", e)}
                            />
                            <Input
                                label=""
                                placeholder="to"
                                className="!h-[32px]"
                                value={values["Body Type To"] || ""}
                                onChange={(e) => onChange("Body Type To", e)}
                            />
                        </div>
                    )}

                    <Checkbox
                        label="Number of Axles changed"
                        checked={values["Axles Checked"] || false}
                        onChange={() =>
                            onChange("Axles Checked", !values["Axles Checked"])
                        }
                    />
                    {values["Axles Checked"] && (
                        <div className="flex gap-2">
                            <Input
                                label=""
                                placeholder="from"
                                className="!h-[32px]"
                                value={values["Axles From"] || ""}
                                onChange={(e) => onChange("Axles From", e)}
                            />
                            <Input
                                label=""
                                placeholder="to"
                                className="!h-[32px]"
                                value={values["Axles To"] || ""}
                                onChange={(e) => onChange("Axles To", e)}
                            />
                        </div>
                    )}

                    {/* Statement of Facts */}
                    <div>
                        <label className="font-bold block mb-1">STATEMENT OF FACTS</label>
                        <p className="text-sm mb-2">I, the undersigned, state:</p>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2 text-sm"
                            rows={5}
                            maxLength={2000}
                            placeholder="Enter your statement of facts..."
                            value={values["Statement of Facts"] || ""}
                            onChange={(e) => onChange("Statement of Facts", e.target.value)}
                        />
                        <p className="text-xs text-right">{(values["Statement of Facts"] || "").length}/2000</p>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default VehicleBodyChange;
