import React from "react";
import RadioButton from "../Components/RadioButton";
import Input from "../Components/InputControl";
import CustomDropdown from "../Components/CustomDropDown";

type Props = {
  values: {
    salesTaxPaid: string;
    salesTaxPaidAmount: string; // Added for the input field
    outOfStatePlates: {
      value: string;
      label: string;
    };
  };
  onFieldChange: (fieldName: string, value: string) => void;
  onPlateSelect: (value: string, label: string) => void;
};

const plateOptions = [
  { value: "expired", label: "Expired" },
  { value: "surrendered", label: "Surrendered to CA MNV" },
  { value: "destroyed", label: "Destroyed" },
  { value: "retained", label: "Retained" },
  { value: "returned", label: "Returned to the motor vehicle department of the state of issuance" }
];

const OutOfStateVehicleSection = ({
  values,
  onFieldChange,
  onPlateSelect
}: Props) => {
  return (
    <div className="">
      <h2 className="text-lg font-bold mb-4">
        FOR OUT-OF-STATE OR OUT-OF-COUNTRY VEHICLES
      </h2>
      {/* <div className="border-b pb-4 !mx-4"> */}
      <div className="relative left-[2px]">
        <div>
          <p className="mb-3">
            For vehicles which enter the state within 1 year of purchase, was Sales Tax paid to another state?
          </p>

          <div className="space-y-2">
            {["N/A", "YES", "NO"].map((option) => (
              <RadioButton
                key={option}
                label={option}
                name="salesTaxPaid"
                value={option.toLowerCase()}
                className="text-[12px] ml-6"
                checked={values.salesTaxPaid === option.toLowerCase()}
                onChange={() => onFieldChange("salesTaxPaid", option.toLowerCase())}
              />
            ))}
          </div>
        </div>

        {values.salesTaxPaid === "yes" && (
          <div>
            <div className="flex items-center mt-3">
              <div className="mr-3 text-[14px]">If yes, Enter amount of tax paid $</div>
              <Input
                label=""
                placeholder=""
                type="text"
                className="w-[10rem]"
                value={values.salesTaxPaidAmount || ""}
                onChange={(val) => onFieldChange("salesTaxPaidAmount", val)}
              />
            </div>
            <div className="text-[12px] mt-2 text-gray-500">
              (this amount will be credited toward any Use Tax in CA). If your vehicle was last registered
              in another state, you may be eligible for a Use Tax exemption. For more information, contact
              the Board of Equalization (www.boe.ca.gov).
            </div>
          </div>
        )}

        <div className="pt-2">
          <h3 className="font-bold mb-2">DISPOSITION OF OUT-OF-STATE PLATES:</h3>
          <p className="mb-3 text-[14px]">
            The plates will not be affixed to any vehicle at any time, unless the vehicle is "Dual Registered" in both states.
          </p>
          <div className="w-full max-w-[28rem]">
            <p className="text-[12px]">Out of state plates were:</p>
            <CustomDropdown
              value={values.outOfStatePlates.value}
              options={plateOptions}
              onChange={(val, label) => onPlateSelect(val, label)}
              placeholder="Select an option"
              className="h-8 text-[13px] rounded" // 👈 now this works!
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutOfStateVehicleSection;