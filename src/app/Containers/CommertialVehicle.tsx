import React from "react";
import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";
import Checkbox from "../Components/CheckBox";

type Props = {
  title: string;
  block: any; // Optional, if needed for dynamic metadata
  isCommercialVehicle: boolean; // Flag to indicate if this is a commercial vehicle
  values: Record<string, any>;
  onChange: (label: string, value: any) => void;
};

const CommercialVehicleInfo: React.FC<Props> = ({ title, block, values, onChange, isCommercialVehicle }) => {
  return (
    <div className="pb-4">
      <Section title={title}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Enter number"
            label="Number of axles:"
            value={values["Number of axles"] || ""}
            onChange={(e) => onChange("Number of axles", e)}
          />
          <Input
            placeholder="Enter weight"
            label="Unladen weight:"
            value={values["Unladen weight"] || ""}
            onChange={(e) => onChange("Unladen weight", e)}
          />
          <Input
            placeholder="Body type"
            label="Body Model Type:"
            value={values["Body Model Type"] || ""}
            onChange={(e) => onChange("Body Model Type", e)}
          />
        </div>

        <Checkbox
          label="ACTUAL"
          checked={values["Weight Actual"] || false}
          onChange={() => {
            onChange("Weight Actual", true);
            onChange("Weight Estimated", false);
          }}
        />
        <Checkbox
          label="ESTIMATED (VEHICLES OVER 10,001 LBS. ONLY)"
          checked={values["Weight Estimated"] || false}
          onChange={() => {
            onChange("Weight Estimated", true);
            onChange("Weight Actual", false);
          }}
        />
        {isCommercialVehicle && (
          <>
            <Input
              label="Type of Vehicle"
              type="dropdown"
              placeholder="Select Vehicle Type"
              className="!h-[30px] !max-w-[40rem] mt-2"
              value={values["vehicletype"] || ""}
              onChange={(e) => onChange("vehicletype", e)}
              options={[
                { label: "Bus", value: "Bus" },
                { label: "Taxicab", value: "Taxicab" },
                { label: "Rental Limousine", value: "Rental Limousine" },
                { label: "Ambulance", value: "Ambulance" },
                { label: "Station Wagon", value: "Station Wagon" },
              ]}
            />
            {values["vehicletype"] === "Station Wagon" && (
              <div className="mt-6">
                <p className="text-md mb-4">
                  This station wagon will be used in business and I am:
                </p>
                <Checkbox
                  label="The owner of this vehicle and it is registered in my name"
                  checked={values["The owner of this vehicle and it is registered in my name"] || false}
                  onChange={() => {
                    onChange("The owner of this vehicle and it is registered in my name", true);
                    onChange(
                      "Employee of a business which required me to own and operate a station wagon which is registered in my name",
                      false
                    );
                  }}
                />
                <Checkbox
                  label="Employee of a business which required me to own and operate a station wagon which is registered in my name"
                  checked={values["Employee of a business which required me to own and operate a station wagon which is registered in my name"] || false}
                  onChange={() => {
                    onChange(
                      "Employee of a business which required me to own and operate a station wagon which is registered in my name",
                      true
                    );
                    onChange("The owner of this vehicle and it is registered in my name", false);
                  }}
                />
              </div>

            )}
            <Input
              label="I'll start using this vehicle commercially on:"
              type="date"
              placeholder="MM/DD/YYYY"
              className="!h-[30px] !max-w-[40rem]"
              value={values["commercialStartDate"] || ""}
              onChange={(e) => onChange("commercialStartDate", e)}
            />
          </>
        )}
        <div className="mt-6">
          <p className="text-sm mb-1">
            Will this vehicle be used for the transportation of persons for hire, compensation, or profit (e.g.
            limousine, taxi, bus, etc.)?
          </p>
          <div className="flex gap-4">
            <Checkbox
              label="Yes"
              checked={values["Hire Transport Yes"] || false}
              onChange={() => {
                onChange("Hire Transport Yes", true);
                onChange("Hire Transport No", false);
              }}
            />
            <Checkbox
              label="No"
              checked={values["Hire Transport No"] || false}
              onChange={() => {
                onChange("Hire Transport No", true);
                onChange("Hire Transport Yes", false);
              }}
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm mb-1">
            Is this a commercial vehicle that operates at 10,001 lbs. or more (or is a pickup exceeding 8,001 lbs.
            unladen and/or 11,499 lbs. Gross Vehicle Weight Rating (GVWR))?
          </p>
          <div className="flex gap-4">
            <Checkbox
              label="Yes"
              checked={values["GVWR Yes"] || false}
              onChange={() => {
                onChange("GVWR Yes", true);
                onChange("GVWR No", false);
              }}
            />
            <Checkbox
              label="No"
              checked={values["GVWR No"] || false}
              onChange={() => {
                onChange("GVWR No", true);
                onChange("GVWR Yes", false);
              }}
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CommercialVehicleInfo;
