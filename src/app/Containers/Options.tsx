// app/Components/FormActions.tsx
'use client';

import React from 'react';
import Checkbox from "../Components/CheckBox";
import Section from '../Components/FieldSection';

interface OptionsProps {
    selected: string[];
    onChange: (updated: string[]) => void;
}

const Options: React.FC<OptionsProps> = ({ selected, onChange }) => {
    const options = ["Option A", "Option B", "Option C", "Option D"];

    const handleCheckboxChange = (option: string) => {
        const updated = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];

        onChange(updated);
    };

    return (
        <div className="grid">
            <Section title="Options">
                {options.map((option) => (
                    <Checkbox
                        key={option}
                        label={option}
                        checked={selected.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                ))}
            </Section>
        </div>
    );
};

export default Options;
