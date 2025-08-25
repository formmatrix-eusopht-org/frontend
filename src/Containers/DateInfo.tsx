import Section from "../Components/FieldSection";
import { DateInputField } from "../Components/DateInputField";

type DateSubField = {
  label: string;
  type: string;
  placeholder?: string;
};

type DateField = {
  label: string;
  subFields: DateSubField[];
};

type DateBlock = {
  blockName: string;
  reference: string;
  fields: DateField[];
};

type DateInformationProps = {
  title: string;
  block: DateBlock;
  dateValues: Record<string, Record<string, string>>;
  onDateChange: (fieldName: string, subFieldName: string, value: string) => void;
};

export const DateInformation = ({
  title,
  block,
  dateValues,
  onDateChange,
}: DateInformationProps) => {
  // Validate complete dates (month/day/year together)
  const validateCompleteDate = (date: Record<string, string>) => {
    const month = date['Month'];
    const day = date['Day'];
    const year = date['Year'];
    
    if (!month || !day || !year) return true; // Incomplete dates are handled by individual field validation

    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);
    const yearNum = parseInt(year, 10);
    const dateObj = new Date(yearNum, monthNum - 1, dayNum);

    // Check if the date is valid (accounts for things like Feb 30)
    return (
      dateObj.getFullYear() === yearNum &&
      dateObj.getMonth() === monthNum - 1 &&
      dateObj.getDate() === dayNum
    );
  };

  return (
    <div className="mb-4">
      <Section title={title}>
        <div className="space-y-4">
          {block.fields.map((field, index) => {
            const currentDate = dateValues[field.label] || {};
            const isDateValid = validateCompleteDate(currentDate);

            return (
              <div key={index} className="space-y-2">
                <h3 className="text-sm text-gray-500 font-medium">{field.label}</h3>
                <div className="flex gap-4">
                  {field.subFields.map((subField, subIndex) => (
                    <DateInputField
                      key={subIndex}
                      label={subField.label}
                      placeholder={subField.placeholder}
                      value={currentDate[subField.label] || ''}
                      onChange={(val) => onDateChange(field.label, subField.label, val)}
                      required
                    />
                  ))}
                </div>
                {!isDateValid && currentDate['Month'] && currentDate['Day'] && currentDate['Year'] && (
                  <p className="text-red-500 text-xs">
                    Invalid date combination
                  </p>
                )}
                {index < block.fields.length - 1 && (
                  <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700 my-3" />
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};