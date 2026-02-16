import React from "react";
import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";

type Vehicle = {
    plateNumber: string;
    vinNumber: string;
    leased: boolean;
    registeredOutsideCA: boolean;
};

type VehiclesSectionProps = {
    title: string;
    block: any; // You can replace this with your actual block type
    values: Vehicle[];
    onFieldChange: any;
    leasedVehicleFlag?: boolean;
    leasaedCompanyName?: string;
    setLeasaedCompanyName?: any;
    maxVehicles?: number;
};

const VehiclesSection: React.FC<VehiclesSectionProps> = ({
    title,
    block,
    values,
    onFieldChange,
    leasedVehicleFlag,
    leasaedCompanyName,
    setLeasaedCompanyName,
    maxVehicles = 3,
}) => {
    const handleVehicleChange = (
        index: number,
        field: keyof Vehicle,
        value: string | boolean
    ) => {
        const updated = [...values];
        updated[index] = { ...updated[index], [field]: value };
        onFieldChange(updated);
    };
    const handleCompanyNameChange = (
        value: string | boolean
    ) => {
        setLeasaedCompanyName(value)
    };
    const handleDeleteVehicle = (index: number) => {
        const updated = values.filter((_, i) => i !== index);
        onFieldChange(updated);
    };

    const handleAddVehicle = () => {
        if (values.length >= maxVehicles) return;
        onFieldChange([
            ...values,
            { plateNumber: "", vinNumber: "", leased: false, registeredOutsideCA: false },
        ]);
    };

    return (
        <>
            <Section title={title}>
                {values?.map((vehicle, idx) => (
                    <div key={idx} className="pb-6 border-b border-gray-300 mb-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold mb-2">Vehicle {idx + 1}</h4>
                            {idx !== 0 &&
                                <button
                                    type="button"
                                    className="text-red-500 flex items-center gap-1"
                                    onClick={() => handleDeleteVehicle(idx)}
                                >
                                    🗑 Delete
                                </button>
                            }
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="CALIFORNIA PLATE/CF/PLACARD NO."
                                placeholder="CALIFORNIA PLATE/CF/PLACARD NO."
                                value={vehicle.plateNumber}
                                onChange={(val) => handleVehicleChange(idx, "plateNumber", val)}
                            />
                            <Input
                                label="LAST 17 POSITIONS OF VEHICLE ID OR VESSEL HULL ID NUMBER"
                                placeholder="LAST 17 POSITIONS OF VEHICLE ID OR VESSEL HULL ID NUMBER"
                                value={vehicle.vinNumber}
                                onChange={(val) => handleVehicleChange(idx, "vinNumber", val)}
                            />
                        </div>
                        <div className="flex flex-wrap items-start gap-4 mt-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={vehicle.leased}
                                    onChange={(e) =>
                                        handleVehicleChange(idx, "leased", e.target.checked)
                                    }
                                />
                                CHECK IF LEASED
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={vehicle.registeredOutsideCA}
                                    onChange={(e) =>
                                        handleVehicleChange(idx, "registeredOutsideCA", e.target.checked)
                                    }
                                />
                                CHECK IF REGISTERED OUTSIDE CA
                            </label>
                        </div>
                    </div>
                ))}

                {values.length < maxVehicles && (
                    <button
                        type="button"
                        onClick={handleAddVehicle}
                        className="flex items-center mx-auto gap-2 px-4 py-2 border border-gray-400 text-sm rounded hover:bg-gray-100"
                    >
                        <span className="text-xl">＋</span> Add another vehicle
                    </button>
                )}

                {values.length >= maxVehicles && (
                    <p className="text-red-500 mt-2 flex justify-center">
                        Maximum number of vehicles reached ({maxVehicles})
                    </p>
                )}
            </Section>
            {leasedVehicleFlag && (
                <Section title={''}>
                    <Input
                        label={"LEASING COMPANY'S NAME"}
                        placeholder="LEASING COMPANY'S NAME"
                        value={leasaedCompanyName}
                        onChange={(val) => handleCompanyNameChange(val)}
                    />
                </Section>
            )}
        </>
    );
};

export default VehiclesSection;
