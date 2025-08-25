export type AddressSection = "residential" | "mailing" | "lessee" | "kept";

export type AddressState = {
  selectedOptions: string[];
  residential: Record<string, string>;
  mailing: Record<string, string>;
  lessee: Record<string, string>;
  kept: Record<string, string>;
};

export type AddressProps = {
  title: string;
  block: any;
  newOwnerAddressState: AddressState;
  onAddressChange: (
    section: AddressSection,
    label: string,
    value: string
  ) => void;
  onToggleSection: (val: string) => void;
};
