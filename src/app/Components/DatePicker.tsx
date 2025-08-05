// components/DatePickerInput.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerInputProps = {
    label: string;
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
    label,
    selectedDate,
    onChange,
    placeholder = "Select date",
}) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <DatePicker
                selected={selectedDate}
                onChange={onChange}
                placeholderText={placeholder}
                dateFormat="MM-dd-yyyy" // ← use dashes instead of slashes
                className="w-full p-[6px] border border-gray-300 rounded-sm focus:outline-none focus:ring-black"
            />
        </div>
    );
};

export default DatePickerInput;
