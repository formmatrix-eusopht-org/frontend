import React from "react";
import Section from "../Components/FieldSection";
import Checkbox from "../Components/CheckBox";
import RadioButton from "../Components/RadioButton";
import Input from "../Components/InputControl";

type Field = {
  label: string;
  type: "checkbox" | "radio";
  placeholder?: string;
};

type Props = {
  title: string;
  block: {
    reference: string;
    blockName: string;
    fields: Field[];
  };
  values: {
    licensePlatesAssignedTo: string;
    platesSurrendered: string;
    occupationalLicenseNumber: string;
  };
  onChange: (label: string, value: string) => void;
};

const CertificateOfLicensePlateDisposition: React.FC<Props> = ({
  title,
  block,
  values,
  onChange,
}) => {
  return (
    <Section title={title}>
      <div className="mb-2 font-medium">The license plates assigned to this vehicle:</div>

      {block?.fields?.map((field) => (
        <div key={field.label}>
          <Checkbox
            label={field.label}
            checked={values.licensePlatesAssignedTo === field.label}
            onChange={() =>
              onChange("licensePlatesAssignedTo", field.label)
            }
          />

          {/* If "ARE BEING SURRENDERED" is selected, show ONE/TWO radios */}
          {values.licensePlatesAssignedTo === "ARE BEING SURRENDERED" &&
            field.label === "ARE BEING SURRENDERED" && (
              <div className="mt-2 ml-6">
                <p className="text-sm mb-1 font-medium">Plates surrendered:</p>
                <div className="flex items-center gap-4">
                  <RadioButton
                    label="ONE"
                    name="plates_surrendered"
                    value="ONE"
                    checked={values.platesSurrendered === "ONE"}
                    className="!font-sm"
                    onChange={(val) => onChange("platesSurrendered", val)}
                  />
                  <RadioButton
                    label="TWO"
                    name="plates_surrendered"
                    value="TWO"
                    checked={values.platesSurrendered === "TWO"}
                    className="!font-sm"
                    onChange={(val) => onChange("platesSurrendered", val)}
                  />
                </div>
              </div>
            )}

          {/* If "HAVE BEEN DESTROYED..." is selected, show input */}
          {values.licensePlatesAssignedTo === "HAVE BEEN DESTROYED (OCCUPATIONAL LICENSEES ONLY)" &&
            field.label === "HAVE BEEN DESTROYED (OCCUPATIONAL LICENSEES ONLY)" && (
              <div className="ml-6 flex items-center gap-4 pt-2">
                <p className="text-sm font-medium">Occupational License Number</p>
                <Input
                  label=""
                  type="text"
                  placeholder="Enter License Number"
                  value={values.occupationalLicenseNumber}
                  onChange={(e) =>
                    onChange("occupationalLicenseNumber", e)
                  }
                  className="!mt-0 mb-2"
                />
              </div>
            )}
        </div>
      ))}
    </Section>
  );
};

export default CertificateOfLicensePlateDisposition;
