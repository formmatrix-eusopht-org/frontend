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
                    <div className="my-4 text-gray-700 flex items-center gap-2 w-full min-w-0">
                        <p className="text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis flex-shrink min-w-0">
                            My name is misspelled. Please correct it to:
                        </p>
                        <div className="flex-1 min-w-[40px]">
                            <Input
                                label=""
                                placeholder=""
                                type="text"
                                className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-full !px-1"
                                value={values.correction || ""}
                                onChange={(e) => handleChange("correction", e)}
                            />
                        </div>
                    </div>
                )}

                {name === "Change" && (
                    <div className="my-4 text-gray-700 flex items-center gap-2 w-full min-w-0">
                        <p className="text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis flex-shrink min-w-0">
                            I am changing my name from:
                        </p>
                        <div className="flex-1 min-w-[40px]">
                            <Input
                                label=""
                                placeholder=""
                                type="text"
                                className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-full !px-1"
                                value={values.changeFrom || ""}
                                onChange={(e) => handleChange("changeFrom", e)}
                            />
                        </div>
                        <p className="text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis flex-shrink-0">
                            to
                        </p>
                        <div className="flex-1 min-w-[40px]">
                            <Input
                                label=""
                                placeholder=""
                                type="text"
                                className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-full !px-1"
                                value={values.changeTo || ""}
                                onChange={(e) => handleChange("changeTo", e)}
                            />
                        </div>
                    </div>
                )}

                {name === "Discrepancy" && (
                    <div className="my-4 text-gray-700 flex items-center gap-2 w-full min-w-0 text-xs sm:text-sm md:text-base">
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis flex-shrink-0">I,</p>
                        <div className="flex-1 min-w-[40px]">
                            <Input
                                label=""
                                placeholder=""
                                type="text"
                                className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-full !px-1"
                                value={values.discrepency1 || ""}
                                onChange={(e) => handleChange("discrepency1", e)}
                            />
                        </div>
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis flex-shrink-0">and</p>
                        <div className="flex-1 min-w-[40px]">
                            <Input
                                label=""
                                placeholder=""
                                type="text"
                                className="border-0 border-b border-gray-500 rounded-none focus:ring-0 focus:border-black w-full !px-1"
                                value={values.discrepency2 || ""}
                                onChange={(e) => handleChange("discrepency2", e)}
                            />
                        </div>
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis flex-shrink min-w-0">are one and the same person</p>
                    </div>
                )}
            </Section>
        </div>
    );
};
