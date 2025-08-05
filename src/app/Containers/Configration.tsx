// import React from "react";
// import Checkbox from "../Components/CheckBox";
// import Section from "../Components/FieldSection";
// import Input from "../Components/InputControl";

// type Field = {
//     label: string;
//     type: string;
//     placeholder?: string;
//     description?: string;
// };

// type Block = {
//     reference: string;
//     blockName: string;
//     fields: Field[];
// };

// type PlateChoice = {
//     text: string;
//     meaning: string;
// };

// type State = {
//     assignedTo: string; // Only one can be selected
//     assignedFor: string;
//     vehicleIdentificationNumber: string;
// };


// type Props = {
//     block: Block;
//     value: State;
//     onChange: (newState: State) => void;
// };

// const assignedDescriptions: Record<string, string> = {
//     "Motorcycle": "(Select motorcycle plates will be issued a special interest decal on the left.)",
//     // Add more if needed
// };

// const SelectConfiguration: React.FC<Props> = ({ block, value, onChange }) => {
//     const toggleAssignedTo = (label: string) => {
//         onChange({ ...value, assignedTo: label });
//     };
//     const toggleAssignedFor = (label: string) => {
//         onChange({ ...value, assignedFor: label });
//     };
//     const handlePlateChoiceChange = (
//         index: number,
//         field: "text" | "meaning",
//         val: string
//     ) => {
//         const updatedChoices = [...value.plateChoices];
//         if (!updatedChoices[index]) updatedChoices[index] = { text: "", meaning: "" };
//         updatedChoices[index][field] = val;
//         onChange({ ...value, plateChoices: updatedChoices });
//     };

//     return (
//         <div className="space-y-6">
//             <Section title="SELECT CONFIGURATION">
//                 {/* Assigned To */}
//                 <div>
//                     <p className="font-medium mb-1">PLATES WILL BE ASSIGNED TO:</p>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
//                         {block.fields.map((field, idx) => (
//                             <div
//                                 key={idx}
//                                 className={idx === 3 ? "col-span-2" : ""}
//                             >
//                                 <Checkbox
//                                     label={field.label}
//                                     checked={value.assignedTo.includes(field.label)}
//                                     onChange={() => toggleAssignedTo(field.label)}
//                                 />
//                                 {assignedDescriptions[field.label] && (
//                                     <span className="text-xs text-gray-500">{assignedDescriptions[field.label]}</span>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <hr className="my-8 border-gray-300" />

//                 {/* Plate Type */}
//                 <div className=" text-lg mb-2">
//                     <Checkbox
//                         label="Sequential (Non-Personalized) — Issued in number sequence."
//                         checked={value.assignedFor.includes("Sequential")}
//                         onChange={() => toggleAssignedFor("Sequential")}
//                         className="!text-[16px] font-semibold"
//                     />
//                     <p className="text-sm mb-2 font-normal text-gray-500">Your existing sequential license plate number cannot be re-used. You must submit a copy of your current registration card.</p>
//                     {value.assignedFor === "Sequential" && (
//                         <div className="space-y-2 pt-2">
//                             <h4 className="text-sm mt-2 font-semibold">Sequential plates will be assigned to:</h4>
//                             <Input
//                                 key="CURRENT LICENSE PLATE NUMBER"
//                                 label="CURRENT LICENSE PLATE NUMBER"
//                                 placeholder=""
//                                 type="text"
//                                 className="font-semibold"
//                                 value={value.vehicleIdentificationNumber}
//                                 onChange={(val) => onChange({ ...value, vehicleIdentificationNumber: val })}
//                             />
//                         </div>

//                     )}
//                     <Checkbox
//                         label="Personalized"
//                         checked={value.assignedFor.includes("Personalized")}
//                         onChange={() => toggleAssignedFor("Personalized")}
//                         className="!text-[16px]"
//                     />
//                 </div>

//                 {/* Personalized Section */}
//                 {value.assignedFor === "Personalized" && (
//                     <div className="space-y-4 pt-4 border-t">
//                         <p className="font-semibold uppercase text-sm mb-2">Personalized Configuration Choice</p>
//                         <p className="text-sm text-gray-700 mb-2">
//                             DMV has the right to refuse any combination of letters and/or letters and numbers for any of the following reason(s): it could be considered offensive to good taste and decency in any language or slang term, it substitutes letters for numbers or vice versa (e.g. ROBERT/ROBERT), to look like another personalized plate, or it conflicts with any regular license plate series issued.<br />
//                             <br />
//                             Your application will not be accepted if the <strong>MEANING</strong> of the plate is not entered, even if it appears obvious, OR if the plate configuration is unacceptable.
//                         </p>
//                         <Checkbox
//                             label="If you do NOT want the plate centered, check this box"
//                             checked={value.centered}
//                             onChange={() => onChange({ ...value, centered: !value.centered })}
//                         />
//                         {[0, 1, 2].map((i) => (
//                             <div key={i} className="space-y-2">
//                                 <p className="font-semibold">{["First Choice", "Second Choice", "Third Choice"][i]}</p>
//                                 <span className="text-xs text-gray-500">Maximum 8 characters</span>
//                                 <Input
//                                     type="text"
//                                     label={`PLATE${i + 1}`}
//                                     placeholder={`PLATE${i + 1}`}
//                                     maxLength={8}
//                                     value={value.plateChoices[i]?.text || ""}
//                                     onChange={(val) => handlePlateChoiceChange(i, "text", val)}
//                                 />
//                                 <Input
//                                     type="text"
//                                     label="Meaning (REQUIRED)"
//                                     placeholder="Meaning (REQUIRED)"
//                                     value={value.plateChoices[i]?.meaning || ""}
//                                     onChange={(val) => handlePlateChoiceChange(i, "meaning", val)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Delivery */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-4 border-t">
//                     <Input
//                         type="radio"
//                         label="DMV Office"
//                         name="deliveryType"
//                         value="DMV Office"
//                         checked={value.deliveryType === "DMV Office"}
//                         onChange={() => onChange({ ...value, deliveryType: "DMV Office" })}
//                     />
//                     <Input
//                         type="radio"
//                         label="Auto Club (must be a member)"
//                         name="deliveryType"
//                         value="Auto Club"
//                         checked={value.deliveryType === "Auto Club"}
//                         onChange={() => onChange({ ...value, deliveryType: "Auto Club" })}
//                     />
//                     <Input
//                         type="text"
//                         label="LOCATION (city)"
//                         placeholder="LOCATION (city)"
//                         value={value.location}
//                         onChange={(val) => onChange({ ...value, location: val })}
//                     />
//                 </div>
//             </Section>
//         </div>
//     );
// };

// export default SelectConfiguration;
