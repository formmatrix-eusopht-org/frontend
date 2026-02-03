//right side part of form to show relevant sections calling here
'use client'
import Checkbox from "@/Components/CheckBox";
import Section from "@/Components/FieldSection";
import { useSenerioContext } from "@/Contexts/SenerioContext";
import { sidebarSections } from "@/Data/sidebarCheckboxData";

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
        // Uncheck parent and all its sub-options
        return prev.filter((item) => item !== label && !subOptions.includes(item));
      } else {
        let updated = [...prev, label];

        // Auto-select first subOption if radio is true
        if (selectedOption?.radio && subOptions.length > 0) {
          updated.push(subOptions[0]);
        }

        // Special case for Duplicate Stickers
        if (label === "Duplicate Stickers") {
          updated = [...updated, ...subOptions.filter((s) => !prev.includes(s))];
        }

        return updated;
      }
    });
  };


  return (
    <div className="w-[400px] fixed right-0 top-[112px] bottom-[30px] rounded-xl shadow-lg z-40 bg-white flex flex-col">
      <aside className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Transactions</h2>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </div>

        {/* Scrollable section */}
        <div className="overflow-y-auto px-6 pb-6 flex-1">
          <div className="flex flex-col grid-cols-1 gap-1">
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
                                setSenerio((prev: string[]) => {
                                  if (option.radio) {
                                    const siblings = subOptions;

                                    // If the clicked one is already selected, do nothing (can't unselect in radio mode)
                                    if (prev.includes(sub)) {
                                      return prev;
                                    }

                                    // Radio-like: remove all siblings, add the new one
                                    let updated = prev.filter((item) => !siblings.includes(item));
                                    updated.push(sub);
                                    return updated;
                                  } else {
                                    // Normal checkbox behavior
                                    return prev.includes(sub)
                                      ? prev.filter((item) => item !== sub)
                                      : [...prev, sub];
                                  }
                                })
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