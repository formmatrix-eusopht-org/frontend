'use client'
import React, { useEffect, useState, useRef } from 'react';
import { TransactionDetails } from './TransactionDetails';
import { TypeOfVehicle } from './TypeofVehicle';
import { useSenerioContext } from '../Contexts/SenerioContext';
import { VehicleInformationDetails } from './VehicleInformation';
import { VehicleStorageLocationDetails } from './VehicleStorageLocation';
import { RegisteredOwnerDetails } from './RegisteredOwner';
import { OwnerAddress } from './Address';
import { NewRegisteredOwnerAddress } from '@/Containers/NewRegisteredOwnerAddress'
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
import { handleOnUpdate } from '@/Actions/edit';
import { PlatesSelection } from './PersonalizePlates';
import SelectConfiguration from './Configration';
import PlatePurchaserAndOwner from './PlatePurchaserAndOwner';
import DpPlacardSection from './DisablePersion';
import DisablePersonVehicleInfo from './DisablePersonVehicleInfo';
import CommercialVehicleInfo from './CommertialVehicle';
import VehicleDeclarationEntry from './VehicleDeclarationEntry';
import VehicleBodyChange from './StatementForVehicleBodyChange';
import SalvageCertificate from './SalvageCertificate';
import CertificateOfLicensePlateDisposition from './CertifiacteOf LicensePlateDisposition';
import { useConfirm } from '@/Contexts/ConfirnContext';


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
    isEditAndId?: any
}

interface TransferState {
    platePurchaseState: any;
    certificateOfLicensePlateDispositionState: any;
    dpState: any;
    dpVehicleInfoState: any;
    transferNumber: number;
    transactionSelections: string[];
    personalizePlatesState: string;
    platesSelectionState: any;
    selectConfigState: any;
    typeOfVehicleSelection: string;
    salvageCertificateState: any;
    commercialInfo: any;
    vehicleDeclarationEntryData: any;
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
    selectedRadio: string[];
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
    vehicleBodyState: any;
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
    salvageCertificateState: {},
    commercialInfo: {},
    vehicleDeclarationEntryData: [],
    personalizePlatesState: "Order",
    dpVehicleInfoState: {
        plate: "",
        vin: "",
        make: "",
        year: "",
    },
    platesSelectionState: {
        selectedPlate: "",
        veteranCode: "",
        duplicatePlate: ""
    },
    platePurchaseState: {
        platePurchase: {},
        plateOwner: {},
        ifPlateOwnerIsDifferent: false,
    },
    certificateOfLicensePlateDispositionState: {
        licensePlatesAssignedTo: "", // only one value allowed from options
        platesSurrendered: "",        // e.g., "Surrendered", "Lost", etc.
        occupationalLicenseNumber: ""
    },
    dpState: {
        selectedPlacard: "",
        issuedPreviously: "",
        plate: ''
    },
    selectConfigState: {
        assignedTo: '',
        assignedFor: "",
        licensePlateNumber: "",
        vehicleIdentificationNumber: "",
        plateChoices: [{ text: "", meaning: "" }, { text: "", meaning: "" }, { text: "", meaning: "" }],
        location: '',
        deliveryType: "",
        centered: "",
    },
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
    selectedRadio: [],
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
    vehicleBodyState: {},
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

const MultipleTransfer = ({ title, state, setState, onTransferCountChange, block, formData, isEditAndId }: CombineFormProps) => {
    const isInitialMount = useRef(true);
    const numberOfTransfers = 5;

    const confirm = useConfirm();
    const [transferCount, setTransferCount] = useState(state?.length || 1);
    const [activeTab, setActiveTab] = useState(1);
    const { user } = UserAuth();
    const { senerio } = useSenerioContext();
    const LOCAL_STORAGE_KEY_form = "multipleTransferStates";
    const LOCAL_STORAGE_KEY_senerio = "senerio";
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
        if (fromTransferNumber !== 1) {
            // Only sync owner chain (new owner → next registered owner)
            setMultipleTransfer((prevTransfers) => {
                const fromTransfer = prevTransfers.find(t => t.transferNumber === fromTransferNumber);
                if (!fromTransfer) return prevTransfers;

                const nextTransferIndex = prevTransfers.findIndex(t => t.transferNumber === fromTransferNumber + 1);
                if (nextTransferIndex === -1) return prevTransfers;

                const nextTransfer = prevTransfers[nextTransferIndex];

                const syncedOwnersData = Object.values(fromTransfer.newOwnerData || {});
                const nextOwnersData = nextTransfer.ownersData || [];
                const mergedOwnersData = syncedOwnersData.map((owner, i) => {
                    const nextOwner = nextOwnersData[i] || {};
                    const hasData = Object.values(nextOwner).some(v => v !== "");
                    return hasData ? nextOwner : { ...owner };
                });

                const nextResidential = nextTransfer.ownerAddress?.residential || {};
                const hasResidentialData = Object.values(nextResidential).some(v => v !== "");
                const mergedResidential = hasResidentialData ? nextResidential : { ...fromTransfer.newOwnerAddress };

                const nextMailing = nextTransfer.ownerAddress?.mailing || {};
                const hasMailingData = Object.values(nextMailing).some(v => v !== "");
                const mergedMailing = hasMailingData ? nextMailing : { ...fromTransfer.newOwnerMailingAddress };

                return prevTransfers.map((t, i) =>
                    i === nextTransferIndex
                        ? {
                            ...nextTransfer,
                            ownerCount: mergedOwnersData.length || nextTransfer.ownerCount,
                            ownersData: mergedOwnersData.length > 0 ? mergedOwnersData : nextTransfer.ownersData,
                            ownerAddress: {
                                residential: mergedResidential,
                                mailing: mergedMailing,
                                isMailingDifferent:
                                    nextTransfer.ownerAddress?.isMailingDifferent ||
                                    fromTransfer.selectedRadio?.includes("if-mailing-address-is-different"),
                            },
                        }
                        : t
                );
            });
            return;
        }

        // fromTransferNumber === 1: sync Transfer 1 data to ALL other transfers (empty fields only)
        setMultipleTransfer((prevTransfers) => {
            const transfer1 = prevTransfers.find(t => t.transferNumber === 1);
            if (!transfer1) return prevTransfers;

            return prevTransfers.map(transfer => {
                if (transfer.transferNumber === 1) return transfer;

                // Merge vehicle info — only fill empty fields
                const mergedVehicleInfo = { ...transfer.vehicleInfoState };
                Object.entries(transfer1.vehicleInfoState || {}).forEach(([key, val]) => {
                    if (!mergedVehicleInfo[key]) mergedVehicleInfo[key] = val;
                });

                // Merge registered owner — only fill empty fields
                const mergedOwnersData = transfer1.ownersData.map((owner, i) => {
                    const existing = transfer.ownersData[i] || {};
                    const hasData = Object.values(existing).some(v => v !== "");
                    return hasData ? existing : { ...owner };
                });

                // Merge owner address — only fill if empty
                const nextResidential = transfer.ownerAddress?.residential || {};
                const hasResidentialData = Object.values(nextResidential).some(v => v !== "");
                const mergedResidential = hasResidentialData ? nextResidential : { ...transfer1.ownerAddress.residential };

                const nextMailing = transfer.ownerAddress?.mailing || {};
                const hasMailingData = Object.values(nextMailing).some(v => v !== "");
                const mergedMailing = hasMailingData ? nextMailing : { ...transfer1.ownerAddress.mailing };

                return {
                    ...transfer,
                    vehicleInfoState: mergedVehicleInfo,
                    ownerCount: transfer.ownersData?.length > 0 ? transfer.ownerCount : transfer1.ownerCount,
                    ownersData: mergedOwnersData,
                    ownerAddress: {
                        residential: mergedResidential,
                        mailing: mergedMailing,
                        isMailingDifferent: transfer.ownerAddress?.isMailingDifferent,
                    },
                };
            });
        });
    };

    // Sync when leaving a tab (switching to next tab)
    const prevActiveTabRef = useRef(activeTab);
    useEffect(() => {
        const prevTab = prevActiveTabRef.current;
        prevActiveTabRef.current = activeTab;

        if (prevTab === 1 && activeTab !== 1) {
            // Leaving Transfer 1 — sync to ALL transfers
            syncToNextTransfer(1);
        } else if (activeTab === prevTab + 1 && prevTab !== 1) {
            // Moving forward between non-1 tabs — sync owner chain only
            syncToNextTransfer(prevTab);
        }
    }, [activeTab]);



    // const syncToNextTransfer = (fromTransferNumber: number) => {
    //     setMultipleTransfer((prevTransfers) => {
    //         const fromTransfer = prevTransfers.find(
    //             (t) => t.transferNumber === fromTransferNumber
    //         );
    //         if (!fromTransfer) return prevTransfers;

    //         const nextTransferIndex = prevTransfers.findIndex(
    //             (t) => t.transferNumber === fromTransferNumber + 1
    //         );

    //         // 🚀 If next transfer doesn't exist, just stop (don’t add new)
    //         if (nextTransferIndex === -1) return prevTransfers;

    //         const nextTransfer = prevTransfers[nextTransferIndex];

    //         const updatedTransfer = {
    //             ...nextTransfer,
    //             ownerCount: fromTransfer.newOwnerCount,
    //             ownersData: Object.values(fromTransfer.newOwnerData || {}),
    //             ownerAddress: {
    //                 residential: { ...fromTransfer.newOwnerAddress },
    //                 mailing: { ...fromTransfer.newOwnerMailingAddress },
    //                 isMailingDifferent: fromTransfer.selectedRadio?.includes("if-mailing-address-is-different"),
    //             },
    //             vehicleInfoState: {
    //                 ...(nextTransfer.vehicleInfoState || {}),
    //                 ["Vehicle/Hull Identification Number"]:
    //                     fromTransfer.vehicleInfoState?.["Vehicle/Hull Identification Number"] ||
    //                     "",
    //                 ["Vehicle License Plate or Vessel CF Number"]:
    //                     fromTransfer.vehicleInfoState?.[
    //                     "Vehicle License Plate or Vessel CF Number"
    //                     ] || "",
    //                 ["Year of Vehicle"]:
    //                     fromTransfer.vehicleInfoState?.["Year of Vehicle"] || "",
    //                 ["Make of Vehicle OR Vessel Builder"]:
    //                     fromTransfer.vehicleInfoState?.[
    //                     "Make of Vehicle OR Vessel Builder"
    //                     ] || "",
    //             },
    //         };

    //         return prevTransfers.map((t, i) =>
    //             i === nextTransferIndex ? updatedTransfer : t
    //         );
    //     });
    // };

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         multipleTransfer.forEach((_, i) => {
    //             if (i + 1 < multipleTransfer.length) {
    //                 syncToNextTransfer(i + 1);
    //             }
    //         });
    //     }, 300);

    //     return () => clearTimeout(timeout);
    // }, [JSON.stringify(multipleTransfer)]);

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
    };
    const syncedTransactions = [
        "Transaction with Vehicle Title",
        "Is the Vehicle a Motorcycle",
        "Out of State Title"
    ];

    const handleTransactionChange = (label: string, checked: boolean) => {
        const current = getCurrentTransfer();

        const updatedSelections = checked
            ? [...current.transactionSelections, label]
            : current.transactionSelections.filter(item => item !== label);

        // 🚀 Update current transfer
        updateCurrentTransfer({
            transactionSelections: updatedSelections,
            ...(label === "Is the Vehicle a Motorcycle" && {
                typeOfVehicleSelection: checked ? "MOTORCYCLE" : "",
                vehicleInfoState: checked
                    ? current.vehicleInfoState
                    : Object.fromEntries(
                        Object.entries(current.vehicleInfoState)
                            .filter(([key]) => key !== "Motorcycle Engine Number")
                    ),
            }),
        });

        // 🧠 If this label is in the synced list, update ALL transfers
        if (syncedTransactions.includes(label)) {
            setMultipleTransfer(prevTransfers =>
                prevTransfers.map(transfer => {
                    const hasLabel = checked;
                    const updatedSelections = hasLabel
                        ? Array.from(new Set([...transfer.transactionSelections, label]))
                        : transfer.transactionSelections.filter(item => item !== label);

                    // Optional: Apply Motorcycle logic globally too
                    let updatedVehicleInfoState = transfer.vehicleInfoState;
                    let updatedTypeOfVehicleSelection = transfer.typeOfVehicleSelection;

                    if (label === "Is the Vehicle a Motorcycle") {
                        if (checked) {
                            updatedTypeOfVehicleSelection = "MOTORCYCLE";
                        } else {
                            updatedTypeOfVehicleSelection = "";
                            updatedVehicleInfoState = Object.fromEntries(
                                Object.entries(transfer.vehicleInfoState)
                                    .filter(([key]) => key !== "Motorcycle Engine Number")
                            );
                        }
                    }

                    return {
                        ...transfer,
                        transactionSelections: updatedSelections,
                        typeOfVehicleSelection: updatedTypeOfVehicleSelection,
                        vehicleInfoState: updatedVehicleInfoState,
                    };
                })
            );
        }
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
    const handleSalvageCertificateChange = (label: string, value: string) => {
        updateCurrentTransfer({
            salvageCertificateState: {
                ...currentTransfer.salvageCertificateState,
                [label]: value,
            },
        });
    };
    const handleCommercialChange = (label: string, value: any) => {
        updateCurrentTransfer({
            commercialInfo: {
                ...currentTransfer.commercialInfo,
                [label]: value,
            },
        });
    };
    const handleVehicleBodyChange = (label: string, value: any) => {
        updateCurrentTransfer({
            vehicleBodyState: {
                ...currentTransfer.vehicleBodyState,
                [label]: value,
            }
        });
    };
    const handleVehicleDeclarationEntryFieldChange = (
        index: number,
        label: string,
        value: string
    ) => {
        const updated = [...(currentTransfer.vehicleDeclarationEntryData || [])];
        if (!updated[index]) updated[index] = {};
        updated[index][label] = value;

        updateCurrentTransfer({
            vehicleDeclarationEntryData: updated,
        });
    };

    const handleTrimEntries = (trimmed: Record<string, string>[]) => {
        updateCurrentTransfer({
            vehicleDeclarationEntryData: trimmed,
        });
    };

    // When user types in Transfer 1, broadcast to all transfers (only empty fields)
    const handleVehicleFieldChange = (label: string, value: string | boolean) => {
        if (activeTab === 1) {
            setMultipleTransfer(prev =>
                prev.map(transfer => ({
                    ...transfer,
                    vehicleInfoState: {
                        ...transfer.vehicleInfoState,
                        // Only fill if empty in other transfers, always update current
                        [label]: transfer.transferNumber === 1
                            ? value
                            : (transfer.vehicleInfoState?.[label] ? transfer.vehicleInfoState[label] : value),
                    },
                }))
            );
        } else {
            updateCurrentTransfer({
                vehicleInfoState: {
                    ...getCurrentTransfer().vehicleInfoState,
                    [label]: value,
                },
            });
        }
    };


    // //===>  Handler for vehicle information fields
    // const handleVehicleFieldChange = (label: string, value: string | boolean) => {
    //     // const current = getCurrentTransfer();

    //     // Only update the current active transfer — no cross-transfer syncing
    //     updateCurrentTransfer({
    //         vehicleInfoState: {
    //             ...getCurrentTransfer().vehicleInfoState,
    //             [label]: value,
    //         },
    //     });


    //     // // Update current transfer first
    //     // updateCurrentTransfer({
    //     //     vehicleInfoState: {
    //     //         ...current.vehicleInfoState,
    //     //         [label]: value,
    //     //     },
    //     // });

    //     // Define fields that should sync across ALL transfers
    //     const syncAllFields = [
    //         "Vehicle/Hull Identification Number",
    //         "Vehicle License Plate or Vessel CF Number",
    //         "Year of Vehicle",
    //         "Make of Vehicle OR Vessel Builder",
    //     ];

    //     setMultipleTransfer((prev) =>
    //         prev.map((transfer, i) => {
    //             const isActive = transfer.transferNumber === activeTab;

    //             // Case 1️⃣: Sync to all transfers if label is in syncAllFields
    //             if (syncAllFields.includes(label)) {
    //                 return {
    //                     ...transfer,
    //                     vehicleInfoState: {
    //                         ...transfer.vehicleInfoState,
    //                         [label]: value,
    //                     },
    //                 };
    //             }

    //             // Case 2️⃣: Sync “Motorcycle Engine Number” only to next transfers
    //             if (
    //                 label === "Motorcycle Engine Number" &&
    //                 i > prev.findIndex((t) => t.transferNumber === activeTab)
    //             ) {
    //                 return {
    //                     ...transfer,
    //                     vehicleInfoState: {
    //                         ...transfer.vehicleInfoState,
    //                         [label]: value,
    //                     },
    //                 };
    //             }

    //             // Default: no change
    //             return transfer;
    //         })
    //     );
    // };

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
    const handleNewOwnerFieldChange = (index: number, field: string, value: string) => {
        setMultipleTransfer(prev =>
            prev.map(t =>
                t.transferNumber === activeTab
                    ? {
                        ...t,
                        newOwnerData: {
                            ...t.newOwnerData,
                            [index]: {
                                ...t.newOwnerData?.[index],
                                [field]: value,
                            },
                        },
                    }
                    : t
            )
        );


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
        const alreadySelected = current.selectedRadio.includes(value);
        if (value === "if-mailing-address-is-different") {
            updateCurrentTransfer({ newOwnerMailingAddress: {} });
        }
        let newSelection = alreadySelected
            ? current.selectedRadio.filter((v) => v !== value)
            : [...current.selectedRadio, value];

        if (isMutuallyExclusive && !alreadySelected) {
            const other = mutuallyExclusive.find((opt) => opt !== value);
            newSelection = newSelection.filter((opt) => opt !== other);
        }

        updateCurrentTransfer({
            selectedRadio: newSelection,
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

    // ===> Plate selection change
    const handlePlateChange = (label: string) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            platesSelectionState: {
                ...current.platesSelectionState,
                selectedPlate: label,
                veteranCode:
                    label === "Veterans' Organization"
                        ? current.platesSelectionState.veteranCode
                        : "",
                duplicatePlate:
                    label === "Duplicate Decal"
                        ? current.platesSelectionState.duplicatePlate
                        : "",
            },
        });
    };

    // ===> Plate input field change
    const handleInputChange = (
        field: "veteranCode" | "duplicatePlate",
        value: string
    ) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            platesSelectionState: {
                ...current.platesSelectionState,
                [field]: value,
            },
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

    // ===>  Update power of attorney data when owners change
    useEffect(() => {
        const current = getCurrentTransfer();
        const owner = current?.ownersData?.[0];
        const newOwner = current?.newOwnerData?.[0];

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
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY_form);
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

        localStorage.setItem(LOCAL_STORAGE_KEY_form, JSON.stringify({ multipleTransfer }));
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
    const isCommercialVehicle = currentTransfer.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)");

    const dropdownOptions = numberOfTransfers
        ? Array.from({ length: numberOfTransfers }, (_, i) => i + 1).map((num) => ({
            label: num.toString(),
            value: num.toString(),
            name: num.toString(),
            abbreviation: num.toString(),
        }))
        : [];
    // Add setPersonalizePlatesState to update personalizePlatesState in the current transfer
    const setPersonalizePlatesState = (value: string) => {
        updateCurrentTransfer({ personalizePlatesState: value });
    };
    const setSelectConfigState = (value: string) => {
        updateCurrentTransfer({ selectConfigState: value });
    };
    const setPlatePurchaseState = (updater: any) => {
        const current = getCurrentTransfer();

        // If updater is a function, call it with current state
        const newValue =
            typeof updater === "function"
                ? updater(current.platePurchaseState)
                : updater;

        updateCurrentTransfer({ platePurchaseState: newValue });
    };
    const handleCertificateOfLicensePlateDispositionChange = (
        label: string,
        value: string | boolean
    ) => {
        const current = getCurrentTransfer();
        updateCurrentTransfer({
            certificateOfLicensePlateDispositionState: {
                ...current.certificateOfLicensePlateDispositionState,
                [label]: String(value)
            }
        });
    };
    const setDpState = (value: any) => {
        updateCurrentTransfer({ dpState: value });
    };
    const setDpVehicleInfoState = (updater: any) => {
        const current = getCurrentTransfer();

        const newValue =
            typeof updater === "function"
                ? updater(current.dpVehicleInfoState)
                : updater;

        updateCurrentTransfer({ dpVehicleInfoState: newValue });
    };

    return (
        <div>
            {/* --Number of Transfers-- y div uthega overflow ki waja */}
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold"> {title}</h2>
            </div>

            <div className="flex items-center gap-4 mb-4">
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
                {transactionBlock && activeTab === 1 && (
                    <TransactionDetails
                        title="Transaction Details"
                        block={{
                            ...transactionBlock,
                            fields: transactionBlock.fields?.filter(field => {
                                const restrictedLabels = [
                                    "Smog Exemption",
                                    "Vehicle is a Gift",
                                    "Family Transfer",
                                    "There is a Current Lienholder"
                                ];
                                return activeTab === 1
                                    ? true
                                    : !restrictedLabels.includes(field.label);
                            }),
                        }}
                        senerio={senerio}
                        selectedItems={currentTransfer.transactionSelections}
                        onChange={handleTransactionChange}
                    />
                )}

                {typeOfVehicleBlock && isOutofStateTitle && (transferCount == activeTab) && (
                    <TypeOfVehicle
                        title="Type of Vehicle"
                        block={typeOfVehicleBlock}
                        selectedItems={currentTransfer.typeOfVehicleSelection}
                        onChange={handleTypeOfVehicleChange}
                    />
                )}
                {SalvageCertificateBlock && (activeTab === transferCount) && (
                    <SalvageCertificate
                        key={`salvage-cert-${activeTab}`}
                        title={SalvageCertificateBlock.blockName}
                        block={SalvageCertificateBlock}
                        values={currentTransfer.salvageCertificateState}
                        onFieldChange={handleSalvageCertificateChange}
                    />
                )}
                {forCommercialVehicleOnlyBlock && (
                    <CommercialVehicleInfo
                        title={forCommercialVehicleOnlyBlock.blockName}
                        block={{}}
                        isCommercialVehicle={isCommercialVehicle} // optional
                        values={currentTransfer.commercialInfo}
                        onChange={handleCommercialChange}
                    />
                )}
                {VehicleDeclarationEntryBlock && (
                    <VehicleDeclarationEntry
                        title={VehicleDeclarationEntryBlock.blockName}
                        block={VehicleDeclarationEntryBlock}
                        values={currentTransfer.vehicleDeclarationEntryData}
                        onFieldChange={handleVehicleDeclarationEntryFieldChange}
                        onTrimEntries={handleTrimEntries}
                    />
                )}
                {platesSelectionBlock && (transferCount == activeTab) && (
                    <PlatesSelection
                        block={platesSelectionBlock}
                        plateInfo={currentTransfer.platesSelectionState}
                        onPlateChange={handlePlateChange}
                        onInputChange={handleInputChange}
                        personalizePlatesState={currentTransfer.personalizePlatesState}
                        setPersonalizePlatesState={setPersonalizePlatesState}
                    />
                )}
                {selectConfigurationBlock && (currentTransfer.personalizePlatesState === "Order" || currentTransfer.personalizePlatesState === "Exchange") && (transferCount == activeTab) && (
                    <SelectConfiguration
                        block={selectConfigurationBlock}
                        value={currentTransfer.selectConfigState}
                        onChange={setSelectConfigState}
                    />
                )}
                {platePurchaseBlock && (transferCount == activeTab) && (
                    <PlatePurchaserAndOwner
                        block={platePurchaseBlock}
                        values={currentTransfer.platePurchaseState}
                        onChange={setPlatePurchaseState}
                    />
                )}
                {CertificateOfLicensePlateDispositionBlock && (
                    <CertificateOfLicensePlateDisposition
                        key={`cert-license-plate-${activeTab}`}
                        title={CertificateOfLicensePlateDispositionBlock.blockName}
                        block={{
                            ...CertificateOfLicensePlateDispositionBlock,
                            reference: CertificateOfLicensePlateDispositionBlock.reference || "CertificateReference",
                        }}
                        values={currentTransfer.certificateOfLicensePlateDispositionState}
                        onChange={handleCertificateOfLicensePlateDispositionChange}
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
                                    value: currentTransfer?.vehicleInfoState?.[field.label] ?? (field.type === "checkbox" ? false : ""),
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
                        block={{
                            ...registeredOwnerBlock,
                            fields: registeredOwnerBlock.fields
                                ?.filter(field => !(!(transferCount == activeTab) && field.label === "Date of Sale"))
                                .map(field => ({
                                    ...field,
                                    value:
                                        currentTransfer?.ownersData?.[0]?.[field.label] ??
                                        (field.type === "checkbox" ? false : ""),
                                })),
                        }}
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
                        senerio={senerio}
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
                        selectedRadio={currentTransfer.selectedRadio}
                        onToggleOption={handleToggleOption}
                        onAddressChange={handleNewOwnerAddressChange}
                    />
                )}

                {dateInformationBlock && dateInformationBlock.reference && isOutofStateTitle && (transferCount == activeTab) && (
                    <DateInformation
                        title="DATE INFORMATION"
                        block={{ ...dateInformationBlock, reference: dateInformationBlock.reference as string }}
                        dateValues={currentTransfer.dateValues}
                        onDateChange={handleDateChange}
                    />
                )}
                {disablePersonTypeBlock && (transferCount == activeTab) && (
                    <DpPlacardSection
                        title={disablePersonTypeBlock.blockName}
                        values={currentTransfer.dpState}
                        onChange={setDpState}
                    />
                )}
                {disablePersonVehicleInfoBlock && (
                    <DisablePersonVehicleInfo
                        title={disablePersonVehicleInfoBlock.blockName}
                        values={currentTransfer.dpVehicleInfoState}
                        onChange={setDpVehicleInfoState}
                        fields={disablePersonVehicleInfoBlock.fields}
                    />
                )}
                {vehicleStatusBlock && isOutofStateTitle && (transferCount == activeTab) && (
                    <VehicleStatusInformation
                        title="Vehicle Status Information"
                        block={vehicleStatusBlock}
                        onFieldChange={handleVehicleStatusInfoFieldChange}
                        values={currentTransfer.vehicleStatusInfoData}
                    />
                )}

                {vehicleAcquisitionBlock && isOutofStateTitle && (transferCount == activeTab) && (
                    <VehicleAcquisitionDetails
                        title={vehicleAcquisitionBlock.blockName}
                        block={vehicleAcquisitionBlock}
                        values={currentTransfer.vehiclePurchaseInfo}
                        onFieldChange={handleVehiclePurchaseInfoChange}
                    />
                )}

                {OutOfStateBlock && isOutofStateTitle && (transferCount == activeTab) && (
                    <OutOfStateVehicleSection
                        values={currentTransfer.outOfStateVehicle}
                        onFieldChange={handleOutOfStateVehcileFieldChange}
                        onPlateSelect={handleOutOfStateVehcilePlateSelect}
                    />
                )}
                {statementForVehicleBodyChangeBlock && (
                    <VehicleBodyChange
                        title={statementForVehicleBodyChangeBlock.blockName}
                        values={currentTransfer.vehicleBodyState}
                        onChange={handleVehicleBodyChange}
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

                {itemRequestedWasBlock && transferCount === activeTab && (
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

                {LicensePlateBlock && transferCount === activeTab && (
                    <LicensePlateMissingBlock
                        title={LicensePlateBlock.blockName}
                        block={LicensePlateBlock}
                        selectedOption={currentTransfer.licensePlateState}
                        handleSelectedOptionOnChange={handleLicensePlateChange}
                    />
                )}

                {LienReleaseBlock && activeTab === 1 && (
                    <LeinRealease
                        title="Lien Release"
                        block={LienReleaseBlock}
                        lienReleaseState={currentTransfer.lienReleaseState}
                        onLienReleaseChange={handleLienAddressChange}
                        onToggleMailingDifferent={handleToggleLienReleaseMailingDifferent}
                    />
                )}

                {plannedNonOperationCertificateBlock && transferCount === activeTab && (
                    <PlannedNonOperation
                        title="Planned Non-Operation Certificate"
                        vehicles={currentTransfer.plannedNonOperationState}
                        onChange={handlePlannedNonOperationChange}
                        onAdd={handlePlannedNonOperationAdd}
                        onRemove={handlePlannedNonOperationRemove}
                        fields={plannedNonOperationCertificateBlock.fields}
                    />
                )}

                {newLienHolderBlock && transferCount === activeTab && (
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
                        isEditAndId ? await handleOnUpdate(user) : await handleOnSave(user);
                        setIsLoading(false);
                    }}
                    //onPrint={() =>  console.log('Print clicked in MultipleTransfer')}
                    onPrint={async () => {
                        setIsLoading(true);
                        await headHandlerForPDf("Multiple Transfer", confirm);
                        setIsLoading(false);
                    }}
                    onInvoice={() => console.log('Generate Invoice clicked')}
                    onClear={() => {
                        if (isEditAndId) {
                            localStorage.removeItem(LOCAL_STORAGE_KEY_form);
                            localStorage.removeItem(LOCAL_STORAGE_KEY_senerio);
                            // localStorage.removeItem("senerio");
                            localStorage.setItem("isEditAndId", "");
                            window.location.reload();
                        } else {
                            localStorage.removeItem(LOCAL_STORAGE_KEY_form);
                            localStorage.removeItem(LOCAL_STORAGE_KEY_senerio);
                            localStorage.setItem("isEdit", "");
                            window.location.reload();

                        }
                    }}
                    isEdit={isEditAndId}
                />
            </div>
        </div>
    );
};

export default MultipleTransfer;
