import React from "react";
import Input from "../Components/InputControl";

type Option = {
    id: string;
    label: string;
    hint?: string;
};

type DpState = {
    selectedPlacard: string;
    issuedPreviously: "yes" | "no" | "";
    plate: string;
};

type DpPlacardSectionProps = {
    title?: string;
    subtitle?: string;
    options?: Option[];
    values: DpState;
    onChange: (next: DpState) => void;
    className?: string;
};

const DpPlacardSection: React.FC<DpPlacardSectionProps> = ({
    title = "Type of Disabled Person Parking Placard(S) or License Plates",
    subtitle = "Select Parking Placard Type",
    options = [
        { id: "permanent", label: "Permanent DP Parking Placard (No Fee)" },
        { id: "temporary", label: "Temporary DP Parking Placard ($6.00 Fee)" },
        { id: "travel", label: "Travel Parking DP Parking Placard (No Fee)" },
        { id: "plates", label: "Disabled Person License Plates (No Fee), see Section 3" },
        { id: "reassign", label: "Disabled Person License Plates Reassignment, see Section 3" },
    ],
    values,
    onChange,
    className = "",
}) => {
    const handlePlacardChange = (id: string) => {
        onChange({ ...values, selectedPlacard: id });
    };

    const handleIssuedChange = (val: "yes" | "no") => {
        onChange({ ...values, issuedPreviously: val });
    };
    const handlePlatesChange = (val: string) => {
        onChange({ ...values, plate: val });
    };
    return (
        <section className={`max-w-3xl ${className}`}>
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <p className="mb-3 text-sm">{subtitle}</p>

            {/* Placard radio list */}
            <ul className="space-y-4 mb-6">
                {options.map((opt) => (
                    <li key={opt.id} className="flex items-start">
                        <label
                            htmlFor={`placard-${opt.id}`}
                            className="flex items-center cursor-pointer select-none"
                        >
                            <input
                                id={`placard-${opt.id}`}
                                name="placard-type"
                                type="radio"
                                value={opt.id}
                                checked={values.selectedPlacard === opt.id}
                                onChange={() => handlePlacardChange(opt.id)}
                                className="w-4 h-4 mr-3 accent-current"
                            />
                            <span className="text-sm leading-5">{opt.label}</span>
                        </label>
                    </li>
                ))}
            </ul>

            {/* Issued before */}
            <div className="mt-2">
                <p className="mb-3 text-sm">
                    Have you ever been issued DP License Plates, Disabled Veteran License Plates,
                    or a Permanent DP parking placard in California?
                </p>
                <div className="flex flex-col gap-3">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="issued-previously"
                            value="yes"
                            checked={values.issuedPreviously === "yes"}
                            onChange={() => handleIssuedChange("yes")}
                            className="w-4 h-4 mr-3 accent-current"
                        />
                        <span className="text-sm">Yes</span>
                    </label>

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="issued-previously"
                            value="no"
                            checked={values.issuedPreviously === "no"}
                            onChange={() => handleIssuedChange("no")}
                            className="w-4 h-4 mr-3 accent-current"
                        />
                        <span className="text-sm">No</span>
                    </label>
                </div>
                {values.issuedPreviously === "yes" && (
                    <div>
                        <Input
                            key=''
                            label={"License Plate or DP Parking Placard Number"}
                            type={"text"}
                            placeholder={"License Plate or DP Parking Placard Number"}
                            value={values.plate || ''}
                            onChange={(e) => handlePlatesChange(e)}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default DpPlacardSection;
