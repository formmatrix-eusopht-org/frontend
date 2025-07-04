import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";
import { states } from "../Data/statesData";

type LienReleaseProps = {
    title: string;
    block: any;
    lienReleaseState: {
        companyAddress: Record<string, string>;
        mailing: Record<string, string>;
        isMailingDifferent: boolean;
    };
    onLienReleaseChange: (
        section: "companyAddress" | "mailing",
        label: string,
        value: string
    ) => void;
    onToggleMailingDifferent: (isDifferent: boolean) => void;
};

export const LeinRealease = ({
    title,
    block,
    lienReleaseState,
    onLienReleaseChange,
    onToggleMailingDifferent,
}: LienReleaseProps) => {
    const addressFields = block.fields || [];
    const radioOptions =
        block.subOption?.map((opt: any) => ({
            label: opt.label,
            value: opt.label.toLowerCase().replace(/\s+/g, "-"),
            subFields: opt.subFields,
        })) || [];

    return (
        <div className="pb-4">
            <Section
                title={title}
                subSection
                useStyledRadio
            >
                {addressFields[0] && (
                    <Input
                        key={addressFields[0].label}
                        label={addressFields[0].label}
                        placeholder={addressFields[0].placeholder}
                        type={
                            addressFields[0].type
                        }
                        options={
                            addressFields[0].type === "dropdown" ? states : []
                        }
                        value={
                            lienReleaseState.companyAddress[addressFields[0].label] || ""
                        }
                        onChange={(val) =>
                            onLienReleaseChange(
                                "companyAddress",
                                addressFields[0].label,
                                val
                            )
                        }
                        className="w-full"
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    {addressFields.slice(1, -1).map((field: any) => (
                        <Input
                            key={field.label}
                            label={field.label}
                            placeholder={field.placeholder}
                            type={
                                field.type === "dropdown"
                                    ? "dropdown" :
                                    field.type === "date"
                                        ? "date"
                                        : field.type === "phone"
                                            ? "phone"
                                            : "text"
                            }
                            options={field.type === "dropdown" ? states : []}
                            value={
                                lienReleaseState.companyAddress[field.label] || ""
                            }
                            onChange={(val) =>
                                onLienReleaseChange("companyAddress", field.label, val)
                            }
                        />
                    ))}
                </div>

                {addressFields[addressFields.length - 1] && (
                    <Input
                        key={addressFields[addressFields.length - 1].label}
                        label={addressFields[addressFields.length - 1].label}
                        placeholder={
                            addressFields[addressFields.length - 1].placeholder
                        }
                        type={
                            addressFields[addressFields.length - 1].type === "dropdown"
                                ? "dropdown"
                                : "text"
                        }
                        options={
                            addressFields[addressFields.length - 1].type === "dropdown"
                                ? states
                                : []
                        }
                        value={
                            lienReleaseState.companyAddress[
                            addressFields[addressFields.length - 1].label
                            ] || ""
                        }
                        onChange={(val) =>
                            onLienReleaseChange(
                                "companyAddress",
                                addressFields[addressFields.length - 1].label,
                                val
                            )
                        }
                        className="w-full"
                    />
                )}
            </Section>

            {lienReleaseState.isMailingDifferent && (
                <div className="mt-4">
                    <Section title="Mailing Address">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {radioOptions[0]?.subFields?.map((field: any) => (
                                <Input
                                    key={`mailing-${field.label}`}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    type={
                                        field.type === "dropdown"
                                            ? "dropdown"
                                            : field.type === "phone"
                                                ? "phone"
                                                : "text"
                                    }
                                    options={field.type === "dropdown" ? states : []}
                                    value={
                                        lienReleaseState.mailing[field.label] || ""
                                    }
                                    onChange={(val) =>
                                        onLienReleaseChange("mailing", field.label, val)
                                    }
                                />
                            ))}
                        </div>
                    </Section>
                </div>
            )}
        </div>
    );
};
