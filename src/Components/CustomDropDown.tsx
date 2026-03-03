import React, { useRef, useEffect, useState } from "react";

interface Option {
  label: string;
  value: string;
  [key: string]: any;
}

interface CustomDropdownProps {
  value: string | number;
  onChange: (val: string, label: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const selectedOption = options.find((opt) => opt.value === value);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setHighlightedIndex(
      selectedOption ? options.findIndex((o) => o.value === selectedOption.value) : -1
    );
  };

  const handleSelect = (val: string) => {
    const selected = options.find((opt) => opt.value === val);
    onChange(val, selected?.label ?? "");
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < options.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : options.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelect(options[highlightedIndex].value);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Auto-scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={`w-full bg-white border border-gray-300 flex items-center justify-between px-2 text-left
          ${!selectedOption ? "text-gray-400" : "text-gray-800"}
          ${className} overflow-hidden`}
      >
        <span className="truncate overflow-hidden whitespace-nowrap min-w-0 flex-1">{selectedOption?.label || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""} ml-2`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto z-20">
          {options.map((opt, index) => (
            <li
              key={opt.value}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 text-[13px] cursor-pointer
                ${highlightedIndex === index
                  ? "bg-black text-white"
                  : value === opt.value
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-600 hover:bg-black hover:text-white"
                } whitespace-nowrap overflow-hidden text-ellipsis`}
              title={opt.label}
            >
              {opt.label}
            </li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
