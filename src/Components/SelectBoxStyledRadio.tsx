// SelectBoxStyledRadio.tsx
type Option = {
    label: string;
    value: string;
    disabled?: boolean;
};

type Props = {
    options: Option[];
    selectedValue: string | null;
    onChange: (value: string) => void;
    disabled?: boolean;
};

export default function SelectBoxStyledRadio({ options, selectedValue, onChange, disabled = false }: Props) {
    return (
        <select
            value={selectedValue ?? ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700"
        >
            <option value="" disabled>
                -- Select an option --
            </option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
