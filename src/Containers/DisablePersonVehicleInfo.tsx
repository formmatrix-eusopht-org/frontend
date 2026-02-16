import React from "react";

type Field = {
    label: string;
    key: keyof DpVehicleInfo; // tightened to your keys
    placeholder?: string;
};

export type DpVehicleInfo = {
    plate: string;
    vin: string;
    make: string;
    year: string;
};

type Props = {
    title: string;
    values: DpVehicleInfo;
    onChange: React.Dispatch<React.SetStateAction<DpVehicleInfo>>; // accept parent's setState
    fields: Field[];
    className?: string;
};

export default function DisablePersonVehicleInfo({
    title,
    values,
    onChange,
    fields,
    className = "",
}: Props) {
    const handleChange = (key: keyof DpVehicleInfo, raw: string) => {
        const upper = raw.toUpperCase();
        onChange(prev => ({ ...prev, [key]: upper }));
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <h3 className="text-black px-2 py-1 font-semibold text-sm  uppercase">{title}</h3>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {fields.map((field) => (
                                <th
                                    key={String(field.key)}
                                    className="px-3 py-2 border border-gray-300 font-semibold uppercase text-[10px] text-center"
                                >
                                    {field.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            {fields.map((field) => (
                                <td key={String(field.key)} className="border border-gray-300">
                                    <input
                                        type="text"
                                        value={values[field.key] ?? ""}
                                        placeholder={field.placeholder}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        className="px-4 py-4 w-full text-center py-1 text-xs"
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
