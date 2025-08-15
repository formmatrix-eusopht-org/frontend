// app/Components/FormActions.tsx
'use client';

import React from 'react';
import Checkbox from "../Components/CheckBox";
import Section from '../Components/FieldSection';

interface OptionsProps {
    selected: string[];
    block?: any;
    onChange: (updated: string[]) => void;
}

const Options: React.FC<OptionsProps> = ({ selected, onChange, block }) => {
    const options = block.fields;

    const handleCheckboxChange = (option: string) => {
        const updated = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];

        onChange(updated);
    };

    return (
        <div className="grid">
            <Section title="Options">
                {options.map((option: any) => (
                    <Checkbox
                        key={option.label}
                        label={option.label}
                        checked={selected.includes(option.label)}
                        onChange={() => handleCheckboxChange(option.label)}
                    />
                ))}
            </Section>
        </div>
    );
};

export default Options;
