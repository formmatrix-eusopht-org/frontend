'use client'

import Checkbox from "@/app/Components/CheckBox";
import Section from "@/app/Components/FieldSection";
import { useSenerioContext } from "@/app/Contexts/SenerioContext";
import { sidebarSections } from "@/app/Data/sidebarCheckboxData";

export default function Sidebar() {
  const { senerio, setSenerio } = useSenerioContext();

  const handleCheckboxChange = (label: string) => {
    const selectedOption = sidebarSections
      .flatMap((section) => section.options)
      .find((opt) => typeof opt === "object" && opt.label === label);

    const subOptions =
      typeof selectedOption === "object" && Array.isArray(selectedOption.subOptions)
        ? selectedOption.subOptions
        : [];

    setSenerio((prev: string[]) => {
      const isChecked = prev.includes(label);

      if (isChecked) {
        // Uncheck parent and remove its sub-options
        return prev.filter((item) => item !== label && !subOptions.includes(item));
      } else {
        // On first check of "Duplicate Stickers", also check its sub-options
        if (label === "Duplicate Stickers") {
          return [...prev, label, ...subOptions.filter((s) => !prev.includes(s))];
        }
        return [...prev, label];
      }
    });
  };

  return (
    <div className="min-w-8/20 fixed right-0 top-[90px] bottom-[30px] rounded-xl shadow-lg z-40 bg-white flex flex-col">
      <aside className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Transactions</h2>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </div>

        {/* Scrollable section */}
        <div className="overflow-y-auto px-6 pb-6 flex-1">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-1">
            {sidebarSections.map((section) => (
              <Section key={section.title} title={section.title}>
                {section.options.map((option) => {
                  const isDisabled = (label: string, disabledWhen: string[] = []) =>
                    disabledWhen.some((blockedBy) => senerio.includes(blockedBy));

                  const label = typeof option === "string" ? option : option.label;
                  const subOptions =
                    typeof option === "object" && "subOptions" in option && Array.isArray(option.subOptions)
                      ? option.subOptions
                      : [];
                  const disabledWhen =
                    typeof option === "object" && "disabledWhen" in option && Array.isArray(option.disabledWhen)
                      ? option.disabledWhen
                      : [];

                  const isChecked = senerio.includes(label);
                  const isOptionDisabled = isDisabled(label, disabledWhen);

                  return (
                    <div key={label} className="ml-2">
                      <Checkbox
                        label={label}
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(label)}
                        disabled={isOptionDisabled}
                      />
                      {isChecked && subOptions.length > 0 && (
                        <div className="ml-6 space-y-1 mt-1 grid grid-cols-1">
                          {subOptions.map((sub) => (
                            <Checkbox
                              key={sub}
                              label={sub}
                              checked={senerio.includes(sub)}
                              onChange={() =>
                                setSenerio((prev: string[]) =>
                                  prev.includes(sub)
                                    ? prev.filter((item) => item !== sub)
                                    : [...prev, sub]
                                )
                              }
                            />
                          ))}

                        </div>
                      )}
                    </div>
                  );
                })}

              </Section>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}