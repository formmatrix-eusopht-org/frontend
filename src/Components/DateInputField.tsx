import { useState, useEffect } from 'react';

type DateInputFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
};

export const DateInputField = ({
    label,
    value,
    onChange,
    placeholder,
    className = '',
    required = false,
}: DateInputFieldProps) => {
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (touched) {
            validateInput(value);
        }
    }, [value, touched]);

    const validateInput = (val: string) => {
        if (required && !val) {
            setError('This field is required');
            return false;
        }

        if (!val) {
            setError(null);
            return true;
        }

        const numValue = parseInt(val, 10);

        if (isNaN(numValue)) {
            setError('Must be a number');
            return false;
        }

        if (label === 'Month' && (numValue < 1 || numValue > 12)) {
            setError('Must be 1-12');
            return false;
        }

        if (label === 'Day' && (numValue < 1 || numValue > 31)) {
            setError('Must be 1-31');
            return false;
        }

        if (label === 'Year') {
            const currentYear = new Date().getFullYear();
            if (numValue < 1900 || numValue > currentYear) {
                setError(`Must be 1900-${currentYear}`);
                return false;
            }
        }

        setError(null);
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        // Only allow numbers
        if (val && !/^\d*$/.test(val)) return;

        // Limit length based on field type
        const maxLength = label === 'Year' ? 4 : 2;
        if (val.length > maxLength) return;

        onChange(val);
    };

    const handleBlur = () => {
        setTouched(true);
        validateInput(value);
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <label className="text-[12px] text-gray-500 font-medium mb-1 whitespace-nowrap overflow-hidden text-ellipsis" title={label}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`border rounded px-3 w-20 h-6 py-2 ${error ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs bg-gray-100`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};