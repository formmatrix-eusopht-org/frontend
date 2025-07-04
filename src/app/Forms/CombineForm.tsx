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
import { handleOnPDF } from "../Actions/pdf"
import Options from '../Containers/Options';
import { UserAuth } from '../Contexts/AuthContext';

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

interface CombineFormProps {
    formData: FormBlock[];
}
interface AddressState {
    residential: Record<string, string>;
    mailing: Record<string, string>;
    isMailingDifferent: boolean;
}
const CombineForm = ({ formData }: CombineFormProps) => {
    const isInitialMount = useRef(true);
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
    // OLD:
    const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

    // NEW:
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
    const [LegalOwnerOfRecordData, setLegalOwnerOfRecordData] = useState({})
    //Vehicle Statis Info
    const [vehicleStatusInfoData, setVehicleStatusInfoData] = useState<Record<string, string | boolean>>({});
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
    const [lienReleaseState, setLienReleaseState] = useState({
        companyAddress: {},
        mailing: {},
        isMailingDifferent: false,
    });
    const [licensePlateState, setLicensePlateState] = useState('');
    const [plannedNonOperationState, setPlannedNonOperationState] = useState([{ ...initialVehicle }]);
    const [vehicleStorageLocation, setVehicleStorageLocation] = useState<Record<string, string>>({});
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
        setVehicleInfoState(prev => {
            const updated = { ...prev, [label]: value };
            return updated;
        });
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

    const handleLegalOwnerFieldChange = (label: string, value: string | boolean) => {
        setLegalOwnerOfRecordData((prev) => ({
            ...prev,
            [label]: typeof value === "string" ? value : value ? "true" : "false",
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
                plateCount: prev.plateCount.includes(count) ? [] : [count],
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
                if (group.includes(value)) {
                    updatedChecked = updatedChecked.filter((v) => !group.includes(v) || v === value);
                    break;
                }
            }

            if (updatedChecked.includes(value)) {
                updatedChecked = updatedChecked.filter((v) => v !== value);
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
        const isMutuallyExclusive = mutuallyExclusive.includes(value);

        setSelectedOptions((prev) => {
            const alreadySelected = prev.includes(value);

            // If already selected, deselect it and clear its data
            if (alreadySelected) {
                if (value === "if-lessee-address-is-different") {
                    setNewOwnerLesseeAddress({});
                } else if (value === "trailer/vessel-location") {
                    setNewOwnerKeptAddress({});
                }
                return prev.filter((v) => v !== value);
            }

            let newSelection = [...prev, value];

            if (isMutuallyExclusive) {
                // Disable and clear the other mutually exclusive option
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
            setLegalOwnerOfRecordData(parsed.LegalOwnerOfRecordData)
            setStatementForSomgExemptionData(parsed.statementForSomgExemptionData)
            setLienReleaseState(parsed.lienReleaseState)
            setItemRequestedWasState(parsed.itemRequestedWasState)
            setLicensePlateState(parsed.licensePlateState)
            setPlannedNonOperationState(parsed.plannedNonOperationState)
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
            plannedNonOperationState
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
        plannedNonOperationState
    ]);
    //validations for form
    const isMotorcycle = transactionSelections.includes("Is the Vehicle a Motorcycle");
    const isTransactionWithVehicleTitle = transactionSelections.includes("Transaction with Vehicle Title");
    const isTRAILERCOACH = typeOfVehicleSelection === "TRAILER COACH";
    const isOutofStateTitle = transactionSelections.includes("Out of State Title");
    const isThereIsACurrentLeinHolder = transactionSelections.includes("There is a Current Lienholder");
    const isVehickeIsAGift = transactionSelections.includes("Vehicle is a Gift");
    const isSmogExemption = transactionSelections.includes("Smog Exemption");
    const requestPNOCardFlag = transactionSelections.includes("Request PNO card");
    // const isRegisteredOwnerValidForPNO = requestPNOCardFlag && senerio.includes("Filing for Planned Non-Operation (PNO)")

    return (
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

            {vehicleInfoBlock && (
                <VehicleInformationDetails
                    title="Vehicle Information"
                    block={{
                        ...vehicleInfoBlock,
                        fields: vehicleInfoBlock.fields
                            ?.filter(field => isMotorcycle || field.label !== "Motorcycle Engine Number")
                            ?.filter(field => isOutofStateTitle || field.label !== "If kilometers check this box")
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
            {vehicleStorageLocationBlock && (
                <VehicleStorageLocationDetails
                    title="Vehicle Storage Location"
                    block={vehicleStorageLocationBlock}
                    formState={vehicleStorageLocation}
                    onFieldChange={handleVehicleStorageLocation}
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
                    formState={LegalOwnerOfRecordData}
                    onFieldChange={handleLegalOwnerFieldChange}
                />
            }
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
                    selectedOptions={selectedOptions}
                    onToggleOption={handleToggleOption}
                    onAddressChange={handleNewOwnerAddressChange}
                />
            )}
            {dateInformationBlock && dateInformationBlock.reference && isOutofStateTitle && (
                <DateInformation
                    title="DATE INFORMATION"
                    block={{ ...dateInformationBlock, reference: dateInformationBlock.reference as string }}
                    dateValues={dateValues}
                    onDateChange={handleDateChange}
                />
            )}
            {vehicleStatusBlock && isOutofStateTitle && (
                <VehicleStatusInformation
                    title="Vehicle Status Information"
                    block={vehicleStatusBlock}
                    onFieldChange={handleVehicleStatusInfoFieldChange}
                    values={vehicleStatusInfoData}
                />

            )}
            {vehicleAcquisitionBlock && isOutofStateTitle && (
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
            {powerOfAttorneyBlock && (
                <PowerOfAttorneyDetails
                    title="Power of Attorney"
                    block={powerOfAttorneyBlock}
                    appointer={powerOfAttorneyData.appointer}
                    appointee={powerOfAttorneyData.appointee}
                    onChange={handlePowerOfAttorneyChange}
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
            {missingTitleReasonBlock && !isTransactionWithVehicleTitle && (
                <MissingTitleReason
                    title="Missing Title Reason"
                    selectedReason={missingReason}
                    onReasonChange={setMissingReason}
                />
            )}

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
            <Options
                selected={optionsForValidation}
                onChange={handleOptionsForValidations}
            />
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
                    await handleOnPDF();
                    setIsLoading(false);
                }}
                onInvoice={() => console.log('Generate Invoice clicked')}
                onClear={() => {
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                    localStorage.removeItem("senerio");
                    window.location.reload();
                }}
            />
        </div>
    );
};

export default CombineForm;