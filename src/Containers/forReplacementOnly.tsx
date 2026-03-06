import React from "react";
import Input from "../Components/InputControl";
import Section from "../Components/FieldSection";

interface ReplacementProps {
  block: any;
  values: {
    plateNumber: string;
    need: string;
    plateCondition: string;
  };
  onChange: React.Dispatch<React.SetStateAction<any>>;
}

const ReplacementOnlySection: React.FC<ReplacementProps> = ({ values, onChange }) => {
  const handleTextChange = (label: string, val: string) => {
    onChange((prev: any) => ({
      ...prev,
      [label]: val,
    }));
  };

  // toggle-like radio
  const handleToggle = (group: "need" | "plateCondition", value: string) => {
    onChange((prev: any) => ({
      ...prev,
      [group]: prev[group] === value ? "" : value, // deselect if same
    }));
  };

  return (
    <Section title="FOR REPLACEMENT ONLY">
      <div className="mb-2 flex items-center">
        {/* Plate number input */}
        <div>
          <Input
            type="text"
            label="SPECIAL INTEREST LICENSE PLATE NUMBER"
            placeholder="ENTER PLATE NUMBER"
            value={values.plateNumber || ""}
            className="w-[23rem]"
            onChange={(val) => handleTextChange("plateNumber", val)}
          />
        </div>

        {/* Vertical line */}
        <div className="mx-4 pt-4 h-full flex items-stretch">
          <hr className="h-[3rem] border-l border-gray-300" />
        </div>

        {/* Note */}
        <div className="text-sm pt-6 text-gray-600">
          If BOTH plates were lost or stolen, the same configuration cannot be
          reissued on any plate type.
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* I NEED section */}
      <div className="flex flex-col gap-4 mt-4">

        {/* I NEED */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-[14px]">I NEED:</span>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={values.need === "onePlate"}
              onChange={() => handleToggle("need", "onePlate")}
            />
            One Plate
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={values.need === "twoPlates"}
              onChange={() => handleToggle("need", "twoPlates")}
            />
            Two Plates
          </label>
        </div>

        {/* PLATE(S) WERE */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-[14px]">PLATE(S) WERE:</span>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={values.plateCondition === "lost"}
              onChange={() => handleToggle("plateCondition", "lost")}
            />
            Lost
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={values.plateCondition === "mutilated"}
              onChange={() => handleToggle("plateCondition", "mutilated")}
            />
            Mutilated
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={values.plateCondition === "stolen"}
              onChange={() => handleToggle("plateCondition", "stolen")}
            />
            Stolen
          </label>
        </div>

      </div>
    </Section>
  );
};

export default ReplacementOnlySection;
