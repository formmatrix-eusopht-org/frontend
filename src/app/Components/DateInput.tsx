type DateInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
};

export const DateInput = ({ label, placeholder, value, onChange, className }: DateInputProps) => {
  const formatDate = (input: string) => {
    const numbers = input.replace(/\D/g, "").slice(0, 8); // MMDDYYYY
    let month = numbers.slice(0, 2);
    let day = numbers.slice(2, 4);
    let year = numbers.slice(4);

    if (month.length === 2) {
      const numMonth = Math.min(parseInt(month, 10), 12);
      month = numMonth.toString().padStart(2, "0");
    }
    if (day.length === 2) {
      const numDay = Math.min(parseInt(day, 10), 31);
      day = numDay.toString().padStart(2, "0");
    }
    if (year.length > 4) {
      year = year.slice(0, 4);
    }

    return [month, day, year].filter(Boolean).join("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    onChange(formatted); // ✅ notify parent
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md px-3 py-2 text-sm ${className}`}
        inputMode="numeric"
        maxLength={10}
      />
    </div>
  );
};
