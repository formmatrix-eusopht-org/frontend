import Section from "../Components/FieldSection";
import Input from "../Components/InputControl";

interface PowerOfAttorneyProps {
  title: string;
  block: any;
  appointer: null | string;
  appointee: null | string;
  onChange: (field: "appointer" | "appointee", value: string) => void;
}

export const PowerOfAttorneyDetails = ({
  title,
  block,
  appointer,
  appointee,
  onChange,
}: PowerOfAttorneyProps) => {
  return (
    <div className="pb-4">
      <Section title={title}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="I/We"
            placeholder="Full Name(s)"
            value={appointer ?? undefined}
            onChange={(val) => onChange("appointer", val)}
          />
          <Input
            label="Appoint"
            placeholder="Appointee Name(s)"
            value={appointee ?? undefined}
            onChange={(val) => onChange("appointee", val)}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          as my attorney-in-fact to complete all necessary documents, as needed, to transfer ownership as required by law.
        </p>
      </Section>
    </div>
  );
};
