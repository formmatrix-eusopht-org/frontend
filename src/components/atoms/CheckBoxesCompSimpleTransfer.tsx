'use client';
import React, { useState, useEffect } from 'react';
import { useFormContext } from '../../app/api/formDataContext/formDataContextProvider';
import './SmogExemption.css';

type CheckboxKey =
  | 'Copy of Buyer’s Driver’s License or ID'
  | 'Smog Certificate'
  | 'DMV Authorized Agent HandFill REG 31';

interface CheckboxOptionsType {
  options?: Partial<Record<CheckboxKey, boolean>>;
}

interface ContextFormDataType {
  checkboxOptions?: CheckboxOptionsType;
  [key: string]: any;
}

interface CheckboxOptionsProps {
  formData?: {
    checkboxOptions?: CheckboxOptionsType;
  };
  onChange?: (data: CheckboxOptionsType) => void;
}

const CheckboxOptions: React.FC<CheckboxOptionsProps> = ({ formData: propFormData, onChange }) => {
  const { formData: contextFormData, updateField } = useFormContext() as {
    formData: ContextFormDataType;
    updateField: (field: string, value: any) => void;
  };
  console.log('CheckboxOptions formData:', contextFormData);

  const propCheckboxOptions = propFormData?.checkboxOptions;
  const contextCheckboxOptions = contextFormData?.checkboxOptions;

  const [checkboxData, setCheckboxData] = useState<CheckboxOptionsType>(
    propCheckboxOptions ||
      contextCheckboxOptions || {
        options: {},
      },
  );

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem('checkboxOptions');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCheckboxData(parsedData);
      updateField('checkboxOptions', parsedData);

      if (onChange) {
        onChange(parsedData);
      }
    }
  }, []);

  useEffect(() => {
    const currentCheckboxOptions = propCheckboxOptions || contextCheckboxOptions;
    if (currentCheckboxOptions) {
      setCheckboxData(currentCheckboxOptions);
    }
  }, [propCheckboxOptions, contextCheckboxOptions]);

  const handleCheckboxChange = (optionKey: CheckboxKey) => {
    const newOptions = {
      ...checkboxData.options,
      [optionKey]: !(checkboxData.options?.[optionKey] ?? false),
    };

    const newCheckboxData = {
      ...checkboxData,
      options: newOptions,
    };

    // Update state
    setCheckboxData(newCheckboxData);

    // Update context
    updateField('checkboxOptions', newCheckboxData);

    // Save to localStorage
    localStorage.setItem('checkboxOptions', JSON.stringify(newCheckboxData));

    // Call onChange prop if provided
    if (onChange) {
      onChange(newCheckboxData);
    }
  };

  return (
    <div className="smogWrapper">
      <div className="smogHeader">
        <h3 className="checkboxTitle">Select Options</h3>
      </div>

      <div className="checkboxContent">
        {/* Main checkboxes */}
        <div className="checkboxGroup">
          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={checkboxData.options?.optionA || false}
              onChange={() => handleCheckboxChange('optionA')}
            />
            Option A
          </label>

          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={checkboxData.options?.optionB || false}
              onChange={() => handleCheckboxChange('optionB')}
            />
            Option B
          </label>

          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={checkboxData.options?.optionC || false}
              onChange={() => handleCheckboxChange('optionC')}
            />
            Option C
          </label>

          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={checkboxData.options?.optionD || false}
              onChange={() => handleCheckboxChange('optionD')}
            />
            Option D
          </label>
        </div>
      </div>
    </div>
  );
};

export default CheckboxOptions;
