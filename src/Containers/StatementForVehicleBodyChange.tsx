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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-sm">The current market value of the vehicle or vessel is:</span>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold">$</span>
                            <div className="w-32">
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="0.00"
                                    className="!h-[32px]"
                                    value={values["Market Value"] || ""}
                                    onChange={(e) => onChange("Market Value", e)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Change cost and date */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-sm">Changes were made at a cost of:</span>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-semibold">$</span>
                                <div className="w-32">
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="0.00"
                                        className="!h-[32px]"
                                        value={values["Change Cost"] || ""}
                                        onChange={(e) => onChange("Change Cost", e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-sm">on this date:</span>
                            <div className="w-44">
                                <Input
                                    label=""
                                    type="date"
                                    className="!h-[32px]"
                                    value={values["Change Date"] || ""}
                                    onChange={(e) => onChange("Change Date", e)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 text-[#4b5563]">
                        <p className="font-semibold text-sm">This is what I changed: <span className="italic font-normal">Check all that apply:</span></p>
                    </div>

                    {/* Unladen Weight */}
                    <div className="space-y-1">
                        <Checkbox
                            label="Unladen Weight changed because"
                            checked={values["Unladen Weight Checked"] || false}
                            onChange={() =>
                                onChange("Unladen Weight Checked", !values["Unladen Weight Checked"])
                            }
                        />

                        {values["Unladen Weight Checked"] && (
                            <div className="pl-6 space-y-1">
                                <Input
                                    label=""
                                    placeholder="Reason for unladen weight change"
                                    className="!h-[32px]"
                                    value={values["Unladen Weight Reason"] || ""}
                                    onChange={(e) => onChange("Unladen Weight Reason", e)}
                                />
                                <p className="text-[11px] text-gray-500 italic">(Public Weighmaster Certificate is required. Exception: Trailers)</p>
                            </div>
                        )}
                    </div>

                    {/* Motive Power */}
                    <div className="space-y-1">
                        <Checkbox
                            label="Motive Power changed"
                            checked={values["Motive Power Checked"] || false}
                            onChange={() =>
                                onChange("Motive Power Checked", !values["Motive Power Checked"])
                            }
                        />

                        {values["Motive Power Checked"] && (
                            <div className="flex flex-col sm:flex-row gap-2 pl-6">
                                <div className="flex-1">
                                    <Input
                                        label=""
                                        placeholder="FROM"
                                        className="!h-[32px]"
                                        value={values["Motive Power From"] || ""}
                                        onChange={(e) => onChange("Motive Power From", e)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        label=""
                                        placeholder="TO"
                                        className="!h-[32px]"
                                        value={values["Motive Power To"] || ""}
                                        onChange={(e) => onChange("Motive Power To", e)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Body Type */}
                    <div className="space-y-1">
                        <Checkbox
                            label="Body Type changed"
                            checked={values["Body Type Checked"] || false}
                            onChange={() =>
                                onChange("Body Type Checked", !values["Body Type Checked"])
                            }
                        />
                        {values["Body Type Checked"] && (
                            <div className="flex flex-col sm:flex-row gap-2 pl-6">
                                <div className="flex-1">
                                    <Input
                                        label=""
                                        placeholder="FROM"
                                        className="!h-[32px]"
                                        value={values["Body Type From"] || ""}
                                        onChange={(e) => onChange("Body Type From", e)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        label=""
                                        placeholder="TO"
                                        className="!h-[32px]"
                                        value={values["Body Type To"] || ""}
                                        onChange={(e) => onChange("Body Type To", e)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Checkbox
                            label="Number of Axles changed"
                            checked={values["Axles Checked"] || false}
                            onChange={() =>
                                onChange("Axles Checked", !values["Axles Checked"])
                            }
                        />
                        {values["Axles Checked"] && (
                            <div className="flex flex-col sm:flex-row gap-2 pl-6">
                                <div className="flex-1">
                                    <Input
                                        label=""
                                        placeholder="FROM"
                                        className="!h-[32px]"
                                        value={values["Axles From"] || ""}
                                        onChange={(e) => onChange("Axles From", e)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        label=""
                                        placeholder="TO"
                                        className="!h-[32px]"
                                        value={values["Axles To"] || ""}
                                        onChange={(e) => onChange("Axles To", e)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

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
