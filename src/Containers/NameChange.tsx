import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";

export const NameChange = ({ title, values, onchange, name }: any) => {
    const handleChange = (field: string, value: string) => {
        onchange({
            ...values,
            [field]: value
        });
    };

    return (
        <div className="pb-4">
            <Section title={title}>
                {name === "Correction" && (
                    <div className="my-4 text-gray-700 flex items-center gap-1">
                        <p className="text-base">My name is misspelled. Please correct it to:</p>
                        <Input
                            label=""
                            placeholder=""
                            type="text"
                            className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-[48%]"
                            value={values.correction || ""}
                            onChange={(e) => handleChange("correction", e)}
                        />
                    </div>

                )}

                {name === "Change" && (
                    <div className="my-4 text-gray-700 flex items-center gap-2">
                        <p className="text-lg  pt-4">I am changing my name from:</p>
                        <Input
                            label=""
                            placeholder=""
                            type="text"
                            className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-[18rem]"
                            value={values.changeFrom || ""}
                            onChange={(e) => handleChange("changeFrom", e)}
                        />
                        <p className="text-lg  pt-4">to</p>
                        <Input
                            label=""
                            placeholder=""
                            type="text"
                            className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-[18rem]"
                            value={values.changeTo || ""}
                            onChange={(e) => handleChange("changeTo", e)}
                        />
                    </div>
                )}

                {name === "Discrepancy" && (
                    <div className="my-4 text-gray-700 flex items-center gap-2">
                        <p className="text-lg pt-4">I,</p>
                        <Input
                            label=""
                            placeholder=""
                            type="text"
                            className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-[18rem]"
                            value={values.discrepency1 || ""}
                            onChange={(e) => handleChange("discrepency1", e)}
                        />
                        <p className="text-lg pt-4">and</p>
                        <Input
                            label=""
                            placeholder=""
                            type="text"
                            className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-[18rem]"
                            value={values.discrepency2 || ""}
                            onChange={(e) => handleChange("discrepency2", e)}
                        />
                        <p className="text-lg pt-4">are one and the same person</p>
                    </div>
                )}
            </Section>
        </div>
    );
};
