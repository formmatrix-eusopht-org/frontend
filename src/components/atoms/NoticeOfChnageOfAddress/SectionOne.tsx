import React, { useState, useEffect } from 'react';
import { useFormContext } from '../../../app/api/formDataContext/formDataContextProvider';
import './SectionOne.css';

interface SectionOneData {
  lastName?: string;
  firstName?: string;
  initial?: string;
  birthDate?: string;
  driverLicenseId?: string;
}

interface SectionOneProps {
  formData?: {
    personalBusinessInfo?: SectionOneData;
  };
}

const initialSectionOneData: SectionOneData = {
  lastName: '',
  firstName: '',
  initial: '',
  birthDate: '',
  driverLicenseId: '',
};

const SectionOne: React.FC<SectionOneProps> = ({ formData: propFormData }) => {
  const { formData: contextFormData, updateField } = useFormContext();
  const [formState, setFormState] = useState<SectionOneData>(
    propFormData?.personalBusinessInfo || initialSectionOneData,
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const formData = {
    ...contextFormData,
    ...propFormData,
  };

  useEffect(() => {
    if (!formData.personalBusinessInfo) {
      updateField('personalBusinessInfo', initialSectionOneData);
    }
  }, []);

  useEffect(() => {
    if (formData.personalBusinessInfo) {
      setFormState(formData.personalBusinessInfo);
    }
  }, [formData.personalBusinessInfo]);

  useEffect(() => {
    console.log('Current SectionOne form data:', formData.personalBusinessInfo);
  }, [formData.personalBusinessInfo]);

  const capitalizeFirstLetter = (value: string): string => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleInputChange = (field: keyof SectionOneData, value: string) => {
    const capitalizedValue = capitalizeFirstLetter(value);

    let hasError = false;
    if (field === 'lastName' && value.length > 20) {
      hasError = true;
    } else if (field === 'firstName' && value.length > 9) {
      hasError = true;
    } else if (field === 'driverLicenseId' && value.length > 0 && value.length < 8) {
      hasError = true;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: hasError,
    }));

    const newData = {
      ...formState,
      [field]: capitalizedValue,
    };
    setFormState(newData);
    updateField('personalBusinessInfo', newData);
  };

  // const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let value = e.target.value.replace(/\D/g, '');
  //   if (value.length > 2) {
  //     value = value.slice(0, 2) + '/' + value.slice(2);
  //   }
  //   if (value.length > 5) {
  //     value = value.slice(0, 5) + '/' + value.slice(5);
  //   }
  //   value = value.slice(0, 10);

  //   handleInputChange('birthDate', value);
  // };
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 8); // Keep max 8 digits
    digits = sanitizeDateDigits(digits);
    const formatted = formatDate(digits);
    handleInputChange('birthDate', formatted);
  };

  function sanitizeDateDigits(digits: string): string {
    let mm = digits.slice(0, 2);
    let dd = digits.slice(2, 4);
    const yyyy = digits.slice(4, 8);

    // Clamp month to 01-12
    if (mm.length === 2) {
      let month = parseInt(mm, 10) || 1;
      month = Math.max(1, Math.min(12, month));
      mm = String(month).padStart(2, '0');
    }

    // Determine max days in the month
    let maxDays = 31;
    if (mm.length === 2) {
      const month = parseInt(mm, 10);
      const year = yyyy.length === 4 ? parseInt(yyyy, 10) : 2000; // Default to leap year if partial
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      maxDays = daysInMonth[month - 1] || 31; // Adjust for 0-based index
    }

    // Clamp day to 01-maxDays
    if (dd.length === 2) {
      let day = parseInt(dd, 10) || 1;
      day = Math.max(1, Math.min(maxDays, day));
      dd = String(day).padStart(2, '0');
    }

    return mm + dd + yyyy;
  }

  function formatDate(digits: string): string {
    // Remove any existing slashes and non-digits first
    digits = digits.replace(/\D/g, '');
    
    // Handle empty input
    if (!digits) return ''; // Ensure it always returns a string
    
    // Slice the digits into appropriate parts
    const mm = digits.slice(0, 2);
    const dd = digits.slice(2, 4);
    const yyyy = digits.slice(4, 8);
    
    // Build the formatted date string
    if (mm) {
      // Start with month
      let formatted = mm;
      
      // Add day if available
      if (dd) {
        formatted += '/' + dd;
        
        // Add year if available (could be partial)
        if (yyyy) {
          formatted += '/' + yyyy;
        }
      }
      
      return formatted;
    }
    
    return '';
  }

  return (
    <div className="section-one-container">
      <div className="section-header">
        <span className="section-title">PERSONAL OR BUSINESS INFORMATION</span>
      </div>

      <div className="formcontent">
        {/* Name row with last, first, initial */}
        <div className="name-row">
          <div className="input-group first-name">
            <label className="input-label">FIRST</label>
            <input
              type="text"
              className={`standard-input ${errors.firstName ? 'input-error' : ''}`}
              placeholder='FIRST NAME'
              value={formState.firstName?.toUpperCase() || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value.toUpperCase())}
              maxLength={9}
            />
            {errors.firstName && <div className="error-message">Maximum 9 characters</div>}
          </div>
          <div className="input-group last-name">
            <label className="input-label">LAST NAME OR BUSINESS NAME</label>
            <input
              type="text"
              className={`standard-input ${errors.lastName ? 'input-error' : ''}`}
              value={formState.lastName?.toUpperCase() || ''}
              placeholder='LAST NAME OR BUSINESS NAME'
              onChange={(e) => handleInputChange('lastName', e.target.value.toUpperCase())}
              maxLength={20}
            />
            {errors.lastName && <div className="error-message">Maximum 20 characters</div>}
          </div>

          <div className="input-group initial">
            <label className="input-label">INITIAL</label>
            <input
              type="text"
              className="standard-input initial-input"
              value={formState.initial?.toUpperCase() || ''}
              placeholder='INITIAL'
              onChange={(e) => handleInputChange('initial', e.target.value.toUpperCase())}
              maxLength={1}
            />
          </div>
        </div>

        {/* ID row with birth date and driver license */}
        <div className="id-row">
          <div className="input-group birth-date">
            <label className="input-label">BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)</label>
            <input
              type="text"
              className="standard-input"
              placeholder={'MM/DD/YYYY'}
              // format for display
              value={formatDate(formState.birthDate || '')}
              onChange={handleBirthDateChange}
              maxLength={10}
              inputMode="numeric"
            />
          </div>

          <div className="input-group driver-license">
            <label className="input-label">
              DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)
            </label>
            <input
              type="text"
              placeholder='DL/ID NUMBER'
              className={`standard-input ${errors.driverLicenseId ? 'input-error' : ''}`}
              value={formState.driverLicenseId || ''}
              onChange={(e) => handleInputChange('driverLicenseId', e.target.value)}
              maxLength={8}
            />
            {errors.driverLicenseId && (
              <div className="error-message">Must be exactly 8 characters</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
