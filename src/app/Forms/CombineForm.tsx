'use client'
import React, { useEffect, useRef, useState } from 'react';
import { OwnerAddress } from '@/app/Containers/Address'
import { NewRegisteredOwnerAddress } from '@/app/Containers/NewRegisteredOwnerAddress'
import { NewRegisteredOwnerDetails } from '@/app/Containers/NewRegisteredOwners'
import { PowerOfAttorneyDetails } from '@/app/Containers/PowerOfAtttorney'
import { RegisteredOwnerDetails } from '@/app/Containers/RegisteredOwner'
import { TransactionDetails } from '@/app/Containers/TransactionDetails'
import { VehicleInformationDetails } from '@/app/Containers/VehicleInformation'
import { TheItemRequestedWasBlock } from '../Containers/TheItemRequestedWasBlock'
import { MissingTitleReason } from '../Containers/MissingTitleReason'
import { NewLienHolder } from '../Containers/NewLeinholder'
import FormActions from '../Containers/ActionButtons';
import { useSenerioContext } from '../Contexts/SenerioContext';
import { TypeOfVehicle } from '../Containers/TypeofVehicle';
import { DateInformation } from '../Containers/DateInfo';
import VehicleStatusInformation from '../Containers/VehicleStatusInformation';
import VehicleAcquisitionDetails from '../Containers/VehicleAcquisitionDetails';
import OutOfStateVehicleSection from '../Containers/OutOfStateInfo';
import { LegalOwnerOfRecord } from '../Containers/LegalOwnerOfRecord';
import StatementForSmogExemption from '../Containers/StatementForSmogExemption';
import { LeinRealease } from '../Containers/LienRelease';
import { LicensePlateMissingBlock } from '../Containers/LicensePlate';
import PlannedNonOperation from '../Containers/PlannedNon-OperationCertificate';
import { VehicleStorageLocationDetails } from '../Containers/VehicleStorageLocation';
import { handleOnSave } from "../Actions/save"
import Options from '../Containers/Options';
import { UserAuth } from '../Contexts/AuthContext';
import VehicleBodyChange from '../Containers/StatementForVehicleBodyChange';
import CommercialVehicleInfo from '../Containers/CommertialVehicle';
import CertificateOfLicensePlateDisposition from '../Containers/CertifiacteOf LicensePlateDisposition';
import SalvageCertificate from '../Containers/SalvageCertificate';
import VehicleDeclarationEntry from '../Containers/VehicleDeclarationEntry';
import DpPlacardSection from '../Containers/DisablePersion';
import DisablePersonVehicleInfo from '../Containers/DisablePersonVehicleInfo';
import MultipleTransfer from '../Containers/MultipleTransfer';
import { headHandlerForPDf } from '../Actions/pdfGenerates';
import { NameChange } from '../Containers/NameChange';
import PersonalOrBusinessInfo from '../Containers/PersonalOrBusinessInfo';
import PreviousResidenceorBusinessAddress from '../Containers/PreviousResidenceorBusinessAddress';
import NeworCorrectResidenceorBusinessAddressInfo from '../Containers/NeworCorrectResidenceorBusinessAddress';
import VehiclesSection from '../Containers/VehiclesVesselsOrPlacardsOwnedByYou';
import { PlatesSelection } from '../Containers/PersonalizePlates';
import SelectConfiguration from '../Containers/Configration';
import PlatePurchaserAndOwner from '../Containers/PlatePurchaserAndOwner';
import ReplacementOnlySection from '../Containers/forReplacementOnly';
import SpecialInterestSection from '../Containers/SpecialInterest';
import { Dialog } from '../Components/DialogBox';

const initialVehicle = { plate: "", vin: "", make: "", equipment: "" };

interface FormBlock {
    blockName: string;
    reference?: string;
    fields?: {
        label: string;
        type: string;
        placeholder?: string;
        options?: any[];
        value?: string | boolean;
    }[];
}
type DpState = {
    selectedPlacard: string;
    issuedPreviously: "yes" | "no" | "";
    plate: string;
};
type DpVehicleInfo = {
    plate: string;
    vin: string;
    make: string;
    year: string;
};
interface CombineFormProps {
    formData: FormBlock[];
}
interface AddressState {
    residential: Record<string, string>;
    mailing: Record<string, string>;
    isMailingDifferent: boolean;
}
type SalvageCertificateState = {
    [key: string]: string;
};
const CombineForm = ({ formData }: CombineFormProps) => {
    const [open, setOpen] = useState(false);
    const isInitialMount = useRef(true);
    const schemaForMultipletransfer = {
        "transferNumber": 1,
        "Values": {}
    }
    const getInitialDateValues = () => ({
        "DATE VEHICLE ENTERED OR WILL ENTER CALIFORNIA (CA):": {
            "Month": "",
            "Day": "",
            "Year": ""
        },
        "DATE VEHICLE FIRST OPERATED IN CALIFORNIA:": {
            "Month": "",
            "Day": "",
            "Year": ""
        },
        "DATE YOU WENT TO WORK IN CALIFORNIA, OBTAINED A CA DRIVER LICENSE, OR BECAME A RESIDENT:": {
            "Month": "",
            "Day": "",
            "Year": ""
        },
        "DATE VEHICLE WAS PURCHASED OR ACQUIRED:": {
            "Month": "",
            "Day": "",
            "Year": ""
        }
    });
    const { user } = UserAuth();
    const { senerio } = useSenerioContext();

    const [isLoading, setIsLoading] = useState(false);

    const LOCAL_STORAGE_KEY = "formStates";
    // State management for various form sections
    // Transaction details
    const [transactionSelections, setTransactionSelections] = useState<string[]>([]);
    const [optionsForValidation, setOptionsForValidation] = useState<string[]>([]);
    // Type of vehicle
    const [typeOfVehicleSelection, setTypeOfVehicleSelection] = useState<string>("");
    // Vehicle information
    const [vehicleInfoState, setVehicleInfoState] = useState<Record<string, string | boolean>>({});
    // Registered owners
    const [ownerCount, setOwnerCount] = useState(1);
    const [ownersData, setOwnersData] = useState<Record<string, string>[]>([{ /* owner 1 default */ }]);
    // Owner address
    const [ownerAddress, setOwnerAddress] = useState<AddressState>({
        residential: {},
        mailing: {},
        isMailingDifferent: false
    });
    // New registered owners
    const [newOwnerCount, setNewOwnerCount] = useState(1);
    const [newOwnerData, setNewOwnerData] = useState<Record<number, Record<string, string>>>({});
    const [newOwnershipTypes, setNewOwnershipTypes] = useState<Record<number, string>>({
        1: "and",
        2: "and",
        3: "and",
    });
    // New owner addresses
    const [newOwnerAddress, setNewOwnerAddress] = useState<Record<string, string>>({});
    const [newOwnerMailingAddress, setNewOwnerMailingAddress] = useState<Record<string, string>>({});
    const [newOwnerLesseeAddress, setNewOwnerLesseeAddress] = useState<Record<string, string>>({});
    const [newOwnerKeptAddress, setNewOwnerKeptAddress] = useState<Record<string, string>>({});
    // NEW:
    const [selectedRadio, setSelectedRadio] = useState<string[]>([]);

    //Date Info
    const [dateValues, setDateValues] = useState<Record<string, Record<string, string>>>(getInitialDateValues());
    // Power of Attorney
    const [powerOfAttorneyData, setPowerOfAttorneyData] = useState<{
        appointer: string | null;
        appointee: string | null;
    }>({
        appointer: null,
        appointee: null
    });
    const [multipleTransfer, setMultipleTransfer] = useState([schemaForMultipletransfer]);

    const [otherExplain, setOtherExplain] = useState("");
    // Missing title reason
    const [missingReason, setMissingReason] = useState("");
    // New lien holder
    const [newLienholder, setNewLienholder] = useState<{
        address: Record<string, string>;
        mailingAddress: Record<string, string>;
        isMailingDifferent: boolean;
    }>({
        address: {},
        mailingAddress: {},
        isMailingDifferent: false,
    });
    const [LegalOwnerOfRecordData, setLegalOwnerOfRecordData] = useState({
        residential: {},
        mailing: {},
        showMailingAddress: false,
    });


    //Vehicle Statis Info
    const [vehicleStatusInfoData, setVehicleStatusInfoData] = useState<Record<string, string | boolean>>({});
    const [nameChangeData, setNameChangeData] = useState<Record<string, string | boolean>>({
        correction: '',
        changeFrom: '',
        changeTo: '',
        discrepency1: '',
        discrepency2: ''
    });
    //Vehicle Purchase info
    const [vehiclePurchaseInfo, setVehiclePurchaseInfo] = React.useState<Record<string, string>>({ "Vehicle Modifications": 'no', });
    //out of  state
    const [outOfStateVehicle, setOutOfStateVehicle] = useState({
        salesTaxPaid: "",
        salesTaxPaidAmount: "", // Added for the input field
        outOfStatePlates: {
            value: "",
            label: ""
        }
    });
    const [itemRequestedWasState, setItemRequestedWasState] = useState<{
        checked: string[];
        otherExplain: string;
        plateCount: string[]; // holds "ONE" or "TWO"
    }>({
        checked: [],
        otherExplain: "",
        plateCount: [],
    });

    const [statementForSomgExemptionData, setStatementForSomgExemptionData] = useState<Record<string, string | boolean>>({});
    const [personalOrBusinessInformationData, setPersonalOrBusinessInformationData] = useState<Record<string, string | boolean>>({});
    const [previousResidenceOrBusinessAddressData, setPreviousResidenceOrBusinessAddressData] = useState<Record<string, string | boolean>>({});
    const [newOrCorrectResidenceOrBusinessAddressData, setNewOrCorrectResidenceOrBusinessAddressData] = useState({});
    const [lienReleaseState, setLienReleaseState] = useState({
        companyAddress: {},
        mailing: {},
        isMailingDifferent: false,
    });
    const [licensePlateState, setLicensePlateState] = useState('');
    const [platesSelectionState, setPlatesSelectionState] = useState({
        selectedPlate: "",
        veteranCode: "",
        duplicatePlate: ""
    });
    const [certificateOfLicensePlateDispositionState, setCertificateOfLicensePlateDispositionState] = useState<{
        licensePlatesAssignedTo: string;
        platesSurrendered: string;
        occupationalLicenseNumber: string;
    }>({
        licensePlatesAssignedTo: "", // only one value allowed from options
        platesSurrendered: "",        // e.g., "Surrendered", "Lost", etc.
        occupationalLicenseNumber: ""
    });
    const [vehicleDeclarationEntryData, setVehicleDeclarationEntryData] = useState<Record<string, string>[]>([]);

    const [selectConfigState, setSelectConfigState] = useState({
        assignedTo: '',
        assignedFor: "",
        licensePlateNumber: "",
        vehicleIdentificationNumber: "",
        plateChoices: [{ text: "", meaning: "" }, { text: "", meaning: "" }, { text: "", meaning: "" }],
        location: '',
        deliveryType: "",
        centered: "",
    });
    const [replacementState, setReplacementState] = useState({
        plateNumber: "",
        need: '',
        plateCondition: ''
    });
    const [plannedNonOperationState, setPlannedNonOperationState] = useState([{ ...initialVehicle }]);
    const [vehicleStorageLocation, setVehicleStorageLocation] = useState<Record<string, string>>({});
    const [vehicleBodyState, setVehicleBodyState] = useState<Record<string, any>>({});
    const [commercialInfo, setCommercialInfo] = useState<Record<string, any>>({});
    const [dpState, setDpState] = useState<DpState>({
        selectedPlacard: "",
        issuedPreviously: "",
        plate: ''
    });
    const [dpVehicleInfoState, setDpVehicleInfoState] = useState<DpVehicleInfo>({
        plate: "",
        vin: "",
        make: "",
        year: "",
    });
    const [salvageCertificateState, setSalvageCertificateState] = useState<SalvageCertificateState>({});
    const [vehiclesOwnedByYouData, setVehiclesOwnedByYouData] = useState([{ plateNumber: "", vinNumber: "", leased: false, registeredOutsideCA: false }]);
    const [leasaedCompanyName, setLeasaedCompanyName] = useState('')
    const [platePurchaseState, setPlatePurchaseState] = useState({
        platePurchase: {},
        plateOwner: {},
        ifPlateOwnerIsDifferent: false,
    });
    const [specialInterestState, setSpecialInterestState] = useState({
        specialInterestLicensePlateNumber: '',
        removedFrom: '',
        licensePlatePlacedOn: '',
        vinPlacedOn: '',
        releaseInterest: '',
        feeEnclosed: false
    });
    const [personalizePlatesState, setPersonalizePlatesState] = useState('Order')
    // Handlers for various form interactions
    const handleTransactionChange = (label: string, checked: boolean) => {
        setTransactionSelections((prev) => {
            const updated = checked ? [...prev, label] : prev.filter((item) => item !== label);

            // Sync "Is the Vehicle a Motorcycle" with "MOTORCYCLE"
            if (label === "Is the Vehicle a Motorcycle") {
                setTypeOfVehicleSelection(checked ? "MOTORCYCLE" : "");
                if (!checked) {
                    setVehicleInfoState(prev => {
                        const { ["Motorcycle Engine Number"]: _, ...rest } = prev;
                        return rest;
                    });
                }
            }

            return updated;
        });
    };

    // Handlers for various form interactions
    const handleTypeOfVehicleChange = (label: string, checked: boolean) => {
        setTypeOfVehicleSelection(checked ? label : "");

        // Sync "MOTORCYCLE" with "Is the Vehicle a Motorcycle"
        if (label === "MOTORCYCLE") {
            setTransactionSelections((prevTxn) =>
                checked
                    ? [...new Set([...prevTxn, "Is the Vehicle a Motorcycle"])]
                    : prevTxn.filter((item) => item !== "Is the Vehicle a Motorcycle")
            );
            if (!checked) {
                setVehicleInfoState(prev => {
                    const { ["Motorcycle Engine Number"]: _, ...rest } = prev;
                    return rest;
                });
            }
        } else {
            setTransactionSelections((prevTxn) =>
                prevTxn.filter((item) => item !== "Is the Vehicle a Motorcycle")
            );
        }
    };
    const handleVehicleFieldChange = (label: string, value: string | boolean) => {
        if (label === "Mileage of Vehicle" && typeof value === "string") {
            // Extract only digits
            const digitsOnly = value.replace(/\D/g, "").slice(0, 6); // max 6 digits

            // Allow only digits, commas, and spaces in input
            const allowedInput = value.replace(/[^0-9,\s]/g, "");

            // Reconstruct string up to the 6th digit, preserving commas/spaces
            let digitCount = 0;
            let formatted = "";

            for (const char of allowedInput) {
                if (/\d/.test(char)) {
                    if (digitCount >= 6) break;
                    digitCount++;
                }
                formatted += char;
            }

            setVehicleInfoState(prev => ({
                ...prev,
                [label]: formatted
            }));
        } else if (label === "Year of Vehicle" && typeof value === "string") {
            const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
            setVehicleInfoState(prev => ({ ...prev, [label]: digitsOnly }));
        } else if (label === "Vehicle/Hull Identification Number" && typeof value === "string") {
            const digitsOnly = value.slice(0, 17);
            setVehicleInfoState(prev => ({ ...prev, [label]: digitsOnly }));
        } else {
            setVehicleInfoState(prev => ({
                ...prev,
                [label]: value
            }));
        }
    };

    const handleOwnerCountChange = (count: number) => {
        setOwnerCount(count);
        setOwnersData((prev) => {
            const updated = [...prev];
            while (updated.length < count) updated.push({});
            return updated.slice(0, count);
        });
    };
    const handleRegisteredOwnerFieldChange = (index: number, label: string, value: string) => {
        setOwnersData((prev) => {
            const updated = [...prev];
            if (!updated[index]) updated[index] = {};
            updated[index][label] = value;
            return updated;
        });
    };

    const handleOwnerAddressChange = (section: "residential" | "mailing", field: string, value: string) => {
        setOwnerAddress(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };
    const toggleMailingAddress = () => {
        setOwnerAddress(prev => {
            const newIsDifferent = !prev.isMailingDifferent;
            return {
                ...prev,
                isMailingDifferent: newIsDifferent,
                mailing: newIsDifferent ? prev.mailing : {}
            };
        });
    };

    // Handler to update specific field for a given owner
    const handleNewOwnerFieldChange = (ownerIndex: number, label: string, value: string) => {
        setNewOwnerData((prev) => ({
            ...prev,
            [ownerIndex]: {
                ...prev[ownerIndex],
                [label]: value,
            },
        }));
    };

    // Handler for ownership type (AND/OR) radio buttons
    const handleNewOwnershipChange = (ownerIndex: number, value: string) => {
        setNewOwnershipTypes((prev) => ({
            ...prev,
            [ownerIndex]: value,
        }));
    };
    const handleNewOwnerAddressChange = (
        section: "residential" | "mailing" | "lessee" | "kept",
        label: string,
        value: string
    ) => {
        switch (section) {
            case "residential":
                setNewOwnerAddress((prev) => ({ ...prev, [label]: value }));
                break;
            case "mailing":
                setNewOwnerMailingAddress((prev) => ({ ...prev, [label]: value }));
                break;
            case "lessee":
                setNewOwnerLesseeAddress((prev) => ({ ...prev, [label]: value }));
                break;
            case "kept":
                setNewOwnerKeptAddress((prev) => ({ ...prev, [label]: value }));
                break;
        }
    };
    const handleDateChange = (fieldName: string, subFieldName: string, value: string) => {
        setDateValues(prev => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                [subFieldName]: value
            }
        }));
    };
    const handlePowerOfAttorneyChange = (field: 'appointer' | 'appointee', value: string) => {
        setPowerOfAttorneyData((prev) => ({
            ...prev,
            [field]: value
        }));
    };
    const handleLienholderFieldChange = (label: string, value: string | boolean) => {
        setNewLienholder((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [label]: typeof value === "string" ? value : value ? "true" : "false",
            },
        }));
    };

    const handleLienholderMailingFieldChange = (label: string, value: string) => {
        setNewLienholder((prev) => ({
            ...prev,
            mailingAddress: {
                ...prev.mailingAddress,
                [label]: value,
            },
        }));
    };
    const handleVehicleStatusInfoFieldChange = (label: string, value: string | boolean) => {
        setVehicleStatusInfoData((prev) => ({
            ...prev,
            [label]: value,
        }));
    };

    const toggleLienholderMailingAddress = (isDifferent: boolean) => {
        setNewLienholder((prev) => ({
            ...prev,
            isMailingDifferent: isDifferent,
        }));
    };
    const handleVehiclePurchaseInfoChange = (fieldLabel: string, value: string) => {
        setVehiclePurchaseInfo(prev => ({
            ...prev,
            [fieldLabel]: value
        }));
    };
    const handleOutOfStateVehcileFieldChange = (field: string, value: string) => {
        setOutOfStateVehicle(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleOutOfStateVehcilePlateSelect = (value: string, label: string) => {
        setOutOfStateVehicle(prev => ({
            ...prev,
            outOfStatePlates: { value, label }
        }));
    };

    const handleLegalOwnerFieldChange = (
        section: "residential" | "mailing",
        label: string,
        value: string
    ) => {
        setLegalOwnerOfRecordData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [label]: value,
            },
        }));
    };
    const legalOwnerToggleMailingAddress = () => {
        setLegalOwnerOfRecordData((prev) => ({
            ...prev,
            showMailingAddress: !prev.showMailingAddress,
        }));
    };


    const handleStatementForSomgExemption = (label: string, value: string | boolean) => {
        setStatementForSomgExemptionData((prev) => ({
            ...prev,
            [label]: value,
        }));
    };
    const handleLienAddressChange = (
        section: "companyAddress" | "mailing",
        label: string,
        value: string
    ) => {
        setLienReleaseState((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [label]: value,
            },
        }));
    };

    const handleToggleLienReleaseMailingDifferent = (isDifferent: boolean) => {
        setLienReleaseState((prev) => {
            if (!isDifferent) {
                return {
                    ...prev,
                    mailing: {},
                    isMailingDifferent: false,
                };
            }

            return {
                ...prev,
                mailing: prev.mailing || {},
                isMailingDifferent: true,
            };
        });
    };


    const handleItemRequestedOtherExplainChange = (val: string) => {
        setItemRequestedWasState((prev) => ({ ...prev, otherExplain: val }));
    };
    const handleItemRequestedPlateCountChange = (count: string) => {
        setItemRequestedWasState((prev) => {
            return {
                ...prev,
                plateCount: prev?.plateCount?.includes(count) ? [] : [count],
            };
        });
    };

    const handleItemRequestedCheckChange = (value: string) => {
        setItemRequestedWasState((prev) => {
            let updatedChecked = [...prev.checked];

            // Define exclusive groups
            const exclusiveGroups = [
                ["LOST", "STOLEN", "DESTROYED/MUTILATED"],
                ["NOT RECEIVED FROM DMV", "NOT RECEIVED FROM PRIOR OWNER"],
            ];

            for (const group of exclusiveGroups) {
                if (group?.includes(value)) {
                    updatedChecked = updatedChecked.filter((v) => !group?.includes(v) || v === value);
                    break;
                }
            }

            if (updatedChecked?.includes(value)) {
                updatedChecked = updatedChecked?.filter((v) => v !== value);
            } else {
                updatedChecked.push(value);
            }
            return {
                ...prev,
                checked: updatedChecked,
            };
        });
    };
    const handleLicensePlateChange = (val: string) => {
        setLicensePlateState((prev) => (prev === val ? "" : val));
    };

    const mutuallyExclusive = [
        "if-lessee-address-is-different",
        "trailer/vessel-location",
    ];

    const handleToggleOption = (value: string) => {
        const isMutuallyExclusive = mutuallyExclusive?.includes(value);

        setSelectedRadio((prev) => {
            const alreadySelected = prev?.includes(value);

            if (alreadySelected) {
                // Clear state when an option is deselected
                if (value === "if-lessee-address-is-different") {
                    setNewOwnerLesseeAddress({});
                } else if (value === "trailer/vessel-location") {
                    setNewOwnerKeptAddress({});
                } else if (value === "if-mailing-address-is-different") {
                    setNewOwnerMailingAddress({}); // Add this line
                }

                return prev.filter((v) => v !== value);
            }

            let newSelection = [...prev, value];

            if (isMutuallyExclusive) {
                const other = mutuallyExclusive.find((opt) => opt !== value);
                newSelection = newSelection.filter((opt) => opt !== other);

                if (other === "if-lessee-address-is-different") {
                    setNewOwnerLesseeAddress({});
                } else if (other === "trailer/vessel-location") {
                    setNewOwnerKeptAddress({});
                }
            }

            return newSelection;
        });
    };
    const handlePlannedNonOperationChange = (index: number, field: string, value: string) => {
        const updated = [...plannedNonOperationState];
        (updated[index] as any)[field] = value;
        setPlannedNonOperationState(updated);
    };

    const handlePlannedNonOperationAdd = () => {
        setPlannedNonOperationState([...plannedNonOperationState, { ...initialVehicle }]);
    };

    const handlePlannedNonOperationRemove = (index: number) => {
        const updated = plannedNonOperationState.filter((_, i) => i !== index);
        setPlannedNonOperationState(updated);
    };

    const handleVehicleStorageLocation = (label: string, value: string | boolean) => {
        setVehicleStorageLocation((prev) => ({ ...prev, [label]: String(value) }));
        // console.log(vehicleStorageLocation);

    };
    const handleOptionsForValidations = (options: string[] = []) => {
        setOptionsForValidation(options);
    }
    const handleVehicleBodyChange = (label: string, value: any) => {
        setVehicleBodyState((prev) => ({
            ...prev,
            [label]: value,
        }));
    };
    const handleCommercialChange = (label: string, value: any) => {
        setCommercialInfo((prev) => ({ ...prev, [label]: value }));
    };

    const handleCertificateOfLicensePlateDispositionChange = (
        label: string,
        value: string | boolean
    ) => {
        setCertificateOfLicensePlateDispositionState((prev) => ({
            ...prev,
            [label]: value
        }));
    };
    const handleSalvageCertificateChange = (label: string, value: string) => {
        setSalvageCertificateState((prev) => ({
            ...prev,
            [label]: value,
        }));
    };
    const handleVehicleDeclarationEntryFieldChange = (index: number, label: string, value: string) => {
        setVehicleDeclarationEntryData((prev) => {
            const updated = [...prev];
            if (!updated[index]) updated[index] = {};
            updated[index][label] = value;
            return updated;
        });
    };
    const handleTrimEntries = (trimmed: Record<string, string>[]) => {
        setVehicleDeclarationEntryData(trimmed);
    };

    const handlePlateChange = (label: string) => {
        setPlatesSelectionState((prev) => ({
            ...prev,
            selectedPlate: label,
            // Reset dependent fields when switching options
            veteranCode: label === "Veterans' Organization" ? prev.veteranCode : "",
            duplicatePlate: label === "Duplicate Decal" ? prev.duplicatePlate : "",
        }));
    };

    const handleInputChange = (field: "veteranCode" | "duplicatePlate", value: string) => {
        setPlatesSelectionState((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    useEffect(() => {
        const owner = ownersData[0];
        const newOwner = newOwnerData[0];

        const appointerParts = [
            owner?.firstName,
            owner?.middleName,
            owner?.lastName
        ].filter(part => part?.trim());

        const appointeeParts = [
            newOwner?.firstName,
            newOwner?.middleName,
            newOwner?.lastName
        ].filter(part => part?.trim());

        if (appointerParts.length > 0 || appointeeParts.length > 0) {
            setPowerOfAttorneyData(prev => ({
                ...prev,
                ...(appointerParts.length && { appointer: appointerParts.join(' ') }),
                ...(appointeeParts.length && { appointee: appointeeParts.join(' ') }),
            }));
        }
    }, [ownersData, newOwnerData]);


    // Find all relevant blocks
    const findBlock = (ref: string) =>
        formData.find((block): block is FormBlock & { fields: any[] } =>
            block.reference === ref && Array.isArray(block.fields)
        );
    // If you want to use contextFormData instead, replace 'formData' with 'contextFormData' above.

    // Find blocks by their reference names
    const transactionBlock = findBlock("Transaction Details");
    const multipletransactionBlock = findBlock("Multiple Transfer");
    const typeOfVehicleBlock = findBlock("Type of Vehicle");
    const vehicleInfoBlock = findBlock("Vehicle Information");
    const registeredOwnerBlock = findBlock("Registered Owner(s)");
    const ownerAddressBlock = findBlock("Owner Address");
    const newRegisteredOwnerBlock = findBlock("New Registered Owner(s)");
    const newRegisteredOwnerAddressBlock = findBlock("New Registered Owner Address");
    const powerOfAttorneyBlock = findBlock("Power of Attorney");
    const itemRequestedWasBlock = findBlock("THE ITEM REQUESTED WAS");
    const missingTitleReasonBlock = findBlock("Missing Title Reason");
    const newLienHolderBlock = findBlock("New Lien Holder");
    const dateInformationBlock = findBlock("DATE INFORMATION");
    const vehicleStatusBlock = findBlock("Vehicle Status Information");
    const vehicleAcquisitionBlock = findBlock("VEHICLE WAS PURCHASED OR ACQUIRED FROM:");
    const OutOfStateBlock = findBlock("FOR OUT-OF-STATE OR OUT-OF-COUNTRY VEHICLES");
    const LegalOwnerOfRecordBlock = findBlock("Legal Owner of Record");
    const LienReleaseBlock = findBlock("Lien Release");
    const StatementForSmogExemptionBlock = findBlock("Statement for Smog Exemption");
    const LicensePlateBlock = findBlock("License Plate");
    const plannedNonOperationCertificateBlock = findBlock("PLANNED NON-OPERATION CERTIFICATE");
    const vehicleStorageLocationBlock = findBlock("Vehicle Storage Location");
    const statementForVehicleBodyChangeBlock = findBlock("Statement for Vehicle Body Change");
    const forCommercialVehicleOnlyBlock = findBlock("For Commercial Vehicle Only");
    const CertificateOfLicensePlateDispositionBlock = findBlock("Certification of License Plate Disposition");
    const SalvageCertificateBlock = findBlock("Salvage Certificate");
    const VehicleDeclarationEntryBlock = findBlock("Vehicle Declaration Entry");
    const PersonalOrBusinessInformationBlock = findBlock("PERSONAL OR BUSINESS INFORMATION");
    const PreviousResidenceOrBusinessAddressBlock = findBlock("PREVIOUS RESIDENCE OR BUSINESS ADDRESS");
    const NewOrCorrectResidenceOrBusinessAddressBlock = findBlock("NEW OR CORRECT RESIDENSE OR BUSINESS ADDRESS");
    const NameChangeBlock = findBlock("Name Statement (Ownership Certificate Required)");
    const VehiclesOwnedByYouBlock = findBlock("Vehicles, Vessels, or Placards Owned By You");
    const disablePersonTypeBlock = findBlock("Type of Disabled Person Parking Placard(S) or License Plates");
    const disablePersonVehicleInfoBlock = findBlock("DISABLED PERSON LICENSE PLATES APPLICANTS ONLY: VEHICLE INFORMATION");
    const platesSelectionBlock = findBlock("Plates Selection");
    const selectConfigurationBlock = findBlock("Select Configuration");
    const forReplacementOnlyBlock = findBlock("FOR REPLACEMENT ONLY");
    const reassignInterestBlock = findBlock("REASSIGN, RETAIN INTEREST, OR RELEASE INTEREST");
    const platePurchaseBlock = findBlock("PLATE PURCHASER");
    const documentsReceivedBlock = findBlock("Documents Received");

    useEffect(() => {
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedState) {
            const parsed = JSON.parse(savedState);
            setTransactionSelections(parsed.transactionSelections || []);
            setTypeOfVehicleSelection(parsed.typeOfVehicleSelections || '');
            setVehicleInfoState(parsed.vehicleInfoState || {});
            setOwnerCount(parsed.ownerCount || 1);
            setOwnersData(parsed.ownersData || [{}]);
            setOwnerAddress(parsed.ownerAddress || {
                residential: {},
                mailing: {},
                isMailingDifferent: false
            });
            setNewOwnerCount(parsed.newOwnerCount || 1);
            setNewOwnerData(parsed.newOwnerData || {});
            setNewOwnershipTypes(parsed.newOwnershipTypes || {});
            setNewOwnerAddress(parsed.newOwnerAddress || {});
            setNewOwnerMailingAddress(parsed.newOwnerMailingAddress || {});
            setNewOwnerLesseeAddress(parsed.newOwnerLesseeAddress || {});
            setNewOwnerKeptAddress(parsed.newOwnerKeptAddress || {});
            setSelectedRadio(parsed.selectedRadio || null);
            setDateValues(parsed.dateValues || getInitialDateValues());
            setPowerOfAttorneyData(parsed.powerOfAttorneyData || { appointer: "", appointee: "" });
            setOtherExplain(parsed.otherExplain || "");
            setMissingReason(parsed.missingReason || "");
            setNewLienholder(parsed.newLienholder || {
                address: {},
                mailingAddress: {},
                isMailingDifferent: false,
            });
            setVehicleStatusInfoData(parsed.vehicleStatusInfoData)
            setVehiclePurchaseInfo(parsed.vehiclePurchaseInfo)
            setOutOfStateVehicle(parsed.outOfStateVehicle)
            setLegalOwnerOfRecordData(parsed.LegalOwnerOfRecordData || {
                residential: {},
                mailing: {},
                showMailingAddress: false,
            })
            setStatementForSomgExemptionData(parsed.statementForSomgExemptionData)
            setLienReleaseState(parsed.lienReleaseState)
            setItemRequestedWasState(parsed.itemRequestedWasState)
            setLicensePlateState(parsed.licensePlateState)
            setPlannedNonOperationState(parsed.plannedNonOperationState)
            setVehicleStorageLocation(parsed.vehicleStorageLocation || {});
            setPlatesSelectionState(parsed.platesSelectionState || {
                selectedPlate: "",
                veteranCode: "",
                duplicatePlate: ""
            });
            setVehicleBodyState(parsed.vehicleBodyState || {});
            setCommercialInfo(parsed.commercialInfo || {});
            setCertificateOfLicensePlateDispositionState(parsed.certificateOfLicensePlateDispositionState || {});
            setSalvageCertificateState(parsed.salvageCertificateState || {});
            setVehicleDeclarationEntryData(parsed.vehicleDeclarationEntryData || {});
            setDpState(parsed.dpState || {
                selectedPlacard: "",
                issuedPreviously: "",
                plate: ''
            })
            setDpVehicleInfoState(parsed.dpVehicleInfoState || {
                licensePlate: "",
                vinNumber: "",
                vehicleMake: "",
                vehicleYear: "",
            })
            setMultipleTransfer(parsed.multipleTransfer || [schemaForMultipletransfer]);
            setNameChangeData(parsed.nameChangeData || {
                correction: '',
                changeFrom: '',
                changeTo: '',
                discrepency1: '',
                discrepency2: ''
            })
            setPersonalOrBusinessInformationData(parsed.personalOrBusinessInformationData || {})
            setPreviousResidenceOrBusinessAddressData(parsed.previousResidenceOrBusinessAddressData || {})
            setNewOrCorrectResidenceOrBusinessAddressData(parsed.newOrCorrectResidenceOrBusinessAddressData || {})
            setVehiclesOwnedByYouData(parsed.vehiclesOwnedByYouData || {})
            setLeasaedCompanyName(parsed.leasaedCompanyName || '')
            setSelectConfigState(parsed.selectConfigState || {
                assignedTo: '',
                assignedFor: "",
                licensePlateNumber: "",
                vehicleIdentificationNumber: "",
                plateChoices: [{ text: "", meaning: "" }, { text: "", meaning: "" }, { text: "", meaning: "" }],
            })
            setPlatePurchaseState(parsed.platePurchaseState || {
                platePurchase: {},
                plateOwner: {},
                isSameAsPlateOwner: false,
            })
            setReplacementState(parsed.replacementState || {
                plateNumber: "",
                need: '',
                plateCondition: ''
            })
            setSpecialInterestState(parsed.specialInterestState || {
                specialInterestLicensePlateNumber: '',
                removedFrom: '',
                licensePlatePlacedOn: '',
                vinPlacedOn: '',
                releaseInterest: '',
                feeEnclosed: false
            })
            setPersonalizePlatesState(parsed.personalizePlatesState || '')
            setOptionsForValidation(parsed.optionsForValidation || [])
        }
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return; // Skip saving on first load
        }
        const combinedState = {
            transactionSelections,
            typeOfVehicleSelection,
            vehicleInfoState,
            ownerCount,
            ownersData,
            ownerAddress,
            newOwnerCount,
            newOwnerData,
            newOwnershipTypes,
            newOwnerAddress,
            newOwnerMailingAddress,
            newOwnerLesseeAddress,
            newOwnerKeptAddress,
            selectedRadio,
            dateValues,
            powerOfAttorneyData,
            otherExplain,
            missingReason,
            newLienholder,
            vehicleStatusInfoData,
            vehiclePurchaseInfo,
            outOfStateVehicle,
            LegalOwnerOfRecordData,
            statementForSomgExemptionData,
            lienReleaseState,
            itemRequestedWasState,
            licensePlateState,
            plannedNonOperationState,
            vehicleStorageLocation,
            platesSelectionState,
            vehicleBodyState,
            commercialInfo,
            certificateOfLicensePlateDispositionState,
            salvageCertificateState,
            vehicleDeclarationEntryData,
            dpState,
            dpVehicleInfoState,
            nameChangeData,
            personalOrBusinessInformationData,
            previousResidenceOrBusinessAddressData,
            newOrCorrectResidenceOrBusinessAddressData,
            vehiclesOwnedByYouData,
            leasaedCompanyName,
            selectConfigState,
            platePurchaseState,
            replacementState,
            specialInterestState,
            personalizePlatesState,
            optionsForValidation
        };

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combinedState));
    }, [
        transactionSelections,
        typeOfVehicleSelection,
        vehicleInfoState,
        ownerCount,
        ownersData,
        ownerAddress,
        newOwnerCount,
        newOwnerData,
        newOwnershipTypes,
        newOwnerAddress,
        newOwnerMailingAddress,
        newOwnerLesseeAddress,
        newOwnerKeptAddress,
        selectedRadio,
        dateValues,
        powerOfAttorneyData,
        otherExplain,
        missingReason,
        newLienholder,
        vehicleStatusInfoData,
        vehiclePurchaseInfo,
        outOfStateVehicle,
        LegalOwnerOfRecordData,
        statementForSomgExemptionData,
        lienReleaseState,
        itemRequestedWasState,
        licensePlateState,
        plannedNonOperationState,
        vehicleStorageLocation,
        platesSelectionState,
        vehicleBodyState,
        commercialInfo,
        certificateOfLicensePlateDispositionState,
        salvageCertificateState,
        vehicleDeclarationEntryData,
        dpState,
        dpVehicleInfoState,
        nameChangeData,
        personalOrBusinessInformationData,
        previousResidenceOrBusinessAddressData,
        newOrCorrectResidenceOrBusinessAddressData,
        vehiclesOwnedByYouData,
        leasaedCompanyName,
        selectConfigState,
        platePurchaseState,
        replacementState,
        specialInterestState,
        personalizePlatesState,
        optionsForValidation
    ]);
    //validations for form
    const isMotorcycle = transactionSelections?.includes("Is the Vehicle a Motorcycle");
    const isTransactionWithVehicleTitle = transactionSelections?.includes("Transaction with Vehicle Title") || transactionSelections?.includes("With Title");
    const isTRAILERCOACH = typeOfVehicleSelection === "TRAILER COACH";
    const isOutofStateTitle = transactionSelections?.includes("Out of State Title");
    const isThereIsACurrentLeinHolder = transactionSelections?.includes("There is a Current Lienholder");
    const isVehickeIsAGift = transactionSelections?.includes("Vehicle is a Gift");
    const isSmogExemption = transactionSelections?.includes("Smog Exemption");
    const leasedVehicleFlag = transactionSelections?.includes("Leased Vehicle");
    const requestPNOCardFlag = transactionSelections?.includes("Request PNO card");
    const isCommercialVehicle = transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)");

    const comercialVehicleFlag = senerio?.includes("Commercial Vehicle");
    const nameChangeSelected = senerio?.includes("Name Change") ? senerio?.includes("Name Correction") ? "Correction" : senerio?.includes("Legal Name Change") ? "Change" : senerio?.includes("Name Discrepancy") ? "Discrepancy" : '' : "";
    const isRegisteredOwnerValidForPNO = requestPNOCardFlag && senerio.includes("Filing for Planned Non-Operation (PNO)")

    const handleTransferCountChange = (newCount: number) => {
        const updatedTransfers = Array.from({ length: newCount }, (_, index) => ({
            transferNumber: index + 1,
            Values: multipleTransfer[index]?.Values || {},
        }));
        setMultipleTransfer(updatedTransfers);
    };

    return (
        <>
            {senerio?.includes("Multiple Transfer") ?
                <MultipleTransfer
                    title="Multiple Transfer"
                    block={multipletransactionBlock}
                    formData={formData}
                    state={multipleTransfer}
                    setState={setMultipleTransfer}
                    onTransferCountChange={handleTransferCountChange}
                />
                :
                <div className="space-y-6">
                    {transactionBlock && (
                        <TransactionDetails
                            title="Transaction Details"
                            block={transactionBlock}
                            senerio={senerio}
                            selectedItems={transactionSelections}
                            onChange={handleTransactionChange}
                        />
                    )}

                    {typeOfVehicleBlock && isOutofStateTitle && (
                        <TypeOfVehicle
                            title="Type of Vehicle"
                            block={typeOfVehicleBlock}
                            selectedItems={typeOfVehicleSelection}
                            onChange={handleTypeOfVehicleChange}
                        />
                    )}
                    {forCommercialVehicleOnlyBlock && (
                        <CommercialVehicleInfo
                            title={forCommercialVehicleOnlyBlock.blockName}
                            block={{}}
                            isCommercialVehicle={isCommercialVehicle} // optional
                            values={commercialInfo}
                            onChange={handleCommercialChange}
                        />
                    )}
                    {missingTitleReasonBlock && !isTransactionWithVehicleTitle && (
                        <MissingTitleReason
                            title="Missing Title Reason"
                            selectedReason={missingReason}
                            onReasonChange={setMissingReason}
                        />
                    )}
                    {SalvageCertificateBlock && (
                        <SalvageCertificate
                            title={SalvageCertificateBlock.blockName}
                            block={SalvageCertificateBlock} // ✅ pass metadata
                            values={salvageCertificateState} // ✅ pass current field values
                            onFieldChange={handleSalvageCertificateChange}
                        />
                    )}
                    {vehicleInfoBlock && (
                        <VehicleInformationDetails
                            title="Vehicle Information"
                            block={{
                                ...vehicleInfoBlock,
                                fields: vehicleInfoBlock.fields
                                    ?.filter(field => isMotorcycle || field.label !== "Motorcycle Engine Number")
                                    ?.filter(field => (isOutofStateTitle || comercialVehicleFlag) || field.label !== "If kilometers check this box")
                                    ?.filter(field => isTRAILERCOACH ||
                                        (field.label !== "Length (IN)" && field.label !== "Width (IN)"))
                                    .map(field => ({
                                        ...field,
                                        type: field.type as "checkbox" | "input field" | "dropdown",
                                        value: vehicleInfoState[field.label] ?? (field.type === "checkbox" ? false : ""),
                                    }))
                            }}
                            onFieldChange={handleVehicleFieldChange}
                        />
                    )}
                    {NameChangeBlock && (
                        <NameChange
                            title={NameChangeBlock.blockName}
                            values={nameChangeData}
                            onchange={setNameChangeData}
                            name={nameChangeSelected}
                        />
                    )}
                    {registeredOwnerBlock && (
                        <RegisteredOwnerDetails
                            title="Registered Owner(s)"
                            block={registeredOwnerBlock}
                            ownerCount={ownerCount}
                            onOwnerCountChange={handleOwnerCountChange}
                            ownersData={ownersData}
                            onFieldChange={handleRegisteredOwnerFieldChange}
                        />
                    )}
                    {ownerAddressBlock && (
                        <OwnerAddress
                            title="Address"
                            block={ownerAddressBlock}
                            residentialAddress={ownerAddress.residential}
                            mailingAddress={ownerAddress.mailing}
                            isMailingDifferent={ownerAddress.isMailingDifferent}
                            onAddressChange={handleOwnerAddressChange}
                            onToggleMailingAddress={toggleMailingAddress}
                        />
                    )}
                    {LegalOwnerOfRecordBlock && isThereIsACurrentLeinHolder &&
                        <LegalOwnerOfRecord
                            block={LegalOwnerOfRecordBlock}
                            legalOwnerAddress={LegalOwnerOfRecordData?.residential}
                            legalOwnerMailingAddress={LegalOwnerOfRecordData?.mailing}
                            selectedRadio={
                                LegalOwnerOfRecordData?.showMailingAddress
                                    ? ["if-mailing-address-is-different"]
                                    : []
                            }
                            onToggleOption={legalOwnerToggleMailingAddress}
                            onAddressChange={handleLegalOwnerFieldChange}
                            isOutofStateTitle={isOutofStateTitle}
                        />
                    }
                    {PersonalOrBusinessInformationBlock && (
                        <PersonalOrBusinessInfo
                            title={PersonalOrBusinessInformationBlock.blockName}
                            block={PersonalOrBusinessInformationBlock}
                            values={personalOrBusinessInformationData}
                            onFieldChange={setPersonalOrBusinessInformationData}
                        />
                    )}
                    {PreviousResidenceOrBusinessAddressBlock && (
                        <PreviousResidenceorBusinessAddress
                            title={PreviousResidenceOrBusinessAddressBlock.blockName}
                            block={PreviousResidenceOrBusinessAddressBlock}
                            values={previousResidenceOrBusinessAddressData}
                            onFieldChange={setPreviousResidenceOrBusinessAddressData}
                        />
                    )}
                    {NewOrCorrectResidenceOrBusinessAddressBlock && (
                        <NeworCorrectResidenceorBusinessAddressInfo
                            title={NewOrCorrectResidenceOrBusinessAddressBlock.blockName}
                            block={NewOrCorrectResidenceOrBusinessAddressBlock}
                            values={newOrCorrectResidenceOrBusinessAddressData}
                            onFieldChange={setNewOrCorrectResidenceOrBusinessAddressData}
                        />
                    )}
                    {VehiclesOwnedByYouBlock && (
                        <VehiclesSection
                            title={VehiclesOwnedByYouBlock.blockName}
                            block={VehiclesOwnedByYouBlock}
                            values={vehiclesOwnedByYouData}
                            leasedVehicleFlag={leasedVehicleFlag}
                            leasaedCompanyName={leasaedCompanyName}
                            setLeasaedCompanyName={setLeasaedCompanyName}
                            onFieldChange={setVehiclesOwnedByYouData}
                        />
                    )}

                    {VehicleDeclarationEntryBlock && (
                        <VehicleDeclarationEntry
                            title={VehicleDeclarationEntryBlock.blockName}
                            block={VehicleDeclarationEntryBlock}
                            values={vehicleDeclarationEntryData}
                            onFieldChange={handleVehicleDeclarationEntryFieldChange}
                            onTrimEntries={handleTrimEntries}
                        />
                    )}

                    {newRegisteredOwnerBlock && (
                        <NewRegisteredOwnerDetails
                            title="New Registered Owner(s)"
                            block={newRegisteredOwnerBlock}
                            newOwnerCount={newOwnerCount}
                            onNewOwnerCountChange={setNewOwnerCount}
                            newOwnerData={newOwnerData}
                            onNewOwnerFieldChange={handleNewOwnerFieldChange}
                            NewOwnershipTypes={newOwnershipTypes}
                            onNewOwnershipChange={handleNewOwnershipChange}
                            isVehicleIsAGift={isVehickeIsAGift}
                            isMotorcycle={isMotorcycle}
                            isTRAILERCOACH={isTRAILERCOACH}
                        />
                    )}
                    {newRegisteredOwnerAddressBlock && (
                        <NewRegisteredOwnerAddress
                            title="New Owner Address"
                            block={newRegisteredOwnerAddressBlock}
                            newOwnerAddress={newOwnerAddress}
                            newOwnerMailingAddress={newOwnerMailingAddress}
                            newOwnerLesseeAddress={newOwnerLesseeAddress}
                            newOwnerKeptAddress={newOwnerKeptAddress}
                            selectedRadio={selectedRadio}
                            onToggleOption={handleToggleOption}
                            onAddressChange={handleNewOwnerAddressChange}
                        />
                    )}
                    {powerOfAttorneyBlock && (
                        <PowerOfAttorneyDetails
                            title="Power of Attorney"
                            block={powerOfAttorneyBlock}
                            appointer={powerOfAttorneyData.appointer}
                            appointee={powerOfAttorneyData.appointee}
                            onChange={handlePowerOfAttorneyChange}
                        />
                    )}
                    {(comercialVehicleFlag || isOutofStateTitle) && dateInformationBlock && dateInformationBlock.reference && (
                        <DateInformation
                            title="DATE INFORMATION"
                            block={{ ...dateInformationBlock, reference: dateInformationBlock.reference as string }}
                            dateValues={dateValues}
                            onDateChange={handleDateChange}
                        />
                    )}
                    {vehicleStatusBlock && (comercialVehicleFlag || isOutofStateTitle) && (
                        <VehicleStatusInformation
                            title="Vehicle Status Information"
                            block={vehicleStatusBlock}
                            onFieldChange={handleVehicleStatusInfoFieldChange}
                            values={vehicleStatusInfoData}
                        />
                    )}
                    {vehicleAcquisitionBlock && (comercialVehicleFlag || isOutofStateTitle) && (
                        <VehicleAcquisitionDetails
                            title={vehicleAcquisitionBlock.blockName}
                            block={vehicleAcquisitionBlock}
                            values={vehiclePurchaseInfo}
                            onFieldChange={handleVehiclePurchaseInfoChange}
                        />
                    )}
                    {OutOfStateBlock && isOutofStateTitle &&
                        <OutOfStateVehicleSection
                            values={outOfStateVehicle}
                            onFieldChange={handleOutOfStateVehcileFieldChange}
                            onPlateSelect={handleOutOfStateVehcilePlateSelect}
                        />
                    }
                    {statementForVehicleBodyChangeBlock && (
                        <VehicleBodyChange
                            title={statementForVehicleBodyChangeBlock.blockName}
                            values={vehicleBodyState}
                            onChange={handleVehicleBodyChange}
                        />
                    )}
                    {itemRequestedWasBlock && (
                        <TheItemRequestedWasBlock
                            title="The Item Requested Was"
                            block={itemRequestedWasBlock}
                            checkedItems={itemRequestedWasState.checked}
                            otherExplain={itemRequestedWasState.otherExplain}
                            onCheckChange={handleItemRequestedCheckChange}
                            onOtherExplainChange={handleItemRequestedOtherExplainChange}
                            plateCount={itemRequestedWasState.plateCount}
                            onPlateCountChange={handleItemRequestedPlateCountChange}
                        />

                    )}
                    {LicensePlateBlock &&
                        <LicensePlateMissingBlock
                            title={LicensePlateBlock.blockName}
                            block={LicensePlateBlock}
                            selectedOption={licensePlateState}
                            handleSelectedOptionOnChange={handleLicensePlateChange} />
                    }

                    {LienReleaseBlock && (
                        <LeinRealease
                            title="Lien Release"
                            block={LienReleaseBlock}
                            lienReleaseState={lienReleaseState}
                            onLienReleaseChange={handleLienAddressChange}
                            onToggleMailingDifferent={handleToggleLienReleaseMailingDifferent}
                        />
                    )}
                    {plannedNonOperationCertificateBlock &&
                        <PlannedNonOperation
                            title="Planned Non-Operation Certificate"
                            vehicles={plannedNonOperationState}
                            onChange={handlePlannedNonOperationChange}
                            onAdd={handlePlannedNonOperationAdd}
                            onRemove={handlePlannedNonOperationRemove}
                            fields={plannedNonOperationCertificateBlock.fields}
                        />
                    }
                    {vehicleStorageLocationBlock && (
                        <VehicleStorageLocationDetails
                            title="Vehicle Storage Location"
                            block={vehicleStorageLocationBlock}
                            formState={vehicleStorageLocation}
                            onFieldChange={handleVehicleStorageLocation}
                        />
                    )}
                    {newLienHolderBlock && (
                        <NewLienHolder
                            block={newLienHolderBlock}
                            formState={newLienholder.address}
                            mailingAddress={newLienholder.mailingAddress}
                            isMailingDifferent={newLienholder.isMailingDifferent}
                            onFieldChange={handleLienholderFieldChange}
                            onMailingFieldChange={handleLienholderMailingFieldChange}
                            onToggleMailingAddress={toggleLienholderMailingAddress}
                        />


                    )}
                    {StatementForSmogExemptionBlock && isSmogExemption && (
                        <StatementForSmogExemption
                            title="Statement For Smog Exemption"
                            block={StatementForSmogExemptionBlock}
                            onFieldChange={handleStatementForSomgExemption}
                            values={statementForSomgExemptionData}
                        />
                    )}
                    {platesSelectionBlock && (
                        <PlatesSelection
                            block={platesSelectionBlock}
                            plateInfo={platesSelectionState}
                            onPlateChange={handlePlateChange}
                            onInputChange={handleInputChange}
                            personalizePlatesState={personalizePlatesState}
                            setPersonalizePlatesState={setPersonalizePlatesState}
                        />
                    )}
                    {selectConfigurationBlock && (personalizePlatesState === "Order" || personalizePlatesState === "Exchange") && (
                        <SelectConfiguration
                            block={selectConfigurationBlock}
                            value={selectConfigState}
                            onChange={setSelectConfigState}
                        />
                    )}
                    {forReplacementOnlyBlock && personalizePlatesState === "Replace" && (
                        <ReplacementOnlySection
                            block={forReplacementOnlyBlock}
                            values={replacementState}
                            onChange={setReplacementState}
                        />
                    )}
                    {reassignInterestBlock && personalizePlatesState === "Reassign/Retain" && (
                        <SpecialInterestSection
                            block={reassignInterestBlock}
                            values={specialInterestState}
                            onChange={setSpecialInterestState}
                        />
                    )}
                    {platePurchaseBlock && (
                        <PlatePurchaserAndOwner
                            block={platePurchaseBlock}
                            values={platePurchaseState}
                            onChange={setPlatePurchaseState}
                        />
                    )}
                    {CertificateOfLicensePlateDispositionBlock && (
                        <CertificateOfLicensePlateDisposition
                            title={CertificateOfLicensePlateDispositionBlock.blockName}
                            block={{
                                ...CertificateOfLicensePlateDispositionBlock,
                                reference: CertificateOfLicensePlateDispositionBlock.reference || "CertificateReference",
                            }}
                            values={certificateOfLicensePlateDispositionState}
                            onChange={handleCertificateOfLicensePlateDispositionChange}
                        />
                    )}
                    {disablePersonTypeBlock && (
                        <DpPlacardSection
                            title={disablePersonTypeBlock.blockName}
                            values={dpState}
                            onChange={setDpState}
                        />
                    )}
                    {disablePersonVehicleInfoBlock && (
                        <DisablePersonVehicleInfo
                            title={disablePersonVehicleInfoBlock.blockName}
                            values={dpVehicleInfoState}
                            onChange={setDpVehicleInfoState}
                            fields={disablePersonVehicleInfoBlock.fields}
                        />
                    )}
                    {documentsReceivedBlock && (
                        <Options
                            selected={optionsForValidation}
                            block={documentsReceivedBlock}
                            onChange={handleOptionsForValidations}
                        />
                    )}
                    <FormActions
                        loading={isLoading}
                        onSave={async () => {
                            setIsLoading(true);
                            await handleOnSave(user);
                            setIsLoading(false);
                            window.location.reload();

                        }}
                        onPrint={async () => {
                            setIsLoading(true);
                            if (optionsForValidation.length < 1) {
                                setOpen(true)
                                setIsLoading(false);
                                return
                            }
                            await headHandlerForPDf("combineForm")
                            setIsLoading(false);
                        }}
                        onInvoice={() => console.log('Generate Invoice clicked')}
                        onClear={() => {
                            localStorage.removeItem(LOCAL_STORAGE_KEY);
                            // localStorage.removeItem("senerio");
                            window.location.reload();
                        }}
                    />
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        title="Select Any Options"
                        description="Please select at least one option before saving."
                        intent="danger"
                        // cancelText="Cancel"
                        actions={[
                            {
                                label: "Continue",
                                onClick: () => setOpen(false),
                                variant: "primary",
                                autoFocus: true,
                            },
                        ]}
                    />
                </div >
            }

        </>
    );
};

export default CombineForm;