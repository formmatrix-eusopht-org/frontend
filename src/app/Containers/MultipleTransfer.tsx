'use client'
import React, { useEffect, useState, useRef } from 'react';
import { TransactionDetails } from './TransactionDetails';
import { TypeOfVehicle } from './TypeofVehicle';
import { useSenerioContext } from '../Contexts/SenerioContext';
import { VehicleInformationDetails } from './VehicleInformation';
import { VehicleStorageLocationDetails } from './VehicleStorageLocation';
import { RegisteredOwnerDetails } from './RegisteredOwner';
import { OwnerAddress } from './Address';
import { NewRegisteredOwnerAddress } from '@/app/Containers/NewRegisteredOwnerAddress'
import { LegalOwnerOfRecord } from './LegalOwnerOfRecord';
import { NewRegisteredOwnerDetails } from './NewRegisteredOwners';
import { DateInformation } from './DateInfo';
import VehicleStatusInformation from './VehicleStatusInformation';
import VehicleAcquisitionDetails from './VehicleAcquisitionDetails';
import OutOfStateVehicleSection from './OutOfStateInfo';
import { PowerOfAttorneyDetails } from './PowerOfAtttorney';
import { TheItemRequestedWasBlock } from './TheItemRequestedWasBlock';
import { LicensePlateMissingBlock } from './LicensePlate';
import { MissingTitleReason } from './MissingTitleReason';
import { LeinRealease } from './LienRelease';
import PlannedNonOperation from './PlannedNon-OperationCertificate';
import { NewLienHolder } from './NewLeinholder';
import StatementForSmogExemption from './StatementForSmogExemption';
import Options from './Options';
import FormActions from './ActionButtons';
// import { handleOnPDF, headHandlerFromPDF } from "../Actions/pdfGenerates"
import { handleOnSave } from '../Actions/save';
import { UserAuth } from '../Contexts/AuthContext';
import CustomDropdown from '../Components/CustomDropDown';
import { headHandlerForPDf } from '../Actions/pdfGenerates';


const initialVehicle = { plate: "", vin: "", make: "", equipment: "" };

interface AddressState {
    residential: Record<string, string>;
    mailing: Record<string, string>;
    isMailingDifferent: boolean;
}

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
    block?: FormBlock;
    onTransferCountChange: (count: number) => void;
    title?: string;
    state?: any;
    setState?: React.Dispatch<React.SetStateAction<any>>;
}

interface TransferState {
    transferNumber: number;
    transactionSelections: string[];
    typeOfVehicleSelection: string;
    vehicleInfoState: Record<string, string | boolean>;
    ownerCount: number;
    ownersData: Record<string, string>[];
    ownerAddress: AddressState;
    newOwnerCount: number;
    newOwnerData: Record<number, Record<string, string>>;
    newOwnershipTypes: Record<number, string>;
    newOwnerAddress: Record<string, string>;
    newOwnerMailingAddress: Record<string, string>;
    newOwnerLesseeAddress: Record<string, string>;
    newOwnerKeptAddress: Record<string, string>;
    selectedRadio: string | null;
    selectedOptions: string[];
    dateValues: Record<string, Record<string, string>>;
    powerOfAttorneyData: { appointer: string | null; appointee: string | null };
    otherExplain: string;
    missingReason: string;
    newLienholder: {
        address: Record<string, string>;
        mailingAddress: Record<string, string>;
        isMailingDifferent: boolean;
    };
    vehicleStatusInfoData: Record<string, string | boolean>;
    vehiclePurchaseInfo: Record<string, string>;
    outOfStateVehicle: any;
    LegalOwnerOfRecordData: any;
    statementForSomgExemptionData: Record<string, string | boolean>;
    lienReleaseState: any;
    itemRequestedWasState: any;
    licensePlateState: string;
    plannedNonOperationState: any[];
    vehicleStorageLocation: Record<string, string>;
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

const initialTransferState: Omit<TransferState, 'transferNumber'> = {
    transactionSelections: [],
    typeOfVehicleSelection: "",
    vehicleInfoState: {},
    ownerCount: 1,
    ownersData: [{}],
    ownerAddress: {
        residential: {},
        mailing: {},
        isMailingDifferent: false
    },
    newOwnerCount: 1,
    newOwnerData: {},
    newOwnershipTypes: { 1: "and", 2: "and", 3: "and" },
    newOwnerAddress: {},
    newOwnerMailingAddress: {},
    newOwnerLesseeAddress: {},
    newOwnerKeptAddress: {},
    selectedRadio: null,
    selectedOptions: [],
    dateValues: getInitialDateValues(),
    powerOfAttorneyData: { appointer: null, appointee: null },
    otherExplain: "",
    missingReason: "",
    newLienholder: {
        address: {},
        mailingAddress: {},
        isMailingDifferent: false,
    },
    vehicleStatusInfoData: {},
    vehiclePurchaseInfo: { "Vehicle Modifications": 'no' },
    outOfStateVehicle: {
        salesTaxPaid: "",
        salesTaxPaidAmount: "",
        outOfStatePlates: { value: "", label: "" }
    },
    LegalOwnerOfRecordData: {},
    statementForSomgExemptionData: {},
    lienReleaseState: {
        companyAddress: {},
        mailing: {},
        isMailingDifferent: false,
    },
    itemRequestedWasState: {
        checked: [],
        otherExplain: "",
        plateCount: [],
    },
    licensePlateState: '',
    plannedNonOperationState: [{ ...initialVehicle }],
    vehicleStorageLocation: {}
};

const MultipleTransfer = ({ title, state, setState, onTransferCountChange, block, formData }: CombineFormProps) => {
    const isInitialMount = useRef(true);
    const numberOfTransfers = 5;
    const [transferCount, setTransferCount] = useState(state?.length || 1);
    const [activeTab, setActiveTab] = useState(1);
    const { user } = UserAuth();
    const { senerio } = useSenerioContext();
    const LOCAL_STORAGE_KEY = "multipleTransferStates";
    const [isLoading, setIsLoading] = useState(false);
    const [multipleTransfer, setMultipleTransfer] = useState<TransferState[]>([{ ...initialTransferState, transferNumber: 1 }]);

    const getCurrentTransfer = () => {
        return multipleTransfer.find(t => t.transferNumber === activeTab) || multipleTransfer[0];
    };

    const updateCurrentTransfer = (updates: Partial<TransferState>) => {
        setMultipleTransfer(prev =>
            prev.map(transfer =>
                transfer.transferNumber === activeTab
                    ? { ...transfer, ...updates }
                    : transfer
            )
        );
    };


    const syncToNextTransfer = (fromTransferNumber: number) => {
        setMultipleTransfer((prevTransfers) => {
            const fromTransfer = prevTransfers.find(t => t.transferNumber === fromTransferNumber);
            if (!fromTransfer) return prevTransfers;

            const nextTransferIndex = prevTransfers.findIndex(t => t.transferNumber === fromTransferNumber + 1);
            const nextTransfer = prevTransfers[nextTransferIndex];

            const updatedTransfer = {
                ...(nextTransfer || { ...initialTransferState }),
                transferNumber: fromTransferNumber + 1,
                ownerCount: fromTransfer.newOwnerCount,
                ownersData: Object.values(fromTransfer.newOwnerData || {}),
                ownerAddress: {
                    residential: { ...fromTransfer.newOwnerAddress },
                    mailing: { ...fromTransfer.newOwnerMailingAddress },
                    isMailingDifferent: !!Object.keys(fromTransfer.newOwnerMailingAddress || {}).length
                }
            };

            if (nextTransferIndex !== -1) {
                return prevTransfers.map((t, i) =>
                    i === nextTransferIndex ? updatedTransfer : t
                );
            } else {
                return [...prevTransfers, updatedTransfer];
            }
        });
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (activeTab < multipleTransfer.length) {
                syncToNextTransfer(activeTab);
            }
        }, 300); // Debounce typing

        return () => clearTimeout(timeout);
    }, [
        multipleTransfer[activeTab]?.newOwnerCount,
        JSON.stringify(multipleTransfer[activeTab]?.newOwnerData),
        JSON.stringify(multipleTransfer[activeTab]?.newOwnerAddress),
        JSON.stringify(multipleTransfer[activeTab]?.newOwnerMailingAddress),
        JSON.stringify(multipleTransfer[activeTab]?.newOwnerLesseeAddress),
        JSON.stringify(multipleTransfer[activeTab]?.newOwnerKeptAddress),
    ]);



    const handleTransferChange = (val: string, label: string) => {
        const newCount = parseInt(val);
        setTransferCount(newCount);
        onTransferCountChange(newCount);

        setMultipleTransfer(prev => {
            const updatedTransfers = Array.from({ length: newCount }, (_, index) => {
                const existingTransfer = prev[index];
                return existingTransfer || { ...initialTransferState, transferNumber: index + 1 };
            });

            return updatedTransfers;
        });

        // Sync after transfers are set
        // Delay to next tick to ensure state is updated
        // setTimeout(() => syncToNextTransfer(activeTab), 0);
    };

    // ===> Handler for transaction selections
    const handleTransactionChange = (label: string, checked: boolean) => {
        const current = getCurrentTransfer();
        const updatedSelections = checked
            ? [...current.transactionSelections, label]
            : current.transactionSelections.filter(item => item !== label);

        updateCurrentTransfer({
            transactionSelections: updatedSelections,
            ...(label === "Is the Vehicle a Motorcycle" && {
                typeOfVehicleSelection: checked ? "MOTORCYCLE" : "",
                vehicleInfoState: checked ? current.vehicleInfoState :
                    Object.fromEntries(
                        Object.entries(current.vehicleInfoState)
                            .filter(([key]) => key !== "Motorcycle Engine Number")
                    )
            })
        });
    };

    //===>  Handler for vehicle type selection
    const handleTypeOfVehicleChange = (label: string, checked: boolean) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            typeOfVehicleSelection: checked ? label : "",
            ...(label === "MOTORCYCLE" && {
                transactionSelections: checked
                    ? [...new Set([...current.transactionSelections, "Is the Vehicle a Motorcycle"])]
                    : current.transactionSelections.filter(item => item !== "Is the Vehicle a Motorcycle"),
                ...(!checked && {
                    vehicleInfoState: Object.fromEntries(
                        Object.entries(current.vehicleInfoState)
                            .filter(([key]) => key !== "Motorcycle Engine Number")
                    )
                })
            })
        });
    };

    //===>  Handler for vehicle information fields
    const handleVehicleFieldChange = (label: string, value: string | boolean) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            vehicleInfoState: {
                ...current.vehicleInfoState,
                [label]: value
            }
        });
    };

    //===>  Handler for owner count change
    const handleOwnerCountChange = (count: number) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            ownerCount: count,
            ownersData: Array.from({ length: count }, (_, i) => current.ownersData[i] || {})
        });
    };

    //===>  Handler for registered owner fields
    const handleRegisteredOwnerFieldChange = (index: number, label: string, value: string) => {
        const current = getCurrentTransfer();
        const updatedOwners = [...current.ownersData];
        if (!updatedOwners[index]) updatedOwners[index] = {};
        updatedOwners[index][label] = value;
        updateCurrentTransfer({ ownersData: updatedOwners });
    };

    // ===> Handler for owner address fields
    const handleOwnerAddressChange = (section: "residential" | "mailing", field: string, value: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            ownerAddress: {
                ...current.ownerAddress,
                [section]: {
                    ...current.ownerAddress[section],
                    [field]: value
                }
            }
        });
    };

    // ===> Toggle for mailing address
    const toggleMailingAddress = () => {
        const current = getCurrentTransfer();
        const newIsDifferent = !current.ownerAddress.isMailingDifferent;
        updateCurrentTransfer({
            ownerAddress: {
                ...current.ownerAddress,
                isMailingDifferent: newIsDifferent,
                mailing: newIsDifferent ? current.ownerAddress.mailing : {}
            }
        });
    };

    // ===> Handler for new owner fields
    const handleNewOwnerFieldChange = (ownerIndex: number, label: string, value: string) => {
        const current = getCurrentTransfer();

        const updatedOwner = {
            ...(current.newOwnerData?.[ownerIndex] || {}),
            [label]: value,
        };

        const updatedNewOwnerData = {
            ...current.newOwnerData,
            [ownerIndex]: updatedOwner
        };

        updateCurrentTransfer({
            newOwnerData: updatedNewOwnerData
        });
    };


    // ===> Handler for ownership type (AND/OR) radio buttons
    const handleNewOwnershipChange = (ownerIndex: number, value: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            newOwnershipTypes: {
                ...current.newOwnershipTypes,
                [ownerIndex]: value,
            }
        });
    };

    // ===> Handler for new owner address fields
    const handleNewOwnerAddressChange = (
        section: "residential" | "mailing" | "lessee" | "kept",
        label: string,
        value: string
    ) => {
        const current = getCurrentTransfer();
        switch (section) {
            case "residential":
                updateCurrentTransfer({ newOwnerAddress: { ...current.newOwnerAddress, [label]: value } });
                break;
            case "mailing":
                updateCurrentTransfer({ newOwnerMailingAddress: { ...current.newOwnerMailingAddress, [label]: value } });
                break;
            case "lessee":
                updateCurrentTransfer({ newOwnerLesseeAddress: { ...current.newOwnerLesseeAddress, [label]: value } });
                break;
            case "kept":
                updateCurrentTransfer({ newOwnerKeptAddress: { ...current.newOwnerKeptAddress, [label]: value } });
                break;
        }
    };

    // ===> Handler for date fields
    const handleDateChange = (fieldName: string, subFieldName: string, value: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            dateValues: {
                ...current.dateValues,
                [fieldName]: {
                    ...current.dateValues[fieldName],
                    [subFieldName]: value
                }
            }
        });
    };

    // ===> Handler for power of attorney fields
    const handlePowerOfAttorneyChange = (field: 'appointer' | 'appointee', value: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            powerOfAttorneyData: {
                ...current.powerOfAttorneyData,
                [field]: value
            }
        });
    };

    // ===> Handler for lienholder fields
    const handleLienholderFieldChange = (label: string, value: string | boolean) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            newLienholder: {
                ...current.newLienholder,
                address: {
                    ...current.newLienholder.address,
                    [label]: typeof value === "string" ? value : value ? "true" : "false",
                },
            }
        });
    };

    // ===> Handler for lienholder mailing fields
    const handleLienholderMailingFieldChange = (label: string, value: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            newLienholder: {
                ...current.newLienholder,
                mailingAddress: {
                    ...current.newLienholder.mailingAddress,
                    [label]: value,
                },
            }
        });
    };

    // ===> Toggle for lienholder mailing address
    const toggleLienholderMailingAddress = (isDifferent: boolean) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            newLienholder: {
                ...current.newLienholder,
                isMailingDifferent: isDifferent,
            }
        });
    };

    // ===> Handler for vehicle status info fields
    const handleVehicleStatusInfoFieldChange = (label: string, value: string | boolean) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            vehicleStatusInfoData: {
                ...current.vehicleStatusInfoData,
                [label]: value,
            }
        });
    };

    // ===> Handler for vehicle purchase info fields
    const handleVehiclePurchaseInfoChange = (fieldLabel: string, value: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            vehiclePurchaseInfo: {
                ...current.vehiclePurchaseInfo,
                [fieldLabel]: value
            }
        });
    };

    // ===> Handler for out of state vehicle fields
    const handleOutOfStateVehcileFieldChange = (field: string, value: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            outOfStateVehicle: {
                ...current.outOfStateVehicle,
                [field]: value
            }
        });
    };

    // ===> Handler for out of state vehicle plate selection
    const handleOutOfStateVehcilePlateSelect = (value: string, label: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            outOfStateVehicle: {
                ...current.outOfStateVehicle,
                outOfStatePlates: { value, label }
            }
        });
    };
    const handleLegalOwnerFieldChange = (
        section: "residential" | "mailing",
        label: string,
        value: string | boolean
    ) => {
        const current = getCurrentTransfer();

        updateCurrentTransfer({
            LegalOwnerOfRecordData: {
                ...current.LegalOwnerOfRecordData,
                [section]: {
                    ...current.LegalOwnerOfRecordData?.[section],
                    [label]: typeof value === "string" ? value : value ? "true" : "false",
                },
            },
        });
    };

    const legalOwnerToggleMailingAddress = () => {
        const current = getCurrentTransfer();

        updateCurrentTransfer({
            LegalOwnerOfRecordData: {
                ...current.LegalOwnerOfRecordData,
                showMailingAddress: !current.LegalOwnerOfRecordData?.showMailingAddress,
            },
        });
    };

    // ===> Handler for smog exemption fields
    const handleStatementForSomgExemption = (label: string, value: string | boolean) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            statementForSomgExemptionData: {
                ...current.statementForSomgExemptionData,
                [label]: value,
            }
        });
    };

    // ===> Handler for lien release address fields
    const handleLienAddressChange = (
        section: "companyAddress" | "mailing",
        label: string,
        value: string
    ) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            lienReleaseState: {
                ...current.lienReleaseState,
                [section]: {
                    ...current.lienReleaseState[section],
                    [label]: value,
                },
            }
        });
    };

    // ===> Toggle for lien release mailing address
    const handleToggleLienReleaseMailingDifferent = (isDifferent: boolean) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            lienReleaseState: {
                ...current.lienReleaseState,
                isMailingDifferent: isDifferent,
                mailing: isDifferent ? current.lienReleaseState.mailing : {}
            }
        });
    };

    // ===> Handler for item requested other explanation
    const handleItemRequestedOtherExplainChange = (val: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            itemRequestedWasState: {
                ...current.itemRequestedWasState,
                otherExplain: val
            }
        });
    };

    // ===> Handler for item requested plate count
    const handleItemRequestedPlateCountChange = (count: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            itemRequestedWasState: {
                ...current.itemRequestedWasState,
                plateCount: current.itemRequestedWasState.plateCount.includes(count) ? [] : [count],
            }
        });
    };

    // ===> Handler for item requested checkboxes
    const handleItemRequestedCheckChange = (value: string) => {
        const current = getCurrentTransfer();
        let updatedChecked = [...current.itemRequestedWasState.checked];

        // ===> Define exclusive groups
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

        updateCurrentTransfer({
            itemRequestedWasState: {
                ...current.itemRequestedWasState,
                checked: updatedChecked,
            }
        });
    };

    // ===> Handler for license plate selection
    const handleLicensePlateChange = (val: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            licensePlateState: current.licensePlateState === val ? "" : val
        });
    };

    const mutuallyExclusive = [
        "if-lessee-address-is-different",
        "trailer/vessel-location",
    ];

    // ===> Handler for toggle options
    const handleToggleOption = (value: string) => {
        const current = getCurrentTransfer();
        const isMutuallyExclusive = mutuallyExclusive.includes(value);
        const alreadySelected = current.selectedOptions.includes(value);

        let newSelection = alreadySelected
            ? current.selectedOptions.filter((v) => v !== value)
            : [...current.selectedOptions, value];

        if (isMutuallyExclusive && !alreadySelected) {
            const other = mutuallyExclusive.find((opt) => opt !== value);
            newSelection = newSelection.filter((opt) => opt !== other);
        }

        updateCurrentTransfer({
            selectedOptions: newSelection,
            ...(value === "if-lessee-address-is-different" && alreadySelected && {
                newOwnerLesseeAddress: {}
            }),
            ...(value === "trailer/vessel-location" && alreadySelected && {
                newOwnerKeptAddress: {}
            }),
            ...(isMutuallyExclusive && !alreadySelected && {
                ...(mutuallyExclusive.find((opt) => opt !== value) === "if-lessee-address-is-different" && {
                    newOwnerLesseeAddress: {}
                }),
                ...(mutuallyExclusive.find((opt) => opt !== value) === "trailer/vessel-location" && {
                    newOwnerKeptAddress: {}
                })
            })
        });
    };

    // ===>  Handler for planned non-operation fields
    const handlePlannedNonOperationChange = (index: number, field: string, value: string) => {
        const current = getCurrentTransfer();
        const updated = [...current.plannedNonOperationState];
        (updated[index] as any)[field] = value;
        updateCurrentTransfer({ plannedNonOperationState: updated });
    };

    // ===>  Add planned non-operation vehicle
    const handlePlannedNonOperationAdd = () => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            plannedNonOperationState: [...current.plannedNonOperationState, { ...initialVehicle }]
        });
    };

    // ===>  Remove planned non-operation vehicle
    const handlePlannedNonOperationRemove = (index: number) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            plannedNonOperationState: current.plannedNonOperationState.filter((_, i) => i !== index)
        });
    };

    // ===>  Handler for vehicle storage location fields
    const handleVehicleStorageLocation = (label: string, value: string | boolean) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            vehicleStorageLocation: {
                ...current.vehicleStorageLocation,
                [label]: String(value)
            }
        });
    };

    // ===>  Handler for options validation
    const handleOptionsForValidations = (options: string[] = []) => {
        updateCurrentTransfer({
            selectedOptions: options
        });
    }

    // ===>  Find all relevant blocks
    const findBlock = (ref: string) =>
        formData.find((block): block is FormBlock & { fields: any[] } =>
            block.reference === ref && Array.isArray(block.fields)
        );

    // ===>  Find Blocks by their reference name
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

    // ===>  Update power of attorney data when owners change
    useEffect(() => {
        const current = getCurrentTransfer();
        const owner = current.ownersData[0];
        const newOwner = current.newOwnerData[0];

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
            updateCurrentTransfer({
                powerOfAttorneyData: {
                    ...current.powerOfAttorneyData,
                    ...(appointerParts.length && { appointer: appointerParts.join(' ') }),
                    ...(appointeeParts.length && { appointee: appointeeParts.join(' ') }),
                }
            });
        }
    }, [getCurrentTransfer().ownersData, getCurrentTransfer().newOwnerData]);

    // ===>  Load saved state from localStorage
    useEffect(() => {
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (Array.isArray(parsed.multipleTransfer)) {
                    setMultipleTransfer(parsed.multipleTransfer);
                    setTransferCount(parsed.multipleTransfer.length);
                }
            } catch (e) {
                console.error('Failed to parse localStorage data:', e);
            }
        }
    }, []);

    // ===> Save to localStorage on change (except first render)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ multipleTransfer }));
    }, [multipleTransfer]);

    // ===>  Get current transfer data for validation
    const currentTransfer = getCurrentTransfer();
    const isMotorcycle = currentTransfer.transactionSelections?.includes("Is the Vehicle a Motorcycle");
    const isTransactionWithVehicleTitle = currentTransfer.transactionSelections.includes("Transaction with Vehicle Title");
    const isTRAILERCOACH = currentTransfer.typeOfVehicleSelection === "TRAILER COACH";
    const isOutofStateTitle = currentTransfer.transactionSelections.includes("Out of State Title");
    const isThereIsACurrentLeinHolder = currentTransfer.transactionSelections.includes("There is a Current Lienholder");
    const isVehickeIsAGift = currentTransfer.transactionSelections.includes("Vehicle is a Gift");
    const isSmogExemption = currentTransfer.transactionSelections.includes("Smog Exemption");
    const requestPNOCardFlag = currentTransfer.transactionSelections.includes("Request PNO card");

    const dropdownOptions = numberOfTransfers
        ? Array.from({ length: numberOfTransfers }, (_, i) => i + 1).map((num) => ({
            label: num.toString(),
            value: num.toString(),
            name: num.toString(),
            abbreviation: num.toString(),
        }))
        : [];
    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold"> {title}</h2>
                <label className="text-lg font-semibold"> Number of Transfers:</label>
                <div className="w-[4rem]">
                    <CustomDropdown
                        value={transferCount.toString()}
                        onChange={handleTransferChange}
                        options={dropdownOptions}
                    />
                </div>
            </div>

            <div className="flex overflow-x-auto w-full gap-0">
                {[...Array(transferCount)].map((_, i) => {
                    const index = i + 1;
                    return (
                        <button
                            key={index}
                            className={`w-full py-2 rounded-t-xl font-medium cursor-pointer ${activeTab === index ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setActiveTab(index)}
                        >
                            Transfer {index}
                        </button>
                    );
                })}
            </div>

            <div className="space-y-6">
                {transactionBlock && (
                    <TransactionDetails
                        title="Transaction Details"
                        block={transactionBlock}
                        senerio={senerio}
                        selectedItems={currentTransfer.transactionSelections}
                        onChange={handleTransactionChange}
                    />
                )}

                {typeOfVehicleBlock && isOutofStateTitle && (
                    <TypeOfVehicle
                        title="Type of Vehicle"
                        block={typeOfVehicleBlock}
                        selectedItems={currentTransfer.typeOfVehicleSelection}
                        onChange={handleTypeOfVehicleChange}
                    />
                )}

                {missingTitleReasonBlock && !isTransactionWithVehicleTitle && (transferCount == activeTab) && (
                    <MissingTitleReason
                        title="Missing Title Reason"
                        selectedReason={currentTransfer.missingReason}
                        onReasonChange={(reason) => updateCurrentTransfer({ missingReason: reason })}
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
                                    value: currentTransfer.vehicleInfoState[field.label] ?? (field.type === "checkbox" ? false : ""),
                                }))
                        }}
                        onFieldChange={handleVehicleFieldChange}
                    />
                )}

                {vehicleStorageLocationBlock && (
                    <VehicleStorageLocationDetails
                        title="Vehicle Storage Location"
                        block={vehicleStorageLocationBlock}
                        formState={currentTransfer.vehicleStorageLocation}
                        onFieldChange={handleVehicleStorageLocation}
                    />
                )}

                {registeredOwnerBlock && (
                    <RegisteredOwnerDetails
                        title="Registered Owner(s)"
                        block={registeredOwnerBlock}
                        ownerCount={currentTransfer.ownerCount}
                        onOwnerCountChange={handleOwnerCountChange}
                        ownersData={currentTransfer.ownersData}
                        onFieldChange={handleRegisteredOwnerFieldChange}
                    />
                )}

                {ownerAddressBlock && (
                    <OwnerAddress
                        title="Address"
                        block={ownerAddressBlock}
                        residentialAddress={currentTransfer.ownerAddress.residential}
                        mailingAddress={currentTransfer.ownerAddress.mailing}
                        isMailingDifferent={currentTransfer.ownerAddress.isMailingDifferent}
                        onAddressChange={handleOwnerAddressChange}
                        onToggleMailingAddress={toggleMailingAddress}
                    />
                )}

                {LegalOwnerOfRecordBlock && isThereIsACurrentLeinHolder && (
                    <LegalOwnerOfRecord
                        block={LegalOwnerOfRecordBlock}
                        legalOwnerAddress={currentTransfer.LegalOwnerOfRecordData?.residential}
                        legalOwnerMailingAddress={currentTransfer.LegalOwnerOfRecordData?.mailing}
                        selectedRadio={
                            currentTransfer.LegalOwnerOfRecordData?.showMailingAddress
                                ? ["if-mailing-address-is-different"]
                                : []
                        }
                        onToggleOption={legalOwnerToggleMailingAddress}
                        onAddressChange={handleLegalOwnerFieldChange}
                        isOutofStateTitle={isOutofStateTitle}
                    />
                )}

                {newRegisteredOwnerBlock && (
                    <NewRegisteredOwnerDetails
                        title="New Registered Owner(s)"
                        block={newRegisteredOwnerBlock}
                        newOwnerCount={currentTransfer.newOwnerCount}
                        onNewOwnerCountChange={(count) => updateCurrentTransfer({ newOwnerCount: count })}
                        newOwnerData={currentTransfer.newOwnerData}
                        onNewOwnerFieldChange={handleNewOwnerFieldChange}
                        NewOwnershipTypes={currentTransfer.newOwnershipTypes}
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
                        newOwnerAddress={currentTransfer.newOwnerAddress}
                        newOwnerMailingAddress={currentTransfer.newOwnerMailingAddress}
                        newOwnerLesseeAddress={currentTransfer.newOwnerLesseeAddress}
                        newOwnerKeptAddress={currentTransfer.newOwnerKeptAddress}
                        selectedRadio={currentTransfer.selectedOptions}
                        onToggleOption={handleToggleOption}
                        onAddressChange={handleNewOwnerAddressChange}
                    />
                )}

                {dateInformationBlock && dateInformationBlock.reference && isOutofStateTitle && (
                    <DateInformation
                        title="DATE INFORMATION"
                        block={{ ...dateInformationBlock, reference: dateInformationBlock.reference as string }}
                        dateValues={currentTransfer.dateValues}
                        onDateChange={handleDateChange}
                    />
                )}

                {vehicleStatusBlock && isOutofStateTitle && (
                    <VehicleStatusInformation
                        title="Vehicle Status Information"
                        block={vehicleStatusBlock}
                        onFieldChange={handleVehicleStatusInfoFieldChange}
                        values={currentTransfer.vehicleStatusInfoData}
                    />
                )}

                {vehicleAcquisitionBlock && isOutofStateTitle && (
                    <VehicleAcquisitionDetails
                        title={vehicleAcquisitionBlock.blockName}
                        block={vehicleAcquisitionBlock}
                        values={currentTransfer.vehiclePurchaseInfo}
                        onFieldChange={handleVehiclePurchaseInfoChange}
                    />
                )}

                {OutOfStateBlock && isOutofStateTitle && (
                    <OutOfStateVehicleSection
                        values={currentTransfer.outOfStateVehicle}
                        onFieldChange={handleOutOfStateVehcileFieldChange}
                        onPlateSelect={handleOutOfStateVehcilePlateSelect}
                    />
                )}

                {powerOfAttorneyBlock && (
                    <PowerOfAttorneyDetails
                        title="Power of Attorney"
                        block={powerOfAttorneyBlock}
                        appointer={currentTransfer.powerOfAttorneyData.appointer}
                        appointee={currentTransfer.powerOfAttorneyData.appointee}
                        onChange={handlePowerOfAttorneyChange}
                    />
                )}

                {itemRequestedWasBlock && (
                    <TheItemRequestedWasBlock
                        title="The Item Requested Was"
                        block={itemRequestedWasBlock}
                        checkedItems={currentTransfer.itemRequestedWasState.checked}
                        otherExplain={currentTransfer.itemRequestedWasState.otherExplain}
                        onCheckChange={handleItemRequestedCheckChange}
                        onOtherExplainChange={handleItemRequestedOtherExplainChange}
                        plateCount={currentTransfer.itemRequestedWasState.plateCount}
                        onPlateCountChange={handleItemRequestedPlateCountChange}
                    />
                )}

                {LicensePlateBlock && (
                    <LicensePlateMissingBlock
                        title={LicensePlateBlock.blockName}
                        block={LicensePlateBlock}
                        selectedOption={currentTransfer.licensePlateState}
                        handleSelectedOptionOnChange={handleLicensePlateChange}
                    />
                )}

                {LienReleaseBlock && (
                    <LeinRealease
                        title="Lien Release"
                        block={LienReleaseBlock}
                        lienReleaseState={currentTransfer.lienReleaseState}
                        onLienReleaseChange={handleLienAddressChange}
                        onToggleMailingDifferent={handleToggleLienReleaseMailingDifferent}
                    />
                )}

                {plannedNonOperationCertificateBlock && (
                    <PlannedNonOperation
                        title="Planned Non-Operation Certificate"
                        vehicles={currentTransfer.plannedNonOperationState}
                        onChange={handlePlannedNonOperationChange}
                        onAdd={handlePlannedNonOperationAdd}
                        onRemove={handlePlannedNonOperationRemove}
                        fields={plannedNonOperationCertificateBlock.fields}
                    />
                )}

                {newLienHolderBlock && (
                    <NewLienHolder
                        block={newLienHolderBlock}
                        formState={currentTransfer.newLienholder.address}
                        mailingAddress={currentTransfer.newLienholder.mailingAddress}
                        isMailingDifferent={currentTransfer.newLienholder.isMailingDifferent}
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
                        values={currentTransfer.statementForSomgExemptionData}
                    />
                )}

                <Options
                    selected={currentTransfer.selectedOptions}
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
                    //onPrint={() =>  console.log('Print clicked in MultipleTransfer')}
                    onPrint={async () => {
                        setIsLoading(true);
                        await headHandlerForPDf("Multiple Transfer");
                        setIsLoading(false);
                    }}
                    onInvoice={() => console.log('Generate Invoice clicked')}
                    onClear={() => {
                        localStorage.removeItem(LOCAL_STORAGE_KEY);
                        // localStorage.removeItem("senerio");
                        window.location.reload();
                    }}
                />
            </div>
        </div>
    );
};

export default MultipleTransfer;
