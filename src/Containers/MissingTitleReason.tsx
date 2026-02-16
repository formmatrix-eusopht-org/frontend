import React from 'react';
import Section from '../Components/FieldSection';
import SelectDropDown from '../Components/SelectDropDown';
import { missingTitleReason } from '../Data/missingtitleReason';
import CustomDropdown from '../Components/CustomDropDown';

type MissingTitleReasonProps = {
  title: string;
  selectedReason: string;
  onReasonChange: (value: string) => void;
};

export const MissingTitleReason = ({
  title,
  selectedReason,
  onReasonChange,
}: MissingTitleReasonProps) => {
  return (
    <div className="pb-4">
      <Section title={title}>
        <div className="flex items-center gap-2 mb-4 w-[90%]">
          <CustomDropdown
            value={selectedReason}
            onChange={onReasonChange}
            options={missingTitleReason.map(option => ({
              ...option,
              label: option.name
            }))}
            placeholder="Select a reason"
            className='h-[2rem] text-[13px] rounded'
          />
        </div>
      </Section>
    </div>
  );
};
