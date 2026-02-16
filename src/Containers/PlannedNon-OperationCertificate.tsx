import { Trash2 } from "lucide-react";

type Field = {
    label: string;
    key: string;
    placeholder: string;
};

type Vehicle = {
    plate: string;
    vin: string;
    make: string;
    equipment?: string;
};

type Props = {
    title: string;
    vehicles: Vehicle[];
    onChange: (index: number, field: string, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    fields: Field[];
};

export default function PlannedNonOperation({
    title,
    vehicles,
    onChange,
    onAdd,
    onRemove,
    fields,
}: Props) {
    return (
        <div className="space-y-4">
            <h3 className="text-black px-2 py-1 font-semibold text-sm uppercase">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {fields.map((field) => (
                                <th key={field.key} className="px-3 py-2 border border-gray-300 font-semibold uppercase text-[10px]">
                                    {field.label}
                                </th>
                            ))}
                            <th className="px-3 py-2 border border-gray-300 font-semibold uppercase text-[12px] text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle, idx) => (
                            <tr key={idx}>
                                {fields.map((field) => (
                                    <td key={field.key} className="px-3 py-2 border border-gray-300">
                                        <input
                                            type="text"
                                            value={vehicle[field.key as keyof Vehicle] || ""}
                                            placeholder={field.placeholder}
                                            onChange={(e) => onChange(idx, field.key, (e.target.value).toUpperCase())}
                                            className="w-full rounded px-2 py-1 text-sm"
                                        />
                                    </td>
                                ))}
                                <td className="px-3 py-2 border border-gray-300 text-center">
                                    <button onClick={() => onRemove(idx)} className="text-red-600 hover:text-red-800">
                                        <Trash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={onAdd}
                className="flex items-center mx-auto gap-2 px-4 py-2 border border-gray-400 text-sm rounded hover:bg-gray-100"
            >
                <span className="text-xl">＋</span> Add another vehicle
            </button>
        </div>
    );
}
