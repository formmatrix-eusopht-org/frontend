import {
    PDFDocument,
    PDFTextField,
    PDFCheckBox,
    PDFField,
    rgb,
    StandardFonts
} from 'pdf-lib';
import toast from 'react-hot-toast';
import { seneriosDetails } from '../Data/seneriosDetails';

type OwnerData = {
    [key: string]: string | undefined;
};

type AddressData = {
    residential?: { [key: string]: string | undefined };
    mailing?: { [key: string]: string | undefined };
    isMailingDifferent?: boolean;
    [key: string]: string | { [key: string]: string | undefined } | boolean | undefined;
};

type PlannedNonOperationState = {
    plate?: string;
    vin?: string;
    make?: string;
    equipment?: string;
    fromMonth?: string;
};

type LegalOwnerAddress = {
    [key: string]: string | undefined;
};

type LegalOwnerOfRecordData = {
    residential?: LegalOwnerAddress;
    mailing?: LegalOwnerAddress;
    showMailingAddress?: boolean;
};

type LienReleaseState = {
    companyAddress?: { [key: string]: string | undefined };
};

type NewLienholder = {
    address?: { [key: string]: string | undefined };
    mailingAddress?: { [key: string]: string | undefined };
    isMailingDifferent?: boolean;
};

type StatementForSomgExemptionData = {
    [key: string]: string | boolean | undefined;
    diesel?: boolean;
    electricity?: boolean;
    Other?: string;
};

type VehiclePurchaseInfo = {
    [key: string]: string | undefined;
};

type OutOfStateVehicle = {
    salesTaxPaid?: string;
    salesTaxPaidAmount?: string;
    outOfStatePlates?: { value?: string };
};

type DateValues = {
    [key: string]: { Month?: string; Day?: string; Year?: string };
};

type SalvageCertificateState = {
    'State of last Registeration'?: string;
    'Date of Registeration Expires'?: string;
    'Cost/value'?: string;
    'Claim number'?: string;
    'Date wrecked'?: string;
    'Date stolen'?: string;
    'Date recovered'?: string;
    'Agent Name'?: string;
};

type FormData = {
    platesSelectionState?: any;
    personalizePlatesState?: string;
    replacementState?: any;
    platePurchaseState?: any;
    specialInterestState?: any;
    personalOrBusinessInformationData?: any;
    previousResidenceOrBusinessAddressData?: any;
    newOrCorrectResidenceOrBusinessAddressData?: any;
    selectConfigState?: any;
    vehiclesOwnedByYouData?: any;
    leasaedCompanyName?: string;
    nameChangeData?: any;
    vehicleBodyState?: {
        ["Axles Checked"]?: boolean;
        ["Body Type Checked"]?: boolean;
        ["Change Cost"]?: string;
        ["Change Date"]?: string;
        ["Market Value"]?: string;
        ["Motive Power Checked"]?: boolean;
        ["Statement of Facts"]?: string;
        ["Unladen Weight Checked"]?: boolean;
        ["Unladen Weight Reason"]?: boolean;
        ["Motive Power From"]: string;
        ["Motive Power To"]: string;
        ["Body Type From"]: string;
        ["Body Type To"]: string;
        ["Axles From"]: string;
        ["Axles To"]: string;
    };
    ownersData?: OwnerData[];
    newOwnerData?: OwnerData[];
    vehicleInfoState?: { [key: string]: string | undefined };
    dpVehicleInfoState?: { plate?: string; vin?: string; make?: string; year?: string };
    ownerAddress?: AddressData;
    licensePlateState?: string;
    newOwnerMailingAddress?: { [key: string]: string | undefined };
    newOwnerAddress?: { [key: string]: string | undefined };
    newOwnerLesseeAddress?: { [key: string]: string | undefined };
    newOwnerKeptAddress?: { [key: string]: string | undefined };
    powerOfAttorneyData?: { appointer?: string; appointee?: string };
    transactionSelections?: string[];
    newOwnerCount?: number;
    ownerCount?: number;
    ownersCount?: number;
    itemRequestedWasState?: {
        checked?: string[];
        plateCount?: string[];
        otherExplain?: string;
    };
    LegalOwnerOfRecordData?: LegalOwnerOfRecordData;
    lienReleaseState?: LienReleaseState;
    newLienholder?: NewLienholder;
    selectedRadio?: string[];
    statementForSomgExemptionData?: StatementForSomgExemptionData;
    typeOfVehicleSelection?: string;
    vehicleStatusInfoData?: { [key: string]: string | boolean | undefined };
    vehiclePurchaseInfo?: VehiclePurchaseInfo;
    outOfStateVehicle?: OutOfStateVehicle;
    plannedNonOperationState?: PlannedNonOperationState[];
    dateValues?: DateValues;
    missingReason?: string;
    newOwnershipTypes?: string[];
    vehicleStorageLocation?: {
        ["FROM: MONTH, DAY, YEAR"]?: string;
        ["TO: MONTH, DAY, YEAR"]?: string;
        Address?: string;
        City?: string;
        State?: string;
        ["ZIP Code"]?: string;
    };
    commercialInfo?: { [key: string]: string | boolean | undefined }
    vehicleDeclarationEntryData?: {
        [index: number]: {
            "Vehicle License Number"?: string;
            "Vehicle Identification Number"?: string;
            "Vehicle Make"?: string;
            "Vehicle Code Type"?: string;
            "Weight Range"?: string;
            "Date Operated"?: string;
        };
    };
    salvageCertificateState?: SalvageCertificateState;
    certificateOfLicensePlateDispositionState?: {
        licensePlatesAssignedTo?: string; // e.g. "ARE BEING SURRENDERED"
        platesSurrendered?: "ONE" | "TWO" | string;
        occupationalLicenseNumber?: string;
    };
    dpState?: {
        selectedPlacard?: "permanent" | "temporary" | "travel" | "plates" | "reassign";
        issuedPreviously?: "yes" | "no";
        commercialWeightFeeExemption: "yes" | "no";
        plate?: string;
    };
    optionsForValidation?: string[];
};

function formatSingleOwner(owner?: OwnerData): string {
    if (!owner) return '';

    const last = owner['Last Name'] || '';
    const first = owner['First Name'] || '';
    const middle = owner['Middle Name'] || '';

    const fullName = [first, middle, last].filter(Boolean).join(' ');
    return fullName;
}

function formatSingleOwnerWithLastNameFirst(owner?: OwnerData): string {
    if (!owner) return '';

    const last = owner['Last Name'] || '';
    const first = owner['First Name'] || '';
    const middle = owner['Middle Name'] || '';

    const fullName = [last, first, middle].filter(Boolean).join(', ');
    return fullName;
}
function extractDateParts(dateStr?: string): { month: string, day: string, year: string } {
    if (!dateStr) return { month: '', day: '', year: '' };

    // Replace any non-digit separator with "/"
    const normalized = dateStr.replace(/[\s\-\.]+/g, '/');
    const [month = '', day = '', year = ''] = normalized.split('/');

    return { month, day, year };
}
const getCurrentDate = () => {
    const today = new Date();

    let mm: string = String(today.getMonth() + 1).padStart(2, "0");
    let dd: string = String(today.getDate()).padStart(2, "0");
    const yyyy = today.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
};

const buildFieldMapping = (formData: FormData = {}, senerio: string): { [key: string]: any } => {
    const owner1 = formatSingleOwnerWithLastNameFirst(formData.ownersData?.[0]);
    const muzowner = formatSingleOwner(formData.ownersData?.[0]);
    // const owner1 = formatSingleOwner(formData.ownersData?.[0]);
    const owner2 = formatSingleOwner(formData.ownersData?.[1]);
    const owner3 = formatSingleOwner(formData.ownersData?.[2]);

    const newOwner1 = formatSingleOwner(formData.newOwnerData?.[0]);
    const newOwner1forDisablepersonPlac = formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0]);
    const newOwner2 = formatSingleOwner(formData.newOwnerData?.[1]);
    const newOwner3 = formatSingleOwner(formData.newOwnerData?.[2]);
    const odoMeter = formData.vehicleInfoState?.['Mileage of Vehicle'] || '';
    const reversedOdoMeter = odoMeter?.split('').reverse().join('');
    const joinNames = (...names: (string | undefined)[]) =>
        names.filter(name => name && name.trim()).join(', ');
    const rawDate = formData.ownersData?.[0]?.['Date of Sale'] || '';
    const { month, day, year } = extractDateParts(rawDate);
    const isTitleAvailable = formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title")
    // console.log(formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'], "form");
    const newOwnerAddressCombine = `${formData.newOwnerMailingAddress?.Street} ${formData.newOwnerMailingAddress?.["APT./SPACE/STE.#"]}`
    const newLienholderAddressCombine = `${formData.newLienholder?.["address"]?.["Street"]} ${formData.newLienholder?.["address"]?.["APT./SPACE/STE.#"]}`

    const getWeightCode = (range: string) => {
        const mapping: any = {
            "10,001-15,000": "A",
            "15,001-20,000": "B",
            "20,001-26,000": "C",
            "26,001-30,000": "D",
            "30,001-35,000": "E",
            "35,001-40,000": "F",
            "40,001-45,000": "G",
            "45,001-50,000": "H",
            "50,001-54,999": "I",
            "55,000-60,000": "J",
            "60,001-65,000": "K",
            "65,001-70,000": "L",
            "70,001-75,000": "M",
            "75,001-80,000": "N",
        };
        return mapping[range] || "";
    };

    ////--reg 262 fields probably
    return {
        "Explain odometer discrepancy": formData.vehicleInfoState?.['Explain Odometer Discrepancy'] || '',
        'IDENTIFICATION NUMBER': formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        "VIN": formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        'YEAR MODEL': formData.vehicleInfoState?.['Year of Vehicle'] || "",
        'MAKE': formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || "",
        "Make": formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || "",
        'LICENSE PLATE/CF NO': formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        "Vehicle license plate": formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        'MOTORCYCLE ENGINE NUMBER': formData.vehicleInfoState?.['Motorcycle Engine Number'] || '',
        "DP number": '',
        "Engine number": formData.vehicleInfoState?.['Motorcycle Engine Number'] || '',
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        "True full name": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0]) : '') : ((formData.ownerCount ?? 0) > 0 ? owner1 : ''),
        "Physical address 1": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? (formData.newOwnerAddress?.Street || '') : (formData.ownerAddress?.residential?.Street || ''),
        "City": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? (formData.newOwnerAddress?.City || '') : (formData.ownerAddress?.residential?.City || ''),
        "zip code": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? (formData.newOwnerAddress?.["ZIP Code"] || '') : (formData.ownerAddress?.residential?.["ZIP Code"] || ''),
        "DL1": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[0] || '' : '') : (formData.ownersData?.[0]?.['Driver License Number']?.split('')[0] || ''),
        "DL2": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[1] || '' : '') : (formData.ownersData?.[0]?.['Driver License Number']?.split('')[1] || ''),
        "DL3": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[2] || '' : '') : (formData.ownersData?.[0]?.['Driver License Number']?.split('')[2] || ''),
        "DL4": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[3] || '' : '') : (formData.ownersData?.[0]?.['Driver License Number']?.split('')[3] || ''),
        "DL5": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[4] || '' : '') : (formData.ownersData?.[0]?.['Driver License Number']?.split('')[4] || ''),
        "DL6": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[5] || '' : '') : (formData.ownersData?.[0]?.['Driver License Number']?.split('')[5] || ''),
        "DL7": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[6] || '' : '') : (formData.ownersData?.[0]?.['Driver License Number']?.split('')[6] || ''),
        "DL8": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[7] || '' : '') : (formData.ownersData?.[0]?.['Driver License Number']?.split('')[7] || ''),

        "telephone number": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '' : '') : (formData.ownersData?.[0]?.['Phone Number']?.slice(5) || ''),
        "area code": (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) && (senerio?.includes("Duplicate Stickers") || senerio?.includes("Duplicate Plates & Stickers") || senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '' : '') : (formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || ''),
        // /
        //         "telephone number": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        //         "area code": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',


        "Co owner": (formData.ownerCount ?? 1) > 1 ? owner2 : '',
        "certification": (formData.ownerCount ?? 0) > 0 ? muzowner : '',
        "title": formData.ownersData?.[0]?.['Title if Signing for a Company'] || '',
        "2DL1": formData.ownersData?.[1]?.['Driver License Number']?.split('')[0] || '',
        "2DL2": formData.ownersData?.[1]?.['Driver License Number']?.split('')[1] || '',
        "2DL3": formData.ownersData?.[1]?.['Driver License Number']?.split('')[2] || '',
        "2DL4": formData.ownersData?.[1]?.['Driver License Number']?.split('')[3] || '',
        "2DL5": formData.ownersData?.[1]?.['Driver License Number']?.split('')[4] || '',
        "2DL6": formData.ownersData?.[1]?.['Driver License Number']?.split('')[5] || '',
        "2DL7": formData.ownersData?.[1]?.['Driver License Number']?.split('')[6] || '',
        "2DL8": formData.ownersData?.[1]?.['Driver License Number']?.split('')[7] || '',
        "Physical address": formData.newOwnerAddress?.Street || '',
        "County 1": formData.ownerAddress?.residential?.County || '',
        "County": formData.newOwnerAddress?.County || '',
        "One license": senerio?.includes("Duplicate Plates & Stickers") ? formData.licensePlateState === "One license plate missing" ? true : false : false,
        "Two plates": senerio?.includes("Duplicate Plates & Stickers") ? formData.licensePlateState === "Two license plates are missing" ? true : false : false,
        "Apt #": formData.ownerAddress?.residential?.["APT./SPACE/STE.#"] || '',
        'I/We': joinNames(owner1, owner2, owner3),
        'to': joinNames(
            newOwner1,
            (formData.newOwnerCount ?? 0) > 1 ? newOwner2 : '',
            (formData.newOwnerCount ?? 0) > 2 ? newOwner3 : ''
        ),
        "Reg Card": senerio?.includes("Duplicate Registration") ? true : false,
        "PRINTED NAME": formData.newOwnerData?.[0]?.['Last Name'] || '',
        "FIRST NAME": formData.newOwnerData?.[0]?.['First Name'] || '',
        "MIDDLE NAME": formData.newOwnerData?.[0]?.['Middle Name'] || '',
        "App sign area code": formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "App sign phone no": formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '',
        "Signature date": getCurrentDate() || '',
        'sellingmonth': month || '',
        'sellingdate': day || '',
        'sellingyear1': year[0] || '',
        'sellingyear2': year[1] || '',
        'sellingyear3': year[2] || '',
        'sellingyear4': year[3] || '',
        'giftvalue': formData.transactionSelections?.includes('Vehicle is a Gift') ? formData.newOwnerData?.[0]?.['Gift Value']?.replace(/[^0-9.]/g, '') || '' : '',
        'sellingprice': formData.transactionSelections?.includes('Vehicle is a Gift') ? '' : formData.newOwnerData?.[0]?.['Purchase Price/Value']?.replace(/[^0-9.]/g, '') || '',
        'relation': formData.transactionSelections?.includes('Vehicle is a Gift') ? formData.newOwnerData?.[0]?.['Relationship with Gifter'] || '' : '',
        "odometer1": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[5] || "",
        "odometer2": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[4] || "",
        "odometer3": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[3] || "",
        "odometer4": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[2] || "",
        "odometer5": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[1] || "",
        "odometer6": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[0] || "",
        // "odometer7": formData.vehicleInfoState?.['Mileage of Vehicle']?.split('')[6] || "",
        "notactualmileage": formData.vehicleInfoState?.["NOT Actual Mileage"],
        "mileageexceeds": formData.vehicleInfoState?.["Mileage Exceeds Mechanical Limit"],
        "PRINT BUYER'S NAME": (formData.newOwnerCount ?? 0) > 0 ? newOwner1 : '',
        "6 Purchase Price/Market Value": month,
        "Acquired Yr": year || '',
        "Date Purchased": day,
        'Purchase price': formData.transactionSelections?.includes("Vehicle is a Gift") ? formData.newOwnerData?.[0]?.['Gift Value']?.replace(/[^0-9.]/g, '') || '' : formData.newOwnerData?.[0]?.['Purchase Price/Value']?.replace(/[^0-9.]/g, '') || "",
        'SIGNATUREx': "",
        'DL/ID OR DEALER/DISM #': formData.newOwnerData?.[0]?.['Driver License Number'] || '',
        "PRINT BUYER'S NAME_1": (formData.newOwnerCount ?? 0) > 1 ? newOwner2 : '',
        "SIGNATUREx_1": "",
        "DATE": rawDate,
        "DATE_1": (formData.newOwnerCount ?? 0) > 1 ? rawDate : '',
        "DL/ID OR DEALER/DISM #_1": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number'] || '' : '',
        "PRINT BUYER'S NAME_2": (formData.newOwnerCount ?? 0) > 2 ? newOwner3 : '',
        'SIGNATUREx_2': "",
        "DATE_2": (formData.newOwnerCount ?? 0) > 2 ? rawDate : '',
        'DL/ID OR DEALER/DISM #_2': (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number'] || '' : '',
        'DAYTIME TELEPHONE NO': formData.newOwnerData?.[0]?.['Phone Number'] || '',
        "PRINTSELLER'S NAME": owner1,
        'SIGNATUREx_3': "",
        "DATE_3": rawDate,
        'DL/ID OR DEALER/DISM #_3': formData.ownersData?.[0]?.['Driver License Number'] || '',
        "PRINT SELLER'S NAME": owner2,
        'SIGNATUREx_4': "",
        "DATE_4": (formData.ownerCount ?? 0) > 1 ? rawDate : '',
        'DL/ID OR DEALER/DISM #_4': formData.ownersData?.[1]?.['Driver License Number'] || '',
        "PRINT SELLER'S NAME_1": owner3,
        'SIGNATUREx_5': "",
        "DATE_5": (formData.ownerCount ?? 0) > 2 ? rawDate : '',
        "DATE_6": (formData.ownerCount ?? 0) > 0 ? rawDate : '',
        "DATE_7": (formData.ownerCount ?? 0) > 1 ? rawDate : '',
        'DL/ID OR DEALER/DISM #_5': formData.ownersData?.[2]?.['Driver License Number'] || '',
        'DAYTIME TELEPHONE NO_1': formData.ownersData?.[0]?.['Phone Number'] || '',
        'I/We_1': formData.powerOfAttorneyData?.appointer || '',
        'appoint': formData.powerOfAttorneyData?.appointee || '',
        'CheckBox': "CheckBox",
        'CheckBox_1': "CheckBox",
        'CheckBox_2': "CheckBox",
        'text_60czib': formData.newOwnerMailingAddress?.Street ? `${formData.newOwnerMailingAddress?.Street || ''}   ${formData.newOwnerMailingAddress?.["APT./SPACE/STE.#"] || ''}` : `${formData.newOwnerAddress?.Street || ''}   ${formData.newOwnerAddress?.["APT./SPACE/STE.#"] || ''}   `,
        'text_61pxrx': formData.newOwnerMailingAddress?.City ? formData.newOwnerMailingAddress?.City || '' : formData.newOwnerAddress?.City || '',
        'text_62cqaf': formData.newOwnerMailingAddress?.State ? formData.newOwnerMailingAddress?.State || '' : formData.newOwnerAddress?.State || '',
        'text_63psgg': formData.newOwnerMailingAddress?.["ZIP Code"] ? formData.newOwnerMailingAddress?.["ZIP Code"] || '' : formData.newOwnerAddress?.["ZIP Code"] || '',
        'text_64xthv': formData.ownerAddress?.isMailingDifferent === true ? formData.ownerAddress?.mailing?.["ZIP Code"] || '' : formData.ownerAddress?.residential?.["ZIP Code"] || '',
        'text_65bzof': formData.ownerAddress?.isMailingDifferent === true ? formData.ownerAddress?.mailing?.["State"] || '' : formData.ownerAddress?.residential?.["State"] || '',
        'text_66evl': formData.ownerAddress?.isMailingDifferent === true ? formData.ownerAddress?.mailing?.City || '' : formData.ownerAddress?.residential?.City || '',
        'text_67vkky': formData.ownerAddress?.isMailingDifferent === true ? `${formData.ownerAddress?.mailing?.["Street"] || ''}   ${formData.ownerAddress?.mailing?.["APT./SPACE/STE.#"] || ''}` : `${formData.ownerAddress?.residential?.["Street"] || ''}   ${formData.ownerAddress?.residential?.["APT./SPACE/STE.#"] || ''}`,
        'License Plate/CF Number1': formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        'Vehicle/Vessel ID/Number1': formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        'Year/Make': `${formData.vehicleInfoState?.['Year of Vehicle'] || ""} ${formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || ""}`,
        '1 True Full Name, Last': formatSingleOwnerWithLastNameFirst(formData.ownersData?.[0]),
        '1 DL/ID Number-1.0': formData.ownersData?.[0]?.['Driver License Number']?.split('')[0] || '',
        '1 DL/ID Number-1.1': formData.ownersData?.[0]?.['Driver License Number']?.split('')[1] || '',
        '1 DL/ID Number-1.2': formData.ownersData?.[0]?.['Driver License Number']?.split('')[2] || '',
        '1 DL/ID Number-1.3': formData.ownersData?.[0]?.['Driver License Number']?.split('')[3] || '',
        '1 DL/ID Number-1.4': formData.ownersData?.[0]?.['Driver License Number']?.split('')[4] || '',
        '1 DL/ID Number-1.5': formData.ownersData?.[0]?.['Driver License Number']?.split('')[5] || '',
        '1 DL/ID Number-1.6': formData.ownersData?.[0]?.['Driver License Number']?.split('')[6] || '',
        '1 DL/ID Number-1.7': formData.ownersData?.[0]?.['Driver License Number']?.split('')[7] || '',
        'state.1': formData.ownersData?.[0]?.['State'] || '',
        "state.0": formData.ownersData?.[1]?.['State'] || '',
        "1 True Full Name, Last-2": formatSingleOwnerWithLastNameFirst(formData.ownersData?.[1]),
        "1 DL/ID Number-2.0": formData.ownersData?.[1]?.['Driver License Number']?.[0] || '',
        "1 DL/ID Number-2.1": formData.ownersData?.[1]?.['Driver License Number']?.[1] || '',
        "1 DL/ID Number-2.2": formData.ownersData?.[1]?.['Driver License Number']?.[2] || '',
        "1 DL/ID Number-2.3": formData.ownersData?.[1]?.['Driver License Number']?.[3] || '',
        "1 DL/ID Number-2.4": formData.ownersData?.[1]?.['Driver License Number']?.[4] || '',
        "1 DL/ID Number-2.5": formData.ownersData?.[1]?.['Driver License Number']?.[5] || '',
        "1 DL/ID Number-2.6": formData.ownersData?.[1]?.['Driver License Number']?.[6] || '',
        "1 DL/ID Number-2.7.0": formData.ownersData?.[1]?.['Driver License Number']?.[7] || '',
        "1 Residence or Business Address.0": formData.ownerAddress?.residential?.["Street"] || '',
        "1 Apt/Space Number-1": formData.ownerAddress?.residential?.["APT./SPACE/STE.#"] || '',
        "1 City-1": formData.ownerAddress?.residential?.["City"] || '',
        "1 States1": formData.ownerAddress?.residential?.["State"] || '',
        "state": formData.ownerAddress?.residential?.["State"] || '',
        "1 Zip Code-1": formData.ownerAddress?.residential?.["ZIP Code"] || '',
        "County of residence": formData.ownerAddress?.residential?.["County"] || '',
        "1 Mailing Address": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["Street"] || '',
        "Mailing address": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["Street"] || '',
        "1 Apt/Space Number-2": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["APT./SPACE/STE.#"] || '',
        "Apt 2": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["APT./SPACE/STE.#"] || '',
        "1 City-2": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["City"] || '',
        "City2": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["City"] || '',
        "1 States2": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["State"] || '',
        "state2": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["State"] || '',
        "1 Zip Code-2.0": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["ZIP Code"] || '',
        "zip code2": formData.ownerAddress?.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["ZIP Code"] || '',
        "Lost": formData.itemRequestedWasState?.checked?.includes("LOST"),
        "Stolen": formData.itemRequestedWasState?.checked?.includes("STOLEN"),
        "destroyed": formData.itemRequestedWasState?.checked?.includes("DESTROYED/MUTILATED"),
        "Not Received DMV": formData.itemRequestedWasState?.checked?.includes("NOT RECEIVED FROM DMV"),
        "Not received prior owner": formData.itemRequestedWasState?.checked?.includes("NOT RECEIVED FROM PRIOR OWNER"),
        "Surrendered": formData.itemRequestedWasState?.checked?.includes("SURRENDERED"),
        "one": formData.itemRequestedWasState?.checked?.includes("SURRENDERED") ? formData.itemRequestedWasState?.plateCount?.[0] === "ONE" : false,
        "Two": formData.itemRequestedWasState?.checked?.includes("SURRENDERED") ? formData.itemRequestedWasState?.plateCount?.[0] === "TWO" : false,
        "Special plates": formData.itemRequestedWasState?.checked?.includes("SPECIAL PLATES"),
        "REG card with current address": (formData.itemRequestedWasState?.checked?.includes("REQUESTING REGISTRATION CARD") || formData.transactionSelections?.some((s: any) => s.toLowerCase().includes("request pno card"))),
        "CVC": formData.itemRequestedWasState?.checked?.includes("PER CVC §4467"),
        "other": formData.itemRequestedWasState?.checked?.includes("OTHER") ? true : senerio?.includes("Duplicate Registration") ? true : formData.transactionSelections?.some((s: any) => s.toLowerCase().includes("request pno card")) ? true : false,
        "Explanation": formData.itemRequestedWasState?.checked?.includes("OTHER") ? formData.itemRequestedWasState?.otherExplain || '' : senerio?.includes("Duplicate Registration") ? "Requesting a Duplicate Registration Card" : formData.transactionSelections?.some((s: any) => s.toLowerCase().includes("request pno card")) ? "Requesting PNO Card" : "",
        "Name of bank, finance company, or individual having a lien on this vehicle": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || 'NONE' : "NONE",
        "2 Address": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["Street"] || '' : "",
        "2 Apt/Space Number": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["APT./SPACE/STE.#"] || '' : "",
        "2 City": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["City"] || '' : "",
        "2 States1": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["State"] || '' : "",
        "2 Zip Code": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["ZIP Code"] || '' : "",
        "3 Print Name Legal Owner.0": owner1,
        "3 Print Name Legal Owner.1": owner1,
        "3 Print Name Legal Owner.2.0": owner2,
        // "3 Date.0": formData.ownersData?.[0]?.['Date of Sale'] || '',
        // "4 Date-2": (formData.ownerCount ?? 0) > 1 ? formData.ownersData?.[0]?.['Date of Sale'] || '' : '',
        "4 Date-2": getCurrentDate(),

        "3 Date.0": getCurrentDate(),
        "date.0": formData.ownersData?.[0]?.['Date of Sale'] || '',
        "area code.0": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "area": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "area23": formData.ownersData?.[1]?.['Phone Number']?.slice(1, 4) || '',
        "3 Daytime Phone Number": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        "4 Daytime Phone Number 1": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        "4 Daytime Phone Number 2.0": formData.ownersData?.[1]?.['Phone Number']?.slice(5) || '',
        "Printed name of authorized agent signing for company": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Name of bank, finance company, or individual(s) having a lien on this vehicle"] || "NONE" : "NONE",
        "title of authorized agent signing for company": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Title of authorized agent signing for company"] || "" : '',
        "area code.1": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Phone number"]?.slice(1, 4) || "" : "",
        "4 Daytime Phone Number 2.1": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Phone number"]?.slice(5) || "" : "",
        "date.1": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Date of Sale"] || getCurrentDate() : getCurrentDate(),
        "License Plate/CF Number122": formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        "Vehicle/Vessel ID/Number211": formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        "Year/Make2": `${formData.vehicleInfoState?.['Year of Vehicle'] || ""} ${formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || ""}`,
        "market value": formData.transactionSelections?.includes("Vehicle is a Gift") ? formData.newOwnerData?.[0]?.["Market Value"]?.replace(/[^0-9.]/g, '') || '' : '',
        "true full name of new owner, last, first, middle, suffix, business name, or lessor": (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0]) : '',
        "6 DL/ID Card Numer-1.0.1.0": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[0] || '' : '',
        "6 DL/ID Card Numer-1.0.1.1": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[1] || '' : "",
        "6 DL/ID Card Numer-1.0.1.2": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[2] || '' : "",
        "6 DL/ID Card Numer-1.0.1.3": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[3] || '' : "",
        "6 DL/ID Card Numer-1.0.1.4": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[4] || '' : "",
        "6 DL/ID Card Numer-1.0.1.5": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[5] || '' : "",
        "6 DL/ID Card Numer-1.0.1.6": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[6] || '' : "",
        "6 DL/ID Card Numer-1.0.1.7": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[7] || '' : "",
        "6 DL/ID Card Numer-1.0.0": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[0] || '' : "",
        "6 DL/ID Card Numer-1.1": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[1] || '' : "",
        "6 DL/ID Card Numer-1.2": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[2] || '' : "",
        "6 DL/ID Card Numer-1.3": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[3] || '' : "",
        "6 DL/ID Card Numer-1.4": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[4] || '' : "",
        "6 DL/ID Card Numer-1.5": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[5] || '' : "",
        "6 DL/ID Card Numer-1.6": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[6] || '' : "",
        "6 DL/ID Card Numer-1.7.0": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[7] || '' : "",
        "6 DL/ID Card Numer-1.7.1": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.State || '' : "",
        "6 Name First-1": (formData.newOwnerCount ?? 0) > 1 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1]) : '',
        "6 state": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['State'] || '' : '',
        "6 Name Last-2": (formData.newOwnerCount ?? 0) > 2 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[2]) : '',
        "6 DL/ID CArd Number-2.0": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[0] || '' : '',
        "6 DL/ID CArd Number-2.1": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[1] || '' : '',
        "6 DL/ID CArd Number-2.2": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[2] || '' : '',
        "6 DL/ID CArd Number-2.3": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[3] || '' : '',
        "6 DL/ID CArd Number-2.4": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[4] || '' : '',
        "6 DL/ID CArd Number-2.5": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[5] || '' : '',
        "6 DL/ID CArd Number-2.6": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[6] || '' : '',
        "6 DL/ID CArd Number-2.7": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[7] || '' : '',
        "state-2.8": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['State'] || '' : '',
        "physical residence or business address.0": formData.newOwnerAddress?.["Street"] || "",
        "6 Apt/Space Number-1": formData.newOwnerAddress?.["APT./SPACE/STE.#"] || "",
        "6 City-1": formData.newOwnerAddress?.["City"] || "",
        "City-1": formData.newOwnerAddress?.["City"] || "",
        "6 States1": formData.newOwnerAddress?.["State"] || "",
        "6 Zip Code-1": formData.newOwnerAddress?.["ZIP Code"] || "",
        "county residence or county where vehicle or vessle is princi.0": formData.newOwnerAddress?.County || '',
        "6 Mailing Address": formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.Street || '' : '',
        "6 Apt/Space Number-2": formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.["APT./SPACE/STE.#"] || '' : '',
        "6 City-2": formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City || '' : '',
        "date.123": (formData.newOwnerCount ?? 0) > 0 ? rawDate || '' : '',
        "date 2": (formData.newOwnerCount ?? 0) > 1 ? rawDate || '' : '',
        "date 3": (formData.newOwnerCount ?? 0) > 2 ? rawDate || '' : '',
        '6 States 2.0': formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.State || '' : '',
        '6 Zip Code-2.0': formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.["ZIP Code"] || '' : '',
        'Lessee address, if different from address above': `${formData.newOwnerLesseeAddress?.Street || ''}    ${formData.newOwnerLesseeAddress?.["APT./SPACE/STE.#"] || ''}    ${formData.newOwnerLesseeAddress?.City || ''}    ${formData.newOwnerLesseeAddress?.State || ''}  ${formData.newOwnerLesseeAddress?.["ZIP Code"] || ''} `,
        'Vessel or trailer coach principally kept at, address or location if different from physical/business address above': `${formData.newOwnerKeptAddress?.Street || ''}    ${formData.newOwnerKeptAddress?.["APT./SPACE/STE.#"] || ''}    ${formData.newOwnerKeptAddress?.City || ''}    ${formData.newOwnerKeptAddress?.State || ''}  ${formData.newOwnerKeptAddress?.["ZIP Code"] || ''} `,
        'county.0.0': formData.newOwnerKeptAddress?.County || '',
        '6 area code 1': (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '' : '',
        'daytime telephone number': (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '' : '',
        'area code 2': (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Phone Number']?.slice(1, 4) || '' : '',
        'daytime number 2': (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Phone Number']?.slice(5) || '' : '',
        'area code 3': (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Phone Number']?.slice(1, 4) || '' : '',
        'daytime number 3': (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Phone Number']?.slice(5) || '' : '',
        '7 Name New Legal Owner': senerio.includes("Add Lienholder") ? formData.newLienholder?.address?.["True Full Name or Bank/Finance Company or Individual"] || "NONE" : "NONE",
        'Physical residence or business address.0': senerio.includes("Add Lienholder") ? formData.newLienholder?.address?.["Street"] || "" : "",
        'mailing address': senerio.includes("Add Lienholder") ? formData.newLienholder?.isMailingDifferent ? formData.newLienholder?.mailingAddress?.["Street"] || "" : "" : "",
        '7 Apt/Space Number.0': senerio.includes("Add Lienholder") ? formData.newLienholder?.address?.["APT./SPACE/STE.#"] || "" : "",
        '7 Apt/Space Number.1': senerio.includes("Add Lienholder") ? formData.newLienholder?.isMailingDifferent ? formData.newLienholder?.mailingAddress?.["APT./SPACE/STE.#"] || "" : "" : "",
        '7 City.0': senerio.includes("Add Lienholder") ? formData.newLienholder?.address?.["City"] || "" : "",
        '7 City.1': senerio.includes("Add Lienholder") ? formData.newLienholder?.isMailingDifferent ? formData.newLienholder?.mailingAddress?.["City"] || "" : "" : "",
        '7 State.0': senerio.includes("Add Lienholder") ? formData.newLienholder?.address?.["State"] || "" : "",
        '7 State.1': senerio.includes("Add Lienholder") ? formData.newLienholder?.isMailingDifferent ? formData.newLienholder?.mailingAddress?.["State"] || "" : "" : '',
        '7 Zip Code.0': senerio.includes("Add Lienholder") ? formData.newLienholder?.address?.["ZIP Code"] || "" : "",
        '7 Zip Code.1': senerio.includes("Add Lienholder") ? formData.newLienholder?.isMailingDifferent ? formData.newLienholder?.mailingAddress?.["ZIP Code"] || "" : "" : '',
        "License Plate/CF Number": formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        "Veh/Vessel ID Number": formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        'text_70xghh': senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Market Value"] || '' : '',
        'text_71tqjp': senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Change Cost"] || '' : '',
        'text_72knux': senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Change Date"] || '' : '',
        "Text9.1": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[0] || "",
        "Text9.2": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[1] || "",
        "Text9.3": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[2] || "",
        "Text9.4": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[3] || "",
        "Text9.5": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[4] || "",
        "Text9.6": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[5] || "",
        "Text9.7": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[6] || "",
        "Text9.8": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[7] || "",
        "Text9.9": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[8] || "",
        "Text9.10": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[9] || "",
        "Text9.11": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[10] || "",
        "Text9.12": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[11] || "",
        "Text9.13": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[12] || "",
        "Text9.14": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[13] || "",
        "Text9.15": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[14] || "",
        "Text9.16": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[15] || "",
        "Text9.17": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[16] || "",
        "Text9.18": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[17] || "",
        "Text9.19": formData.vehicleInfoState?.['Vehicle/Hull Identification Number']?.split('')[18] || "",
        'Text10': formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || "",
        "Text11": formData.vehicleInfoState?.['Year of Vehicle'] || '',
        'Text62': (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0]) : '',
        'Text73': senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.ifPlateOwnerIsDifferent ? formData?.platePurchaseState?.plateOwner?.["ZIP Code"] || '' : '' : (formData.newOwnerCount ?? 0) > 1 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1]) : '',
        'Text81': (formData.newOwnerCount ?? 0) > 2 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[2]) : '',
        "Text64": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.platePurchase?.["True Full Name (Last, First, Middle Initial, Suffix)"] || '' : formData.newOwnerData?.[0]?.['State'] || '',
        "Text65": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.platePurchase?.["Street Address or PO Box"] || '' : '',
        "Text66": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.platePurchase?.City || '' : '',
        "Text67": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.platePurchase?.State || '' : '',
        "Text68": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.platePurchase?.["ZIP Code"] || '' : '',

        "Text69": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.ifPlateOwnerIsDifferent ? formData?.platePurchaseState?.plateOwner?.["True Full Name (Last, First, Middle Initial, Suffix)"] || '' : '' : '',
        "Text70": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.ifPlateOwnerIsDifferent ? formData?.platePurchaseState?.plateOwner?.["Street Address or PO Box"] || '' : '' : '',
        "Text71": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.ifPlateOwnerIsDifferent ? formData?.platePurchaseState?.plateOwner?.["City"] || '' : '' : '',
        "Text72": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.ifPlateOwnerIsDifferent ? formData?.platePurchaseState?.plateOwner?.["State"] || '' : '' : '',

        "Text74": senerio?.includes("Personalized Plates") ? getCurrentDate() : (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['State'] || '' : '',
        "Text75": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.platePurchase?.["Phone Number"]?.slice(1, 4) || '' : (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['State'] || '' : '',
        "Text76": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.platePurchase?.["Phone Number"]?.slice(5) || '' : (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['State'] || '' : '',
        "Text77": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.plateOwner?.["Phone Number"]?.slice(1, 4) || '' : '',
        "Text78": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.plateOwner?.["Phone Number"]?.slice(5) || '' : '',
        'Owner DL no': formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[0] || '',
        'owner second digit': formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[1] || '',
        'owner third digit': formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[2] || '',
        'owner fourth digit': formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[3] || '',
        'owner fifth digit': formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[4] || '',
        'owner sixth digit': formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[5] || '',
        'owner seventh digit': formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[6] || '',
        'owner eighth digit': formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[7] || '',
        "first co owner dl no": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[0] || '' : '',
        "first co owner second digit": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[1] || '' : '',
        "first co owner third digit": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[2] || '' : '',
        "first co owner fourth digit": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[3] || '' : '',
        "first co owner fifth digit": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[4] || '' : '',
        "first co owner sixth digit": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[5] || '' : '',
        "first co owner seventh digit": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[6] || '' : '',
        "first co owner eighth digit": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Driver License Number']?.split('')[7] || '' : '',
        "second co owner": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[0] || '' : '',
        "second co owner second digit": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[1] || '' : '',
        "second co owner third digit": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[2] || '' : '',
        "second co owner fourth digit": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[3] || '' : '',
        "second co owner fifth digit": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[4] || '' : '',
        "second co owner sixth digit": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[5] || '' : '',
        "second co owner seventh digit": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[6] || '' : '',
        "second co owner eighth digit": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Driver License Number']?.split('')[7] || '' : '',
        'Text82': formData.newOwnerAddress?.Street || '',
        'Text83': formData.newOwnerAddress?.["APT./SPACE/STE.#"] || '',
        "Text85": formData.newOwnerAddress?.City || '',
        'Text86': formData.newOwnerAddress?.State || '',
        'Text87': formData.newOwnerAddress?.["ZIP Code"] || '',
        'Text88': formData.newOwnerAddress?.County || '',
        "Text89": '',
        'Text90': formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.Street || '' : '',
        'Text91': formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.["APT./SPACE/STE.#"] || '' : '',
        "Text92": formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.City || '' : '',
        'Text93': formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.State || '' : '',
        'Text94': formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.["ZIP Code"] || '' : '',
        "Text95": formData.newOwnerLesseeAddress?.Street || '',
        "Text109": formData.newOwnerLesseeAddress?.["APT./SPACE/STE.#"] || '',
        "Text110": formData.newOwnerLesseeAddress?.City || '',
        "Text111": formData.newOwnerLesseeAddress?.State || '',
        "Text112": formData.newOwnerLesseeAddress?.["ZIP Code"] || '',
        "Text113": `${formData.newOwnerKeptAddress?.Street || ''}    ${formData.newOwnerKeptAddress?.["APT./SPACE/STE.#"] || ''}`,
        "Text114": formData.newOwnerKeptAddress?.["APT./SPACE/STE.#"] || '',
        "Text115": formData.newOwnerKeptAddress?.City || '',
        "Text116": formData.newOwnerKeptAddress?.State || '',
        "Text117": formData.newOwnerKeptAddress?.["ZIP Code"] || '',
        "Text118": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.residential?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || '' : 'NONE',
        "Text119": formData.transactionSelections?.includes('There is a Current Lienholder') && (formData.transactionSelections?.includes('Out of State Title') || senerio?.includes('Commercial Vehicle')) ? formData.LegalOwnerOfRecordData?.residential?.["ELT Number (3 digits)"] || '' : '',
        "Text120": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.residential?.Street || '' : '',
        "Text121": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.residential?.["APT./SPACE/STE.#"] || '' : '',
        "Text122": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.residential?.City || '' : '',
        "Text123": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.residential?.State || '' : '',
        "Text124": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.residential?.["ZIP Code"] || '' : '',
        "Text125": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.showMailingAddress ? formData.LegalOwnerOfRecordData?.mailing?.Street || '' : '' : '',
        "Text126": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.showMailingAddress ? formData.LegalOwnerOfRecordData?.mailing?.["APT./SPACE/STE.#"] || '' : '' : '',
        "Text127": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.showMailingAddress ? formData.LegalOwnerOfRecordData?.mailing?.City || '' : '' : '',
        "Text128": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.showMailingAddress ? formData.LegalOwnerOfRecordData?.mailing?.State || '' : '' : '',
        "Text129": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.showMailingAddress ? formData.LegalOwnerOfRecordData?.mailing?.["ZIP Code"] || '' : '' : '',
        "Text137": formData.dateValues?.["DATE VEHICLE ENTERED OR WILL ENTER CALIFORNIA (CA):"].Month || '',
        "Text138": formData.dateValues?.["DATE VEHICLE ENTERED OR WILL ENTER CALIFORNIA (CA):"].Day || '',
        "Text139": formData.dateValues?.["DATE VEHICLE ENTERED OR WILL ENTER CALIFORNIA (CA):"].Year || '',
        "Text141": formData.dateValues?.["DATE VEHICLE FIRST OPERATED IN CALIFORNIA:"].Month || '',
        "Text142": formData.dateValues?.["DATE VEHICLE FIRST OPERATED IN CALIFORNIA:"].Day || '',
        "Text143": formData.dateValues?.["DATE VEHICLE FIRST OPERATED IN CALIFORNIA:"].Year || '',
        "Text144": formData.dateValues?.["DATE YOU WENT TO WORK IN CALIFORNIA, OBTAINED A CA DRIVER LICENSE, OR BECAME A RESIDENT:"].Month || '',
        "Text145": formData.dateValues?.["DATE YOU WENT TO WORK IN CALIFORNIA, OBTAINED A CA DRIVER LICENSE, OR BECAME A RESIDENT:"].Day || '',
        "Text146": formData.dateValues?.["DATE YOU WENT TO WORK IN CALIFORNIA, OBTAINED A CA DRIVER LICENSE, OR BECAME A RESIDENT:"].Year || '',
        "Text147": formData.dateValues?.["DATE VEHICLE WAS PURCHASED OR ACQUIRED:"].Month || '',
        "Text148": formData.dateValues?.["DATE VEHICLE WAS PURCHASED OR ACQUIRED:"].Day || '',
        "Text149": formData.dateValues?.["DATE VEHICLE WAS PURCHASED OR ACQUIRED:"].Year || '',
        "Current Market Value 1": '',
        "Powered by other 2": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["It is powered by"] ? formData.statementForSomgExemptionData?.Other || '' : '' : '',
        "Text132.0": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[5] || "",
        "Text132.1": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[4] || "",
        "Text132.2": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[3] || "",
        "Text132.3": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[2] || "",
        "Text132.4": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[1] || "",
        "Text132.5": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[0] || "",
        //Reg343
        "Text12": `${formData.statementForSomgExemptionData?.diesel ? 'Diesel' : formData.statementForSomgExemptionData?.electricity ? 'Electricity' : formData.statementForSomgExemptionData?.Other || ''}`,
        ////--Reg343 section 1
        "Text13": senerio?.includes("Personalized Plates") ? (formData?.platesSelectionState?.selectedPlate === "Duplicate Decal" ? formData?.platesSelectionState?.duplicatePlate : (formData.vehicleInfoState?.['California License Number'] || '')) : (formData.vehicleInfoState?.['California License Number'] || ''),
        "Text16": formData.vehicleInfoState?.['Model or Series'] || '',
        "Text17": formData.vehicleInfoState?.['Body Type Model'] || '',
        // "Text13": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState?.selectedPlate === "Duplicate Decal" ? formData?.platesSelectionState?.duplicatePlate : "" : "",
        "Text18": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState?.selectedPlate === "Veterans' Organization" ? formData?.platesSelectionState?.veteranCode : "" : formData.typeOfVehicleSelection?.includes("MOTORCYCLE") ? formData.vehicleInfoState?.['Motorcycle Engine Number'] || '' : '',
        "Text29": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.text[0] : '' : '' : formData.typeOfVehicleSelection?.includes("TRAILER COACH") ? formData.vehicleInfoState?.['Length (IN)'] || '' : '',
        "Text30": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.text[1] : '' : '' : '',
        "Text31": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.text[2] : '' : '' : '',
        "Text32": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.text[3] : '' : '' : '',
        "Text33": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.text[4] : '' : '' : '',
        "Text34": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.text[5] : '' : '' : '',
        "Text35": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.text[6] : '' : '' : '',
        "Text36": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.text[7] : '' : '' : '',
        "Text37": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[0]?.meaning : '' : '' : '',

        "Text38": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.text[0] : '' : '' : '',
        "Text39": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.text[1] : '' : '' : '',
        "Text40": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.text[2] : '' : '' : '',
        "Text41": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.text[3] : '' : '' : '',
        "Text42": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.text[4] : '' : '' : '',
        "Text43": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.text[5] : '' : '' : '',
        "Text44": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.text[6] : '' : '' : '',
        "Text45": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.text[7] : '' : '' : '',
        "Text46": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[1]?.meaning : '' : '' : '',

        "Text47": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.text[0] : '' : '' : '',
        "Text48": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.text[1] : '' : '' : '',
        "Text49": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.text[2] : '' : '' : senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["Number of axles"] || '' : '',
        "Text50": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.text[3] : '' : '' : senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["Unladen weight"] || '' : '',
        "Text51": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.text[4] : '' : '' : '',
        "Text52": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.text[5] : '' : '' : '',
        "Text53": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.text[6] : '' : '' : '',
        "Text54": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.text[7] : '' : '' : '',
        "Text55": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.plateChoices[2]?.meaning : '' : '' : '',

        //check boxes
        "App for": false,
        "App for2": true,
        "Check Box1": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState === 'Order' ? true : false : formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Lost' ? true : false,
        "Check Box2": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState === 'Replace' ? true : false : formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Stolen' ? true : false,
        "Check Box3": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState === 'Reassign/Retain' ? true : false : false,
        "Check Box4": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState === 'Exchange' ? true : false : formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Not Recive From Prior Owner' ? true : false,
        "Check Box5": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === "Environmental License Plate (ELP)" ? true : false : formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Not Recive From DMV(Allow 30 dys from issue date)' ? true : false,
        "Check Box6": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === "California Coastal Commission (Whale Tail)" ? true : false : formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Illegile/Mutilated(Attach old title)' ? true : false,
        "Check Box7": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === "Lake Tahoe Conservancy" ? true : false : false,
        "Check Box8": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === "Honoring Veterans Plate" ? true : false : false,
        "Gift Box": formData.transactionSelections?.includes("Vehicle is a Gift") ? true : false,
        // "Gift Box1": formData.transactionSelections?.includes("Vehicle is a Gift") ? false : true,
        "And Box.0": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnershipTypes?.[1] === 'and' ? true : false : false,
        "And Box.1": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnershipTypes?.[2] === 'and' ? true : false : false,
        "And Box1.0": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnershipTypes?.[1] === 'or' ? true : false : false,
        "And Box1.1": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnershipTypes?.[2] === 'or' ? true : false : false,
        "Biennial Smog cert box": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["The last smog certification was obtained within the last 90 days"] ? true : false : false,
        "Powered by box": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["It is powered by"] ? true : false : false,
        "Powered by electricity box": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["It is powered by"] ? formData.statementForSomgExemptionData?.electricity ? true : false : false : false,
        "Powered by diesel box": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["It is powered by"] ? formData.statementForSomgExemptionData?.diesel ? true : false : false : false,
        "Powered by other box": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["It is powered by"] ? formData.statementForSomgExemptionData?.Other ? true : false : false : false,
        "Located outside CA box1": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["It is located outside the State of California. (Exception: Nevada and Mexico)"] ? true : false : false,
        "transferred from/between": formData.transactionSelections?.includes("Family Transfer") ? true : formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["It is being transferred from/between:"] ? true : false : false,
        "Paren, grandparent, etc box": formData.transactionSelections?.includes("Family Transfer") ? true : formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["It is being transferred from/between:"] ? true : false : false,
        "Companies leasing vehicle box": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["A sole proprietorship to the proprietor as owner.*"] ? true : false : false,
        "Companies whose principal business": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["Companies whose principal business is leasing vehicles. There is no change in lessee or operator.*"] ? true : false : false,
        "Lessor/lessee operator box": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["Lessor and lessee of vehicle, and no change in the lessee or operator of the vehicle.*"] ? true : false : false,
        "Lessor and person": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["Lessor and person who has been lessee's operator of the vehicle for at least one year.*"] ? true : false : false,
        "Individual as registered own box.1": formData.transactionSelections?.includes("Smog Exemption") ? formData.statementForSomgExemptionData?.["Individual(s) being added as registered owner(s).*"] ? true : false : false,
        "Check Box133": formData.vehicleInfoState?.["If kilometers check this box"] ? true : false,
        "Check Box134": formData.vehicleInfoState?.["NOT Actual Mileage"] ? true : false,
        "Check Box135": formData.vehicleInfoState?.["Mileage Exceeds Mechanical Limit"] ? true : false,
        "Check Box20": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState.assignedTo === "Commercial" ? true : false : false : formData.typeOfVehicleSelection === "AUTO" ? true : false,
        "Check Box21": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState.assignedTo === "Trailer" ? true : false : false : false,
        "Check Box22": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState.assignedTo === "Motorcycle" ? true : false : false : false,
        "Check Box23": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState.assignedFor === "Sequential" ? true : false : false : false,
        "Check Box24": senerio?.includes("Commercial Vehicle") ? true : senerio?.includes("Personalized Plates") ?
            (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ?
                formData?.selectConfigState.assignedFor !== "" ? formData?.selectConfigState.deliveryType === "Auto Club" ? true : false : false : false : formData.typeOfVehicleSelection === "Commercial" ? true : false,
        "Check Box25": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === "California 1960s Legacy" ? true : false : formData.typeOfVehicleSelection === "MOTORCYCLE" ? true : false,
        "Check Box26": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'California Museums (Snoopy)' ? true : false : formData.typeOfVehicleSelection === "OFF HIGHWAY" ? true : false,
        "Check Box27": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? true : false : false : formData.typeOfVehicleSelection === "TRAILER COACH" ? true : false,
        "Check Box28": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor === "Personalized" ? formData?.selectConfigState?.centered ? true : false : false : false : false,
        "Check Box140": formData.vehicleStatusInfoData?.["IF VEHICLE WAS PREVIOUSLY REGISTERED IN CA, THEN REGISTERED OR LOCATED OUTSIDE CA AND HAS NOW RETURNED, ENTER DATE VEHICLE ENTERED CA. IF YOU DID NOT OWN THE VEHICLE AT ENTRY, CHECK BOX:"] ? true : false,
        "Check Box150": formData.vehicleStatusInfoData?.["Vehicle Condition"] === "NEW" ? true : false,
        "Check Box151": formData.vehicleStatusInfoData?.["IF YOU ARE NOT A CA RESIDENT, CHECK THIS BOX:"] ? true : false,
        "Check Box152": formData.vehicleStatusInfoData?.["Vehicle Condition"] === "USED" ? true : false,
        "Check Box153": formData.vehicleStatusInfoData?.["Purchase Location"] === "INSIDE CA" ? true : false,
        "Check Box154": formData.vehicleStatusInfoData?.["Purchase Location"] === "OUTSIDE CA" ? true : false,
        //form 343
        "Check Box155": formData.transactionSelections?.includes("Vehicle is a Gift") ? false : true,
        "Text156": formData.transactionSelections?.includes("Vehicle is a Gift") ? "" : formData.newOwnerData?.[0]?.["Purchase Price/Value"]?.replace(/[^0-9.]/g, '') || '',
        "Check Box157": formData.transactionSelections?.includes("Vehicle is a Gift") ? true : false,
        "Text158": formData.transactionSelections?.includes("Vehicle is a Gift") ? formData.newOwnerData?.[0]?.["Market Value"]?.replace(/[^0-9.]/g, '') || '' : '',
        "Check Box161": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "dealer" ? true : false,
        "Check Box162": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "private party" ? true : false,
        "Check Box163": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "dismantler" ? true : false,
        "Check Box164": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "family" ? true : false,
        "Text165": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "family" ? formData.vehiclePurchaseInfo?.["family_relationship"] || '' : '',
        "Check Box166": formData.vehiclePurchaseInfo?.["Vehicle Modifications"] === "yes" ? true : false,
        "Check Box167": formData.vehiclePurchaseInfo?.["Vehicle Modifications"] === "no" ? true : false,
        "Check Box169": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.salesTaxPaid === "n/a" ? true : false : false,
        "Check Box170": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.salesTaxPaid === "yes" ? true : false : false,
        "Check Box171": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.salesTaxPaid === "no" ? true : false : false,
        "Text172": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.salesTaxPaid === "yes" ? formData.outOfStateVehicle?.salesTaxPaidAmount || '' : '' : '',
        "Check Box175": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.outOfStatePlates?.value === "expired" ? true : false : false,
        "Check Box176": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.outOfStatePlates?.value === "surrendered" ? true : false : false,
        "Check Box177": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.outOfStatePlates?.value === "destroyed" ? true : false : false,
        "Check Box178": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.outOfStatePlates?.value === "retained" ? true : false : false,
        "Check Box179": formData.transactionSelections?.includes("Out of State Title") ? formData.outOfStateVehicle?.outOfStatePlates?.value === "returned" ? true : false : false,
        'Check Box70': (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnershipTypes?.[1] === 'and' ? true : false : false,
        'Check Box71': (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnershipTypes?.[1] === 'or' ? true : false : false,
        'Check Box77': (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnershipTypes?.[2] === 'and' ? true : false : false,
        'Check Box80': (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnershipTypes?.[2] === 'or' ? true : false : false,
        "Check Box181": true,
        "Check Box183": false,
        "Text184": (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwner(formData.newOwnerData?.[0]) : '',
        "Text185": ((formData.newOwnerCount ?? 0) > 0 && formData.ownersData?.[0]?.['Date of Sale']) || (senerio?.includes("Commercial Vehicle") && !senerio?.includes("Simple Transfer") && !senerio?.includes("Multiple Transfer") ? getCurrentDate() : ''),
        "Text189": ((formData.newOwnerCount ?? 0) > 0 && formData.ownersData?.[0]?.['Date of Sale']) || (senerio?.includes("Commercial Vehicle") && !senerio?.includes("Simple Transfer") && !senerio?.includes("Multiple Transfer") ? getCurrentDate() : ''),
        "Text193": ((formData.newOwnerCount ?? 0) > 0 && formData.ownersData?.[0]?.['Date of Sale']) || (senerio?.includes("Commercial Vehicle") && !senerio?.includes("Simple Transfer") && !senerio?.includes("Multiple Transfer") ? getCurrentDate() : ''),
        "Executed on-Date": ((formData.newOwnerCount ?? 0) > 0 && formData.ownersData?.[0]?.['Date of Sale']) || (senerio?.includes("Commercial Vehicle") && !senerio?.includes("Simple Transfer") && !senerio?.includes("Multiple Transfer") ? getCurrentDate() : ''),
        "dateforcertification": ((formData.newOwnerCount ?? 0) > 0 && formData.ownersData?.[0]?.['Date of Sale']) || (senerio?.includes("Commercial Vehicle") && !senerio?.includes("Simple Transfer") && !senerio?.includes("Multiple Transfer") ? getCurrentDate() : ''),
        "Text186": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '' : '',
        "Text187": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '' : '',
        "Text188": (formData.newOwnerCount ?? 0) > 1 ? formatSingleOwner(formData.newOwnerData?.[1]) : '',
        "Text190": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Phone Number']?.slice(1, 4) || '' : '',
        "Text191": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Phone Number']?.slice(5) || '' : '',
        "Text192": (formData.newOwnerCount ?? 0) > 2 ? formatSingleOwner(formData.newOwnerData?.[2]) : '',
        "Text194": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Phone Number']?.slice(1, 4) || '' : '',
        "Text195": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Phone Number']?.slice(5) || '' : '',
        "7 ELT #.0": senerio?.includes("Add Lienholder") ? formData.newLienholder?.address?.["ELT Number (3 digits)"]?.split('')[0] || '' : '',
        "7 ELT #.1.0": senerio?.includes("Add Lienholder") ? formData.newLienholder?.address?.["ELT Number (3 digits)"]?.split('')[1] || '' : '',
        "7 ELT #.1.1": senerio?.includes("Add Lienholder") ? formData.newLienholder?.address?.["ELT Number (3 digits)"]?.split('')[2] || '' : '',
        "gift box": formData.transactionSelections?.includes("Vehicle is a Gift"),
        "Family transfer box": formData.transactionSelections?.includes("Family Transfer"),
        "textarea_69crqf": senerio?.includes("Restoring PNO Vehicle to Operational") ? " The vehicle was previously placed on Planned Non Operation (PNO) status I now intend to operate it on public roads and I am submitting payment for registration fees and for any late fees penalities." :
            senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Statement of Facts"] || '' : '',


        ////--Reg102 1st page
        "license plate #.0": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[0]?.plate || '' : '',
        "vin.0": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[0]?.vin || '' : '',
        "make.0": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[0]?.make || '' : '',
        "equip #.0": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[0]?.equipment || '' : '',

        "license plate #.1": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[1]?.plate || '' : '',
        "vin.1": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[1]?.vin || '' : '',
        "make.1": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[1]?.make || '' : '',
        "equip #.1": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[1]?.equipment || '' : '',

        "license plate #.2": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[2]?.plate || '' : '',
        "vin.2": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[2]?.vin || '' : '',
        "make.2": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[2]?.make || '' : '',
        "equip #.2": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[2]?.equipment || '' : '',

        "license plate #.3": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[3]?.plate || '' : '',
        "vin.3": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[3]?.vin || '' : '',
        "make.3": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[3]?.make || '' : '',
        "equip #.3": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[3]?.equipment || '' : '',

        "license plate #.4": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[4]?.plate || '' : '',
        "vin.4": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[4]?.vin || '' : '',
        "make.4": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[4]?.make || '' : '',
        "equip #.4": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[4]?.equipment || '' : '',

        "license plate #.5": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[5]?.plate || '' : '',
        "vin.5": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[5]?.vin || '' : '',
        "make.5": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[5]?.make || '' : '',
        "equip #.5": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[5]?.equipment || '' : '',

        "license plate #.6": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[6]?.plate || '' : '',
        "vin.6": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[6]?.vin || '' : '',
        "make.6": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[6]?.make || '' : '',
        "equip #.6": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[6]?.equipment || '' : '',

        "license plate #.7": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[7]?.plate || '' : '',
        "vin.7": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[7]?.vin || '' : '',
        "make.7": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[7]?.make || '' : '',
        "equip #.7": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[7]?.equipment || '' : '',

        "license plate #.8": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[8]?.plate || '' : '',
        "vin.8": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[8]?.vin || '' : '',
        "make.8": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[8]?.make || '' : '',
        "equip #.8": (senerio?.includes("Certificate of Non-Operation")) ? formData?.plannedNonOperationState?.[8]?.equipment || '' : '',

        "certify date": senerio?.includes("Certificate of Non-Operation") ? getCurrentDate() : '',


        ////--Reg102 2nd page
        "PNO": (formData?.transactionSelections?.includes('60 days before registration expires or 90 days after') || formData?.transactionSelections?.includes('Request PNO card')) ? true : false,
        "veh lic plate #.0": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[0]?.plate || '' : '',
        "veh id #.0": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[0]?.vin || '' : '',
        "veh make.0": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[0]?.make || '' : '',
        "veh equip #.0": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[0]?.equipment || '' : '',

        "veh lic plate #.1": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[1]?.plate || '' : '',
        "veh id #.1": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[1]?.vin || '' : '',
        "veh make.1": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[1]?.make || '' : '',
        "veh equip #.1": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[1]?.equipment || '' : '',

        "veh lic plate #.2": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[2]?.plate || '' : '',
        "veh id #.2": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[2]?.vin || '' : '',
        "veh make.2": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[2]?.make || '' : '',
        "veh equip #.2": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[2]?.equipment || '' : '',

        "veh lic plate #.3": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[3]?.plate || '' : '',
        "veh id #.3": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[3]?.vin || '' : '',
        "veh make.3": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[3]?.make || '' : '',
        "veh equip #.3": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[3]?.equipment || '' : '',

        "veh lic plate #.4": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[4]?.plate || '' : '',
        "veh id #.4": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[4]?.vin || '' : '',
        "veh make.4": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[4]?.make || '' : '',
        "veh equip #.4": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[4]?.equipment || '' : '',

        "veh lic plate #.5": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[5]?.plate || '' : '',
        "veh id #.5": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[5]?.vin || '' : '',
        "veh make.5": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[5]?.make || '' : '',
        "veh equip #.5": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[5]?.equipment || '' : '',

        "veh lic plate #.6": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[6]?.plate || '' : '',
        "veh id #.6": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[6]?.vin || '' : '',
        "veh make.6": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[6]?.make || '' : '',
        "veh equip #.6": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[6]?.equipment || '' : '',

        "veh lic plate #.7": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[7]?.plate || '' : '',
        "veh id #.7": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[7]?.vin || '' : '',
        "veh make.7": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[7]?.make || '' : '',
        "veh equip #.7": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[7]?.equipment || '' : '',

        "veh lic plate #.8": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[8]?.plate || '' : '',
        "veh id #.8": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[8]?.vin || '' : '',
        "veh make.8": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[8]?.make || '' : '',
        "veh equip #.8": (senerio?.includes("Filing for Planned Non-Operation (PNO)")) ? formData?.plannedNonOperationState?.[8]?.equipment || '' : '',

        "area code23": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? senerio?.includes("Simple Transfer") ? formData?.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '' : formData?.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '' : '',
        "phone23": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? senerio?.includes("Simple Transfer") ? formData?.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '' : formData?.ownersData?.[0]?.['Phone Number']?.slice(5) || '' : "",
        "cert date": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? getCurrentDate() : '',

        "from month.0": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["FROM: MONTH, DAY, YEAR"])?.month : '',
        "from day.0": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["FROM: MONTH, DAY, YEAR"])?.day || '' : '',
        "from year.0": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["FROM: MONTH, DAY, YEAR"])?.year || '' : '',
        "to month": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["TO: MONTH, DAY, YEAR"])?.month || '' : '',
        "to day": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["TO: MONTH, DAY, YEAR"])?.day || '' : '',
        "to year": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["TO: MONTH, DAY, YEAR"])?.year || '' : '',

        "street": senerio?.includes("Certificate of Non-Operation") ? formData?.vehicleStorageLocation?.Address || '' : '',
        "city": senerio?.includes("Certificate of Non-Operation") ? formData?.vehicleStorageLocation?.City || '' : '',
        "area code22": senerio?.includes("Certificate of Non-Operation") ? senerio?.includes("Simple Transfer") ? formData?.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '' : formData?.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '' : '',
        "phone22": senerio?.includes("Certificate of Non-Operation") ? senerio?.includes("Simple Transfer") ? formData?.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '' : formData?.ownersData?.[0]?.['Phone Number']?.slice(5) || '' : "",


        // "state": senerio?.includes("Certificate of Non-Operation") ? formData?.vehicleStorageLocation?.State || '' : '',
        // "zip code": senerio?.includes("Certificate of Non-Operation") ? formData?.vehicleStorageLocation?.["ZIP Code"] || '' : '',



        //reg 156
        "license year": senerio?.includes("Duplicate Plates & Stickers") ? senerio?.includes("Duplicate Stickers") && senerio?.includes("Yearly Sticker") ? true : true : false,
        "license month": senerio?.includes("Duplicate Plates & Stickers") ? senerio?.includes("Duplicate Stickers") && senerio?.includes("Monthly Sticker") ? true : true : false,
        "date": getCurrentDate(),
        "License plates": senerio?.includes("Duplicate Plates & Stickers") ? true : false,

        "Check Box51": senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["ActualOrEstimated"] === "Actual" ? true : false : false,
        "Check Box55": senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["ActualOrEstimated"] === "Estimated" ? true : false : false,

        //reg 4008
        //-- reg 4008 — use NEW owner data
        "Name": senerio?.includes("Commercial Vehicle") ? newOwner1 || '' : '',
        "text_31jsfn": senerio?.includes("Commercial Vehicle") ? formData?.newOwnerAddress?.Street || '' : '',
        "text_32olri": senerio?.includes("Commercial Vehicle") ? formData?.newOwnerAddress?.["APT./SPACE/STE.#"] || '' : '',
        "City.0": senerio?.includes("Commercial Vehicle") ? formData?.newOwnerAddress?.City || '' : '',
        "States1.0": senerio?.includes("Commercial Vehicle") ? formData?.newOwnerAddress?.State || '' : '',
        "Zip Code.0": senerio?.includes("Commercial Vehicle") ? formData?.newOwnerAddress?.["ZIP Code"] || '' : '',
        "Address.0.1": senerio?.includes("Commercial Vehicle") ? formData?.newOwnerAddress?.County || '' : '',
        "Check Box 1": senerio?.includes("Commercial Vehicle") ? formData?.newOwnerAddress?.["If no California county and used out-of-state, check this box"] || false : false,

        "text_30xebc": senerio?.includes("Commercial Vehicle") ? formData?.selectedRadio?.includes("if-mailing-address-is-different") ? formData?.newOwnerMailingAddress?.Street || '' : '' : '',
        "text_33mpyh": senerio?.includes("Commercial Vehicle") ? formData?.selectedRadio?.includes("if-mailing-address-is-different") ? formData?.newOwnerMailingAddress?.["APT./SPACE/STE.#"] || '' : '' : '',
        "City.1": senerio?.includes("Commercial Vehicle") ? formData?.selectedRadio?.includes("if-mailing-address-is-different") ? formData?.newOwnerMailingAddress?.City || '' : '' : '',
        "States1.1": senerio?.includes("Commercial Vehicle") ? formData?.selectedRadio?.includes("if-mailing-address-is-different") ? formData?.newOwnerMailingAddress?.State || '' : '' : '',
        "Zip Code.1": senerio?.includes("Commercial Vehicle") ? formData?.selectedRadio?.includes("if-mailing-address-is-different") ? formData?.newOwnerMailingAddress?.["ZIP Code"] || '' : '' : '',

        "License- 1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle License Number"] || '' : '',
        "VIN- 1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle Identification Number"] || '' : '',
        "Make -1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle Make"] || '' : '',
        "Under 10,001 pounds.0": senerio?.includes("Commercial Vehicle") && formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle Code Type"] === "Vehicle Under 10,001" ? "X" : "",
        "GVW -1.0": senerio?.includes("Commercial Vehicle") && formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle Code Type"] === "GVW" ? getWeightCode(formData?.vehicleDeclarationEntryData?.[0]?.["Weight Range"] || "") : '',
        "CGW -1.0": senerio?.includes("Commercial Vehicle") && formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle Code Type"] === "CGW" ? getWeightCode(formData?.vehicleDeclarationEntryData?.[0]?.["Weight Range"] || "") : '',
        "Date 1st operated-1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["Date Operated"] || '' : '',

        "License- 1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle License Number"] || '' : '',
        "VIN- 1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle Identification Number"] || '' : '',
        "Make -1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle Make"] || '' : '',
        "Under 10,001 pounds.1": senerio?.includes("Commercial Vehicle") && formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle Code Type"] === "Vehicle Under 10,001" ? "X" : "",
        "GVW -1.1": senerio?.includes("Commercial Vehicle") && formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle Code Type"] === "GVW" ? getWeightCode(formData?.vehicleDeclarationEntryData?.[1]?.["Weight Range"] || "") : '',
        "CGW -1.1": senerio?.includes("Commercial Vehicle") && formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle Code Type"] === "CGW" ? getWeightCode(formData?.vehicleDeclarationEntryData?.[1]?.["Weight Range"] || "") : '',
        "Date 1st operated-1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["Date Operated"] || '' : '',

        "checkbox_76bcix": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Unladen Weight Checked"] === true || false : false,
        "UNLADEN WEIGHT": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Unladen Weight Checked"] === true ? formData?.vehicleBodyState?.["Unladen Weight Reason"] || '' : '' : '',
        "checkbox_80yjyf": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Motive Power Checked"] === true || false : false,
        "text_70ywcs": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Motive Power Checked"] === true ? formData?.vehicleBodyState?.["Motive Power From"] || '' : '' : '',
        "text_71qeb": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Motive Power Checked"] === true ? formData?.vehicleBodyState?.["Motive Power To"] || '' : '' : '',
        "checkbox_81iyuu": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Body Type Checked"] === true || false : false,
        "text_72cghv": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Body Type Checked"] === true ? formData?.vehicleBodyState?.["Body Type From"] || '' : '' : '',
        "text_73edpt": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Body Type Checked"] === true ? formData?.vehicleBodyState?.["Body Type To"] || '' : '' : '',
        "checkbox_82vosg": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Axles Checked"] === true || false : false,
        "text_74aiyr": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Axles Checked"] === true ? formData?.vehicleBodyState?.["Axles From"] || '' : '' : '',
        "text_75aiwg": senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Axles Checked"] === true ? formData?.vehicleBodyState?.["Axles To"] || '' : '' : '',

        ////--reg 590
        //reg 590
        "590sec4Date": senerio?.includes("Commercial Vehicle") ? (
            senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")
                ? (senerio?.includes("Multiple Transfer")
                    ? (formData.ownersData?.[formData.ownersData?.length - 1]?.['Date of Sale'] || getCurrentDate())
                    : (formData.ownersData?.[0]?.['Date of Sale'] || getCurrentDate())
                )
                : getCurrentDate()
        ) : '',
        "590sec4phone1": senerio?.includes("Commercial Vehicle") ? (
            senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")
                ? (formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '')
                : (formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '')
        ) : '',
        "590sec4phone2": senerio?.includes("Commercial Vehicle") ? (
            senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")
                ? (formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '')
                : (formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '')
        ) : '',


        // "590sec4Date": senerio?.includes("Commercial Vehicle") ? getCurrentDate() : '',
        // "590sec4phone1": senerio?.includes("Commercial Vehicle") ? formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "" : '',
        // "590sec4phone2": senerio?.includes("Commercial Vehicle") ? formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "" : '',
        "Vehicle identification number": senerio?.includes("Commercial Vehicle") ? formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "" : '',
        "Text2": senerio?.includes("Commercial Vehicle") ? [formData.vehicleInfoState?.['Year of Vehicle']?.trim(), formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder']?.trim()].filter(Boolean).join(" / ") : '',
        "Text3": senerio?.includes("Commercial Vehicle") ? formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "" : '',
        "Check Box 4": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Bus" ? true : false || false : false : false,
        "Check Box 5": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Taxicab" ? true : false || false : false : false,
        "Check Box 6": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Rental Limousine" ? true : false || false : false : false,
        "Check Box 7": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Ambulance" ? true : false || false : false : false,
        "Check Box 8": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Station Wagon" ? true : false || false : false : false,
        "Check Box9": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === "Yosemite Foundation" ? true : false : senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.["The owner of this vehicle and it is registered in my name"] === true ? true : false || false : false : false,
        "Check Box10": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'California Arts Council' ? true : false : senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.["Employee of a business which required me to own and operate a station wagon which is registered in my name"] === true ? true : false || false : false : false,
        "Check Box11": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'California Agricultural (CalAg)' ? true : false : false,
        "Check Box12": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'Duplicate Decal' ? true : false : false,
        "Check Box13": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'California Memorial' ? true : false : false,
        "Check Box14": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'Collegiate (only UCLA is available)' ? true : false : false,
        "Check Box15": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'Kids - Child Health and Safety Funds' ? true : false : false,
        "Check Box16": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'Pet Lovers' ? true : false : false,
        "Check Box17": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === "Veterans' Organization" ? true : false : false,
        "Check Box18": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState.assignedFor !== "" ? formData?.selectConfigState.deliveryType === "DMV Office" ? true : false : false : false : false,
        "Text14": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.["commercialStartDate"] || '' : '' : '',

        ////--reg 488c
        // if simple transfer or multiple transfer with salvage then date of sale else if only salvage current date
        "DATE1": senerio?.includes("Salvage") ? ((senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) ? (formData.ownersData?.[0]?.['Date of Sale'] || "") : getCurrentDate()) : '',
        "CERTIFICATION DATE": senerio?.includes("Salvage") ? ((senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")) ? (formData.ownersData?.[0]?.['Date of Sale'] || "") : getCurrentDate()) : '',
        "original": senerio?.includes("Salvage") ? formData.transactionSelections?.includes("Orginal") ? true : false : false,
        "duplicate": senerio?.includes("Salvage") ? formData.transactionSelections?.includes("Duplicate") ? true : false : false,
        "VEHICLE LICENSE NUMBER": senerio?.includes("Salvage") ? formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "" : '',
        "MAKE1": senerio?.includes("Salvage") ? formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || "" : '',
        "YEAR1": senerio?.includes("Salvage") ? formData.vehicleInfoState?.['Year of Vehicle'] || "" : '',
        "STATE OF LAST REGISTRATION1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['State of last Registeration'] || "" : '',
        "DATE REGISTRATION EXPIRES1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Date of Registeration Expires'] || "" : '',
        "CLAIM NUMBER1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Cost/value'] || "" : '',
        "COST/VALUE1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Claim number'] || "" : '',
        "DATE WRECKED OR DESTROYED1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Date wrecked'] || "" : '',
        "Agent Name": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Agent Name'] || "" : '',
        "DATE STOLEN1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Date stolen'] || "" : '',
        "DATE RECOVERED1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Date recovered'] || "" : '',
        "PRINTED NAME OF INSURANCE CO. OR APPLICANT1": senerio?.includes("Salvage") ? owner1 : '',
        "DL OR ID NUMBER1": senerio?.includes("Salvage") ? formData.ownersData?.[0]?.['Driver License Number'] : '',
        "STREET ADDRESS": senerio?.includes("Salvage") ? formData.ownerAddress?.residential?.Street : '',
        "CITY": senerio?.includes("Salvage") ? formData.ownerAddress?.residential?.City : '',
        "STATE": senerio?.includes("Salvage") ? formData.ownerAddress?.residential?.State : '',
        "ZIP CODE": senerio?.includes("Salvage") ? formData.ownerAddress?.residential?.["ZIP Code"] : '',
        "PRINTED NAME OF AGENT": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Agent Name'] || '' : '',


        "Are Being Surrendered": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "ARE BEING SURRENDERED" ? true : false : false,
        "surrendedone": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "ARE BEING SURRENDERED" ? formData.certificateOfLicensePlateDispositionState?.platesSurrendered === "ONE" ? true : false : false : false,
        "surrendedtwo": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "ARE BEING SURRENDERED" ? formData.certificateOfLicensePlateDispositionState?.platesSurrendered === "TWO" ? true : false : false : false,
        "have been lost": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "HAVE BEEN LOST" ? true : false : false,
        "have been destroyed": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "HAVE BEEN DESTROYED (OCCUPATIONAL LICENSEES ONLY)" ? true : false : false,
        "plate with owner": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "PLATE WITH OWNER - RETAINED BY OWNER FOR REASSIGNMENT" ? true : false : false,
        "OL NUMBER 3": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "HAVE BEEN DESTROYED (OCCUPATIONAL LICENSEES ONLY)" ? formData.certificateOfLicensePlateDispositionState?.occupationalLicenseNumber : "" : "",

        //--Reg 195
        "Name or organization name": senerio?.includes("Disabled Person Placards/Plates") ? newOwner1forDisablepersonPlac || '' : '',
        "DL No.0": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[0] || '' : '',
        "DL No.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[1] || '' : '',
        "DL No.2": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[2] || '' : '',
        "DL No.3": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[3] || '' : '',
        "DL No.4": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[4] || '' : '',
        "DL No.5": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[5] || '' : '',
        "DL No.6": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[6] || '' : '',
        "DL No.7": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Driver License Number']?.split('')[7] || '' : '',

        "DOB-Mo1": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Date of Birth']?.split('')[0] || '' : '',
        "DOB-Mo2": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Date of Birth']?.split('')[1] || '' : '',
        "DOB-Day.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Date of Birth']?.split('')[3] || '' : '',
        "DOB-Day.2": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Date of Birth']?.split('')[4] || '' : '',
        "DOB-Yr.1.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Date of Birth']?.split('')[6] || '' : '',
        "DOB-Yr.1.2": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Date of Birth']?.split('')[7] || '' : '',
        "DOB-Yr.1.0": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Date of Birth']?.split('')[8] || '' : '',
        "DOB-Yr.0": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Date of Birth']?.split('')[9] || '' : '',

        "Residence or organization address": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerAddress?.Street || '' : '',
        "Apt/Space.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerAddress?.["APT./SPACE/STE.#"] || '' : '',
        "city.1.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerAddress?.City || '' : '',
        "county": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerAddress?.County || '' : '',
        "Applicant-State": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerAddress?.State || '' : '',
        "Applicant-Zip Code": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerAddress?.["ZIP Code"] || '' : '',
        "Residence or organization address if different": senerio?.includes("Disabled Person Placards/Plates") ? formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.Street || '' : '' : '',
        "Apt/Space.2": senerio?.includes("Disabled Person Placards/Plates") ? formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.['APT./SPACE/STE.#'] || '' : '' : '',
        "city2": senerio?.includes("Disabled Person Placards/Plates") ? formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.City || '' : '' : '',
        "county2": senerio?.includes("Disabled Person Placards/Plates") ? formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerAddress?.County || '' : '' : '',
        "State2": senerio?.includes("Disabled Person Placards/Plates") ? formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.State || '' : '' : '',
        "Zip Code2": senerio?.includes("Disabled Person Placards/Plates") ? formData.selectedRadio?.includes('if-mailing-address-is-different') ? formData.newOwnerMailingAddress?.["ZIP Code"] || '' : '' : '',
        "Area Code": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '' : '',
        "Daytime phone no": senerio?.includes("Disabled Person Placards/Plates") ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '' : '',

        "Perm Park Placard.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.selectedPlacard === "permanent" ? true : false : false,
        "Temp Park Placard.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.selectedPlacard === "temporary" ? true : false : false,
        "Perm Park Placard.0": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.selectedPlacard === "travel" ? true : false : false,
        "DP License plates": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.selectedPlacard === "plates" ? true : false : false,
        "DP License plates reassignment": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.selectedPlacard === "reassign" ? true : false : false,

        "Yes.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.issuedPreviously === "yes" ? true : false : false,
        "No.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.issuedPreviously === "no" ? true : false : false,
        "Lic Plate/Perm Placard": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.issuedPreviously === "yes" ? formData.dpState?.plate || '' : '' : '',

        "Lic Plate no": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpVehicleInfoState?.plate || '' : '',
        "VIN.1": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpVehicleInfoState?.vin || '' : '',
        "Veh Make": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpVehicleInfoState?.make || '' : '',
        "Veh Year": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpVehicleInfoState?.year || '' : '',

        "weightexyes": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.commercialWeightFeeExemption === "yes" : false,
        "weightexno": senerio?.includes("Disabled Person Placards/Plates") ? formData.dpState?.commercialWeightFeeExemption === "no" : false,
        "Executed-Date": getCurrentDate(),

        //--reg 256

        "checkbox_76urox": senerio?.includes("Name Change") ? senerio?.includes("Name Discrepancy") ? true : false : false,
        "text_71uait": senerio?.includes("Name Change") ? senerio?.includes("Name Discrepancy") ? formData?.nameChangeData?.discrepency1 || '' : '' : '',
        "text_72rrpr": senerio?.includes("Name Change") ? senerio?.includes("Name Discrepancy") ? formData?.nameChangeData?.discrepency2 || '' : '' : '',
        "checkbox_77lxng": senerio?.includes("Name Change") ? senerio?.includes("Name Correction") ? true : false : false,
        "text_73xplb": senerio?.includes("Name Change") ? senerio?.includes("Name Correction") ? formData?.nameChangeData?.correction || '' : "" : '',
        "checkbox_78tyvm": senerio?.includes("Name Change") ? senerio?.includes("Legal Name Change") ? true : false : false,
        "text_75ujtd": senerio?.includes("Name Change") ? senerio?.includes("Legal Name Change") ? formData?.nameChangeData?.changeFrom || '' : "" : '',
        "text_74udmw": senerio?.includes("Name Change") ? senerio?.includes("Legal Name Change") ? formData?.nameChangeData?.changeTo || '' : "" : '',
        "Transfer only box": true,


        //DMV 14
        //personal or bussiness info
        "last name": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[0] || '' : '',
        "last 1.0.0": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[1] || '' : '',
        "last 1.0.1": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[2] || '' : '',
        "last 1.0.2": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[3] || '' : '',
        "last 1.0.3": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[4] || '' : '',
        "last 1.0.4": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[5] || '' : '',
        "last 1.0.5": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[6] || '' : '',
        "last 1.0.6": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[7] || '' : '',
        "last 1.0.7": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[8] || '' : '',
        "last 1.0.8": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[9] || '' : '',
        "last 1.0.9": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[10] || '' : '',
        "last 1.0.10": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[11] || '' : '',
        "last 1.0.11": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[12] || '' : '',
        "last 1.0.12": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[13] || '' : '',
        "last 1.0.13": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[14] || '' : '',
        "last 1.0.14": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[15] || '' : '',
        "last 1.0.15": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[16] || '' : '',
        "last 1.0.16": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[17] || '' : '',
        "last 1.0.17": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[18] || '' : '',
        "last 1.0.18": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["LAST NAME OR BUSINESS NAME"]?.[19] || '' : '',

        "first name": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[0] || '' : '',
        "first.0": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[1] || '' : '',
        "first.1": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[2] || '' : '',
        "first.2": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[3] || '' : '',
        "first.3": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[4] || '' : '',
        "first.4": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[5] || '' : '',
        "first.5": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[6] || '' : '',
        "first.6": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[7] || '' : '',
        "first.7": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["FIRST"]?.[8] || '' : '',

        "initial": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["INITIAL"]?.[0] || '' : '',

        "Driver license": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[0] || '' : '',
        "Driver license digits.0": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[1] || '' : '',
        "Driver license digits.1": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[2] || '' : '',
        "Driver license digits.2": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[3] || '' : '',
        "Driver license digits.3": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[4] || '' : '',
        "Driver license digits.4": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[5] || '' : '',
        "Driver license digits.5": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[6] || '' : '',
        "Driver license digits.6": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[7] || '' : '',

        "birth date.0": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[0] || '' : '',
        "birth date.1": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[1] || '' : '',
        "birth date.2": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[3] || '' : '',
        "birth date.3": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[4] || '' : '',
        "birth date.4": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[6] || '' : '',
        "birth date.5": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[7] || '' : '',
        "birth date.6": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[8] || '' : '',
        "birth date.7": senerio?.includes("Change of Address") ? formData?.personalOrBusinessInformationData?.["BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)"]?.[9] || '' : '',

        //Pervious Residence or Business Address
        "street.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[0] || '' : '',
        "street 1.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[1] || '' : '',
        "street 1.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[2] || '' : '',
        "street 1.2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[3] || '' : '',
        "street 1.3.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[4] || '' : '',

        "street name.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[0] || '' : '',
        "street name 1.0.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[1] || '' : '',
        "street name 1.0.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[2] || '' : '',
        "street name 1.0.2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[3] || '' : '',
        "street name 1.0.3.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[4] || '' : '',
        "street name 1.0.4.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[5] || '' : '',
        "street name 1.0.5.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[6] || '' : '',
        "street name 1.0.6.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[7] || '' : '',
        "street name 1.0.7.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[8] || '' : '',
        "street name 1.0.8.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[9] || '' : '',
        "street name 1.0.9.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[10] || '' : '',
        "street name 1.0.10.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[11] || '' : '',
        "street name 1.0.11.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[12] || '' : '',
        "street name 1.0.12.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[13] || '' : '',
        "street name 1.0.13.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[14] || '' : '',
        "street name 1.0.14.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[15] || '' : '',
        "street name 1.0.15.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[16] || '' : '',
        "street name 1.0.16.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[17] || '' : '',
        "street name 1.0.17.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[18] || '' : '',
        "street name 1.0.18.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[19] || '' : '',
        "street name 1.0.19.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[20] || '' : '',
        "street name 1.0.19.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[21] || '' : '',
        "street name 1.0.20.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[22] || '' : '',
        "street name 1.0.20.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[23] || '' : '',
        "street name 1.0.20.2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[24] || '' : '',
        "street name 1.0.20.3.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[25] || '' : '',
        "street name 1.0.20.4.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[26] || '' : '',
        "street name 1.0.20.5.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[27] || '' : '',
        "street name 1.0.20.6.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[28] || '' : '',
        "street name 1.0.20.7.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[29] || '' : '',
        "street name 1.0.20.8.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[30] || '' : '',
        "street name 1.0.20.9.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[31] || '' : '',
        "street name 1.0.20.10.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[32] || '' : '',
        "street name 1.0.20.11.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[33] || '' : '',
        "street name 1.0.20.12.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[34] || '' : '',
        "street name 1.0.20.13.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[35] || '' : '',
        "street name 1.0.20.14.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[36] || '' : '',
        "street name 1.0.20.15.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[37] || '' : '',
        "street name 1.0.20.16.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[38] || '' : '',
        "street name 1.0.20.17.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[39] || '' : '',
        "street name 1.0.20.18.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[40] || '' : '',
        "street name 1.0.20.19.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[41] || '' : '',
        "street name 1.0.20.20.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[42] || '' : '',
        "street name 1.0.20.21.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.[`STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)`]?.[43] || '' : '',

        "apt number.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["APT. NO."]?.[0] || '' : '',
        "apt number.1.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["APT. NO."]?.[1] || '' : '',
        "apt number.1.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["APT. NO."]?.[2] || '' : '',
        "apt number.1.2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["APT. NO."]?.[3] || '' : '',

        "city.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[0] || '' : '',
        "city 1.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[1] || '' : '',
        "city 1.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[2] || '' : '',
        "city 1.2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[3] || '' : '',
        "city 1.3.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[4] || '' : '',
        "city 1.4.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[5] || '' : '',
        "city 1.5.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[6] || '' : '',
        "city 1.6.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[7] || '' : '',
        "city 1.7.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[8] || '' : '',
        "city 1.8.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[9] || '' : '',
        "city 1.9.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[10] || '' : '',
        "city 1.10.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[11] || '' : '',
        "city 1.11.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[12] || '' : '',
        "city 1.12.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[13] || '' : '',
        "city 1.13.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[14] || '' : '',
        "city 1.14.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[15] || '' : '',
        "city 1.15.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[16] || '' : '',
        "city 1.16.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[17] || '' : '',
        "city 1.17.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[18] || '' : '',
        "city 1.18.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[19] || '' : '',
        "city 1.19.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[20] || '' : '',
        "city 1.20.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["CITY"]?.[21] || '' : '',

        "state 1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STATE"]?.[0] || '' : '',
        "state 2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STATE"]?.[1] || '' : '',

        "zip code.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["ZIP CODE"]?.[0] || '' : '',
        "zip code.1.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["ZIP CODE"]?.[1] || '' : '',
        "zip code.1.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["ZIP CODE"]?.[2] || '' : '',
        "zip code.1.2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["ZIP CODE"]?.[3] || '' : '',
        "zip code.1.3.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["ZIP CODE"]?.[4] || '' : '',

        //new or correct residence

        "street.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[0] || '' : '',
        "street 1.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[1] || '' : '',
        "street 1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[2] || '' : '',
        "street 1.2.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[3] || '' : '',
        "street 1.3.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NUMBER"]?.[4] || '' : '',

        "street name.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[0] || '' : '',
        "street name 1.0.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[1] || '' : '',
        "street name 1.0.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[2] || '' : '',
        "street name 1.0.2.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[3] || '' : '',
        "street name 1.0.3.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[4] || '' : '',
        "street name 1.0.4.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[5] || '' : '',
        "street name 1.0.5.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[6] || '' : '',
        "street name 1.0.6.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[7] || '' : '',
        "street name 1.0.7.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[8] || '' : '',
        "street name 1.0.8.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[9] || '' : '',
        "street name 1.0.9.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[10] || '' : '',
        "street name 1.0.10.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[11] || '' : '',
        "street name 1.0.11.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[12] || '' : '',
        "street name 1.0.12.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[13] || '' : '',
        "street name 1.0.13.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[14] || '' : '',
        "street name 1.0.14.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[15] || '' : '',
        "street name 1.0.15.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[16] || '' : '',
        "street name 1.0.16.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[17] || '' : '',
        "street name 1.0.17.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[18] || '' : '',
        "street name 1.0.18.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[19] || '' : '',
        "street name 1.0.19.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[20] || '' : '',
        "street name 1.0.19.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[21] || '' : '',
        "street name 1.0.20.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[22] || '' : '',
        "street name 1.0.20.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[23] || '' : '',
        "street name 1.0.20.2.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[24] || '' : '',
        "street name 1.0.20.3.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[25] || '' : '',
        "street name 1.0.20.4.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[26] || '' : '',
        "street name 1.0.20.5.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[27] || '' : '',
        "street name 1.0.20.6.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[28] || '' : '',
        "street name 1.0.20.7.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[29] || '' : '',
        "street name 1.0.20.8.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[30] || '' : '',
        "street name 1.0.20.9.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[31] || '' : '',
        "street name 1.0.20.10.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[32] || '' : '',
        "street name 1.0.20.11.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[33] || '' : '',
        "street name 1.0.20.12.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[34] || '' : '',
        "street name 1.0.20.13.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[35] || '' : '',
        "street name 1.0.20.14.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[36] || '' : '',
        "street name 1.0.20.15.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[37] || '' : '',
        "street name 1.0.20.16.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[38] || '' : '',
        "street name 1.0.20.17.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[39] || '' : '',
        "street name 1.0.20.18.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[40] || '' : '',
        "street name 1.0.20.19.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[41] || '' : '',
        "street name 1.0.20.20.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[42] || '' : '',
        "street name 1.0.20.21.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STREET NAME"]?.[43] || '' : '',

        "apt number.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["APT. NO."]?.[0] || '' : '',
        "apt number.1.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["APT. NO."]?.[1] || '' : '',
        "apt number.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["APT. NO."]?.[2] || '' : '',
        "apt number.1.2.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["APT. NO."]?.[3] || '' : '',

        "city.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[0] || '' : '',
        "city 1.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[1] || '' : '',
        "city 1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[2] || '' : '',
        "city 1.2.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[3] || '' : '',
        "city 1.3.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[4] || '' : '',
        "city 1.4.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[5] || '' : '',
        "city 1.5.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[6] || '' : '',
        "city 1.6.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[7] || '' : '',
        "city 1.7.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[8] || '' : '',
        "city 1.8.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[9] || '' : '',
        "city 1.9.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[10] || '' : '',
        "city 1.10.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[11] || '' : '',
        "city 1.11.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[12] || '' : '',
        "city 1.12.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[13] || '' : '',
        "city 1.13.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[14] || '' : '',
        "city 1.14.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[15] || '' : '',
        "city 1.15.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[16] || '' : '',
        "city 1.16.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[17] || '' : '',
        "city 1.17.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[18] || '' : '',
        "city 1.18.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[19] || '' : '',
        "city 1.19.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[20] || '' : '',
        "city 1.20.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["CITY"]?.[21] || '' : '',

        "state 1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STATE"]?.[0] || '' : '',
        "state 2.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["STATE"]?.[1] || '' : '',

        "zip code.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["ZIP CODE"]?.[0] || '' : '',
        "zip code.1.0.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["ZIP CODE"]?.[1] || '' : '',
        "zip code.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["ZIP CODE"]?.[2] || '' : '',
        "zip code.1.2.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["ZIP CODE"]?.[3] || '' : '',
        "zip code.1.3.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["ZIP CODE"]?.[4] || '' : '',

        //new or correct mailing

        "street.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["STREET NUMBER"]?.[0] || '' : '' : '',
        "street 1.0.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["STREET NUMBER"]?.[1] || '' : '' : '',
        "street 1.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["STREET NUMBER"]?.[2] || '' : '' : '',
        "street 1.2.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["STREET NUMBER"]?.[3] || '' : '' : '',
        "street 1.3.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["STREET NUMBER"]?.[4] || '' : '' : '',

        "street name.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[0] || '' : '' : '',
        "street name 1.0.0.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[1] || '' : '' : '',
        "street name 1.0.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[2] || '' : '' : '',
        "street name 1.0.2.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[3] || '' : '' : '',
        "street name 1.0.3.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[4] || '' : '' : '',
        "street name 1.0.4.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[5] || '' : '' : '',
        "street name 1.0.5.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[6] || '' : '' : '',
        "street name 1.0.6.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[7] || '' : '' : '',
        "street name 1.0.7.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[8] || '' : '' : '',
        "street name 1.0.8.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[9] || '' : '' : '',
        "street name 1.0.9.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[10] || '' : '' : '',
        "street name 1.0.10.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[11] || '' : '' : '',
        "street name 1.0.11.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[12] || '' : '' : '',
        "street name 1.0.12.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[13] || '' : '' : '',
        "street name 1.0.13.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[14] || '' : '' : '',
        "street name 1.0.14.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[15] || '' : '' : '',
        "street name 1.0.15.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[16] || '' : '' : '',
        "street name 1.0.16.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[17] || '' : '' : '',
        "street name 1.0.17.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[18] || '' : '' : '',
        "street name 1.0.18.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[19] || '' : '' : '',
        "street name 1.0.19.0.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[20] || '' : '' : '',
        "street name 1.0.19.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[21] || '' : '' : '',
        "street name 1.0.20.0.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[22] || '' : '' : '',
        "street name 1.0.20.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[23] || '' : '' : '',
        "street name 1.0.20.2.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[24] || '' : '' : '',
        "street name 1.0.20.3.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[25] || '' : '' : '',
        "street name 1.0.20.4.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[26] || '' : '' : '',
        "street name 1.0.20.5.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[27] || '' : '' : '',
        "street name 1.0.20.6.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[28] || '' : '' : '',
        "street name 1.0.20.7.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[29] || '' : '' : '',
        "street name 1.0.20.8.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[30] || '' : '' : '',
        "street name 1.0.20.9.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[31] || '' : '' : '',
        "street name 1.0.20.10.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[32] || '' : '' : '',
        "street name 1.0.20.11.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[33] || '' : '' : '',
        "street name 1.0.20.12.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[34] || '' : '' : '',
        "street name 1.0.20.13.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[35] || '' : '' : '',
        "street name 1.0.20.14.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[36] || '' : '' : '',
        "street name 1.0.20.15.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[37] || '' : '' : '',
        "street name 1.0.20.16.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[38] || '' : '' : '',
        "street name 1.0.20.17.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[39] || '' : '' : '',
        "street name 1.0.20.18.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[40] || '' : '' : '',
        "street name 1.0.20.19.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[41] || '' : '' : '',
        "street name 1.0.20.20.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[42] || '' : '' : '',
        "street name 1.0.20.21.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)"]?.[43] || '' : '' : '',

        "apt number.0.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["APT. NO."]?.[0] || '' : '' : '',
        "apt number.1.0.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["APT. NO."]?.[1] || '' : '' : '',
        "apt number.1.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["APT. NO."]?.[2] || '' : '' : '',
        "apt number.1.2.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["APT. NO."]?.[3] || '' : '' : '',


        "Sec10 date": senerio?.includes("Change of Address") ? getCurrentDate() : '',

        "city.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[0] || '' : '' : '',
        "city 1.0.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[1] || '' : '' : '',
        "city 1.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[2] || '' : '' : '',
        "city 1.2.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[3] || '' : '' : '',
        "city 1.3.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[4] || '' : '' : '',
        "city 1.4.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[5] || '' : '' : '',
        "city 1.5.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[6] || '' : '' : '',
        "city 1.6.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[7] || '' : '' : '',
        "city 1.7.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[8] || '' : '' : '',
        "city 1.8.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[9] || '' : '' : '',
        "city 1.9.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[10] || '' : '' : '',
        "city 1.10.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[11] || '' : '' : '',
        "city 1.11.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[12] || '' : '' : '',
        "city 1.12.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[13] || '' : '' : '',
        "city 1.13.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[14] || '' : '' : '',
        "city 1.14.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[15] || '' : '' : '',
        "city 1.15.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[16] || '' : '' : '',
        "city 1.16.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[17] || '' : '' : '',
        "city 1.17.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[18] || '' : '' : '',
        "city 1.18.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[19] || '' : '' : '',
        "city 1.19.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[20] || '' : '' : '',
        "city 1.20.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["CITY"]?.[21] || '' : '' : '',

        "state 1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["STATE"]?.[0] || '' : '' : '',
        "state 2.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["STATE"]?.[1] || '' : '' : '',

        "zip code.0.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["ZIP CODE"]?.[0] || '' : '' : '',
        "zip code.1.0.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["ZIP CODE"]?.[1] || '' : '' : '',
        "zip code.1.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["ZIP CODE"]?.[2] || '' : '' : '',
        "zip code.1.2.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["ZIP CODE"]?.[3] || '' : '' : '',
        "zip code.1.3.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["If mailing address is different"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.mailingAddress?.["ZIP CODE"]?.[4] || '' : '' : '',

        "Address Update": senerio?.includes("Change of Address") ? formData?.transactionSelections?.includes("Do not Use My New Address For Voter Registration Purposes") ? true : false : false,

        //1

        "California plate 1.0": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["plateNumber"]?.[0] || '' : '',
        "California plate 1.1": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["plateNumber"]?.[1] || '' : '',
        "California plate 1.2": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["plateNumber"]?.[2] || '' : '',
        "California plate 1.3": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["plateNumber"]?.[3] || '' : '',
        "California plate 1.4": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["plateNumber"]?.[4] || '' : '',
        "California plate 1.5": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["plateNumber"]?.[5] || '' : '',
        "California plate 1.6": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["plateNumber"]?.[6] || '' : '',
        "California plate 1.7": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["plateNumber"]?.[7] || '' : '',

        "HULL ID.0": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[0] || '' : '',
        "HULL ID.1": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[1] || '' : '',
        "HULL ID.2": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[2] || '' : '',
        "HULL ID.3": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[3] || '' : '',
        "HULL ID.4": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[4] || '' : '',
        "HULL ID.5": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[5] || '' : '',
        "HULL ID.6": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[6] || '' : '',
        "HULL ID.7": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[7] || '' : '',
        "HULL ID.8": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[8] || '' : '',
        "HULL ID.9": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[9] || '' : '',
        "HULL ID.10": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[10] || '' : '',
        "HULL ID.11": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[11] || '' : '',
        "HULL ID.12": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[12] || '' : '',
        "HULL ID.13": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[13] || '' : '',
        "HULL ID.14": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[14] || '' : '',
        "HULL ID.15": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[15] || '' : '',
        "HULL ID.16": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["vinNumber"]?.[16] || '' : '',

        "Check Box3.0": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["leased"] ? true : false : false,
        "Check Box4.0": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[0]?.["registeredOutsideCA"] ? true : false : false,

        //2

        "California plate 2.0": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["plateNumber"]?.[0] || '' : '',
        "California plate 2.1": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["plateNumber"]?.[1] || '' : '',
        "California plate 2.2": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["plateNumber"]?.[2] || '' : '',
        "California plate 2.3": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["plateNumber"]?.[3] || '' : '',
        "California plate 2.4": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["plateNumber"]?.[4] || '' : '',
        "California plate 2.5": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["plateNumber"]?.[5] || '' : '',
        "California plate 2.6": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["plateNumber"]?.[6] || '' : '',
        "California plate 2.7": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["plateNumber"]?.[7] || '' : '',

        "HULL ID 2.0": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[0] || '' : '',
        "HULL ID 2.1": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[1] || '' : '',
        "HULL ID 2.2": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[2] || '' : '',
        "HULL ID 2.3": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[3] || '' : '',
        "HULL ID 2.4": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[4] || '' : '',
        "HULL ID 2.5": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[5] || '' : '',
        "HULL ID 2.6": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[6] || '' : '',
        "HULL ID 2.7": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[7] || '' : '',
        "HULL ID 2.8": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[8] || '' : '',
        "HULL ID 2.9": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[9] || '' : '',
        "HULL ID 2.10": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[10] || '' : '',
        "HULL ID 2.11": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[11] || '' : '',
        "HULL ID 2.12": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[12] || '' : '',
        "HULL ID 2.13": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[13] || '' : '',
        "HULL ID 2.14": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[14] || '' : '',
        "HULL ID 2.15": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[15] || '' : '',
        "HULL ID 2.16": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["vinNumber"]?.[16] || '' : '',

        "Check Box3.1": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["leased"] ? true : false : false,
        "Check Box4.1": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[1]?.["registeredOutsideCA"] ? true : false : false,

        //3

        "California plate 3.0": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["plateNumber"]?.[0] || '' : '',
        "California plate 3.1": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["plateNumber"]?.[1] || '' : '',
        "California plate 3.2": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["plateNumber"]?.[2] || '' : '',
        "California plate 3.3": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["plateNumber"]?.[3] || '' : '',
        "California plate 3.4": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["plateNumber"]?.[4] || '' : '',
        "California plate 3.5": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["plateNumber"]?.[5] || '' : '',
        "California plate 3.6": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["plateNumber"]?.[6] || '' : '',
        "California plate 3.7": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["plateNumber"]?.[7] || '' : '',

        "HULL ID 3.0": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[0] || '' : '',
        "HULL ID 3.1": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[1] || '' : '',
        "HULL ID 3.2": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[2] || '' : '',
        "HULL ID 3.3": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[3] || '' : '',
        "HULL ID 3.4": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[4] || '' : '',
        "HULL ID 3.5": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[5] || '' : '',
        "HULL ID 3.6": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[6] || '' : '',
        "HULL ID 3.7": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[7] || '' : '',
        "HULL ID 3.8": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[8] || '' : '',
        "HULL ID 3.9": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[9] || '' : '',
        "HULL ID 3.10": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[10] || '' : '',
        "HULL ID 3.11": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[11] || '' : '',
        "HULL ID 3.12": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[12] || '' : '',
        "HULL ID 3.13": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[13] || '' : '',
        "HULL ID 3.14": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[14] || '' : '',
        "HULL ID 3.15": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[15] || '' : '',
        "HULL ID 3.16": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["vinNumber"]?.[16] || '' : '',

        "Check Box3.2": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["leased"] ? true : false : false,
        "Check Box4.2": senerio?.includes("Change of Address") ? formData?.vehiclesOwnedByYouData?.[2]?.["registeredOutsideCA"] ? true : false : false,

        "leasing co.0": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[0] || '' : '' : '',
        "leasing co.1": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[1] || '' : '' : '',
        "leasing co.2": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[2] || '' : '' : '',
        "leasing co.3": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[3] || '' : '' : '',
        "leasing co.4": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[4] || '' : '' : '',
        "leasing co.5": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[5] || '' : '' : '',
        "leasing co.6": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[6] || '' : '' : '',
        "leasing co.7": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[7] || '' : '' : '',
        "leasing co.8": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[8] || '' : '' : '',
        "leasing co.9": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[9] || '' : '' : '',
        "leasing co.10": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[10] || '' : '' : '',
        "leasing co.11": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[11] || '' : '' : '',
        "leasing co.12": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[12] || '' : '' : '',
        "leasing co.13": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[13] || '' : '' : '',
        "leasing co.14": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[14] || '' : '' : '',
        "leasing co.15": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[15] || '' : '' : '',
        "leasing co.16": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[16] || '' : '' : '',
        "leasing co.17": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[17] || '' : '' : '',
        "leasing co.18": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[18] || '' : '' : '',
        "leasing co.19": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[19] || '' : '' : '',
        "leasing co.20": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[20] || '' : '' : '',
        "leasing co.21": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Leased Vehicle") ? formData?.leasaedCompanyName?.[21] || '' : '' : '',

        //location

        "street.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NUMBER"]?.[0] || '' : '' : '',
        "street 1.0.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NUMBER"]?.[1] || '' : '' : '',
        "street 1.1.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NUMBER"]?.[2] || '' : '' : '',
        "street 1.2.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NUMBER"]?.[3] || '' : '' : '',
        "street 1.3.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NUMBER"]?.[4] || '' : '' : '',

        "street name.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[0] || '' : '' : '',
        "street name 1.0.0.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[1] || '' : '' : '',
        "street name 1.0.1.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[2] || '' : '' : '',
        "street name 1.0.2.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[3] || '' : '' : '',
        "street name 1.0.3.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[4] || '' : '' : '',
        "street name 1.0.4.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[5] || '' : '' : '',
        "street name 1.0.5.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[6] || '' : '' : '',
        "street name 1.0.6.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[7] || '' : '' : '',
        "street name 1.0.7.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[8] || '' : '' : '',
        "street name 1.0.8.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[9] || '' : '' : '',
        "street name 1.0.9.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[10] || '' : '' : '',
        "street name 1.0.10.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[11] || '' : '' : '',
        "street name 1.0.11.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[12] || '' : '' : '',
        "street name 1.0.12.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[13] || '' : '' : '',
        "street name 1.0.13.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[14] || '' : '' : '',
        "street name 1.0.14.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[15] || '' : '' : '',
        "street name 1.0.15.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[16] || '' : '' : '',
        "street name 1.0.16.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[17] || '' : '' : '',
        "street name 1.0.17.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[18] || '' : '' : '',
        "street name 1.0.18.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[19] || '' : '' : '',
        "street name 1.0.19.0.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[20] || '' : '' : '',
        "street name 1.0.19.1.1.1.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["STREET NAME"]?.[21] || '' : '' : '',

        "city.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[0] || '' : '' : '',
        "city 1.0.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[1] || '' : '' : '',
        "city 1.1.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[2] || '' : '' : '',
        "city 1.2.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[3] || '' : '' : '',
        "city 1.3.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[4] || '' : '' : '',
        "city 1.4.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[5] || '' : '' : '',
        "city 1.5.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[6] || '' : '' : '',
        "city 1.6.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[7] || '' : '' : '',
        "city 1.7.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[8] || '' : '' : '',
        "city 1.8.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[9] || '' : '' : '',
        "city 1.9.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[10] || '' : '' : '',
        "city 1.10.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[11] || '' : '' : '',
        "city 1.11.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[12] || '' : '' : '',
        "city 1.12.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[13] || '' : '' : '',
        "city 1.13.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[14] || '' : '' : '',
        "city 1.14.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[15] || '' : '' : '',
        "city 1.15.1.1.1.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["CITY"]?.[16] || '' : '' : '',

        "county.0": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[0] || '' : '' : '',
        "county.1": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[1] || '' : '' : '',
        "county.2": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[2] || '' : '' : '',
        "county.3": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[3] || '' : '' : '',
        "county.4": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[4] || '' : '' : '',
        "county.5": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[5] || '' : '' : '',
        "county.6": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[6] || '' : '' : '',
        "county.7": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[7] || '' : '' : '',
        "county.8": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[8] || '' : '' : '',
        "county.9": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[9] || '' : '' : '',
        "county.10": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[10] || '' : '' : '',
        "county.11": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[11] || '' : '' : '',
        "county.12": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[12] || '' : '' : '',
        "county.13": senerio?.includes("Change of Address") ? formData?.newOrCorrectResidenceOrBusinessAddressData?.["Location of Trailer Coach or Vessel"] ? formData?.newOrCorrectResidenceOrBusinessAddressData?.locationAddress?.["COUNTY - DO NOT ABBREVIATE"]?.[13] || '' : '' : '',

        "Check Box19": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedTo === "Automobile" ? true : false : false : false,
        "Text25": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? (formData?.personalizePlatesState === "Exchange" || formData?.selectConfigState?.assignedFor === "Sequential") ? formData?.selectConfigState?.licensePlateNumber || '' : "" : "" : "",
        "Text26": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? (formData?.personalizePlatesState === "Exchange" || formData?.selectConfigState?.assignedFor === "Sequential") ? formData?.selectConfigState?.vehicleIdentificationNumber || '' : "" : "" : "",
        "Text27": senerio?.includes("Personalized Plates") ? (formData?.personalizePlatesState === "Order" || formData?.personalizePlatesState === "Exchange") ? formData?.selectConfigState?.assignedFor !== "" ? formData?.selectConfigState?.location || '' : "" : "" : "",
        "Text28": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Replace") ? formData?.replacementState?.plateNumber || '' : "" : "",
        "Check Box29": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Replace") ? formData?.replacementState?.need === "onePlate" ? true : false : false : false,
        "Check Box30": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Replace") ? formData?.replacementState?.need === "twoPlates" ? true : false : false : false,
        ////--reg 343 sec1 commercial vehicle
        "Check Box31": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Replace") ? formData?.replacementState?.plateCondition === "lost" ? true : false : false : senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["Hire Transport"] === "Yes" : false,
        "Check Box34": senerio?.includes("Personalized Plates") ? formData?.platesSelectionState.selectedPlate === 'Breast Cancer Awareness' ? true : false : formData.transactionSelections?.includes("Out of State Title") ? true : senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["Hire Transport"] === "No" : false,
        "Check Box36": formData.transactionSelections?.includes("Out of State Title") ? true : senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["GVWR"] === "No" ? true : false : false,
        "Check Box35": formData?.commercialInfo?.["GVWR"] === "No" ? false : true,


        "Check Box32": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Replace") ? formData?.replacementState?.plateCondition === "mutilated" ? true : false : false : false,
        "Check Box33": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Replace") ? formData?.replacementState?.plateCondition === "stolen" ? true : false : false : false,
        "Text56": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Reassign") ? formData?.specialInterestState?.specialInterestLicensePlateNumber || '' : "" : "",
        "Text57": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Reassign") ? formData?.specialInterestState?.removedFrom || '' : "" : "",
        "Text58": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Reassign") ? formData?.specialInterestState?.licensePlatePlacedOn || '' : "" : "",
        "Text59": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Reassign") ? formData?.specialInterestState?.vinPlacedOn || '' : "" : "",
        "Check Box60": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Reassign") ? formData?.specialInterestState?.releaseInterest === "RETAIN INTEREST FOR FUTURE USE" ? true : false : false : false,
        "Check Box61": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Reassign") ? formData?.specialInterestState?.releaseInterest === "RETAIN INTEREST FOR FUTURE USE" ? formData?.specialInterestState?.feeEnclosed ? true : false : false : false : false,
        "Check Box62": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Reassign") ? formData?.specialInterestState?.releaseInterest === "RELEASE INTEREST/SURRENDER TO DMV" ? true : false : false : false,
        "Check Box63": senerio?.includes("Personalized Plates") ? formData?.personalizePlatesState?.includes("Reassign") ? formData?.specialInterestState?.releaseInterest === "RELEASE INTEREST TO NEW OWNER" ? true : false : false : false,

        "Check Box79": senerio?.includes("Personalized Plates") ? formData?.platePurchaseState?.ifPlateOwnerIsDifferent === false ? true : false : false,


        //with title 
        // "VIN_title": isTitleAvailable ? formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "" : "",
        // 'year_model': formData.vehicleInfoState?.['Year of Vehicle'] || "",
        // 'make_title': formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || "",
        // 'plate_number': formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        // 'motorcycle_number': formData.vehicleInfoState?.['Motorcycle Engine Number'] || '',
        // "odometer_reading": formData.vehicleInfoState?.['Mileage of Vehicle'] || '',

        // "reg_owner_1": (formData.ownerCount ?? 0) > 0 ? owner1 : '',
        // "reg_owner_2": (formData.ownerCount ?? 0) > 1 ? owner2 : '',
        // "reg_owner_3": (formData.ownerCount ?? 0) > 2 ? owner3 : '',

        // "date_1a": (formData.ownerCount ?? 0) > 0 ? getCurrentDate() : '',
        // "date_1b": (formData.ownerCount ?? 0) > 1 ? getCurrentDate() : '',

        // "odometer_read_1": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[5] || "",
        // "odometer_read_2": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[4] || "",
        // "odometer_read_3": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[3] || "",
        // "odometer_read_4": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[2] || "",
        // "odometer_read_5": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[1] || "",
        // "odometer_read_6": reversedOdoMeter?.replace(/\D/g, "").slice(0, 6).split('')[0] || "",

        //true full name new reg owner
        "true_full_name_1": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[0] : '' : "",
        "true_full_name_2": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[1] : '' : "",
        "true_full_name_3": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[2] : '' : "",
        "true_full_name_4": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[3] : '' : "",
        "true_full_name_5": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[4] : '' : "",
        "true_full_name_6": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[5] : '' : "",
        "true_full_name_7": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[6] : '' : "",
        "true_full_name_8": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[7] : '' : "",
        "true_full_name_9": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[8] : '' : "",
        "true_full_name_10": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[9] : '' : "",
        "true_full_name_11": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[10] : '' : "",
        "true_full_name_12": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[11] : '' : "",
        "true_full_name_13": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[12] : '' : "",
        "true_full_name_14": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[13] : '' : "",
        "true_full_name_15": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[14] : '' : "",
        "true_full_name_16": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[15] : '' : "",
        "true_full_name_17": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[16] : '' : "",
        "true_full_name_18": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[17] : '' : "",
        "true_full_name_19": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[18] : '' : "",
        "true_full_name_20": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[19] : '' : "",
        "true_full_name_21": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[20] : '' : "",
        "true_full_name_22": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[21] : '' : "",
        "true_full_name_23": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[22] : '' : "",
        "true_full_name_24": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[23] : '' : "",
        "true_full_name_25": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[24] : '' : "",
        "true_full_name_26": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[25] : '' : "",
        "true_full_name_27": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[0])?.[26] : '' : "",

        //true full name new reg owner
        "true_full_name_28": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[0] : '' : "",
        "true_full_name_29": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[1] : '' : "",
        "true_full_name_30": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[2] : '' : "",
        "true_full_name_31": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[3] : '' : "",
        "true_full_name_32": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[4] : '' : "",
        "true_full_name_33": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[5] : '' : "",
        "true_full_name_34": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[6] : '' : "",
        "true_full_name_35": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[7] : '' : "",
        "true_full_name_36": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[8] : '' : "",
        "true_full_name_37": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[9] : '' : "",
        "true_full_name_38": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[10] : '' : "",
        "true_full_name_39": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[11] : '' : "",
        "true_full_name_40": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[12] : '' : "",
        "true_full_name_41": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[13] : '' : "",
        "true_full_name_42": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[14] : '' : "",
        "true_full_name_43": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[15] : '' : "",
        "true_full_name_44": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[16] : '' : "",
        "true_full_name_45": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[17] : '' : "",
        "true_full_name_46": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[18] : '' : "",
        "true_full_name_47": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[19] : '' : "",
        "true_full_name_48": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[20] : '' : "",
        "true_full_name_49": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[21] : '' : "",
        "true_full_name_50": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[22] : '' : "",
        "true_full_name_51": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[23] : '' : "",
        "true_full_name_52": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[24] : '' : "",
        "true_full_name_53": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[25] : '' : "",
        "true_full_name_54": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1])?.[26] : '' : "",

        //
        "cb_and": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnershipTypes?.[1] === 'and' ? true : false : false : false,
        "cb_or": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnershipTypes?.[1] === 'or' ? true : false : false : false,

        //address
        "residence_add_1": isTitleAvailable ? formData.newOwnerAddress?.Street?.[0] || '' : "",
        "residence_add_2": isTitleAvailable ? formData.newOwnerAddress?.Street?.[1] || '' : "",
        "residence_add_3": isTitleAvailable ? formData.newOwnerAddress?.Street?.[2] || '' : "",
        "residence_add_4": isTitleAvailable ? formData.newOwnerAddress?.Street?.[3] || '' : "",
        "residence_add_5": isTitleAvailable ? formData.newOwnerAddress?.Street?.[4] || '' : "",
        "residence_add_6": isTitleAvailable ? formData.newOwnerAddress?.Street?.[5] || '' : "",
        "residence_add_7": isTitleAvailable ? formData.newOwnerAddress?.Street?.[6] || '' : "",
        "residence_add_8": isTitleAvailable ? formData.newOwnerAddress?.Street?.[7] || '' : "",
        "residence_add_9": isTitleAvailable ? formData.newOwnerAddress?.Street?.[8] || '' : "",
        "residence_add_10": isTitleAvailable ? formData.newOwnerAddress?.Street?.[9] || '' : "",
        "residence_add_11": isTitleAvailable ? formData.newOwnerAddress?.Street?.[10] || '' : "",
        "residence_add_12": isTitleAvailable ? formData.newOwnerAddress?.Street?.[11] || '' : "",
        "residence_add_13": isTitleAvailable ? formData.newOwnerAddress?.Street?.[12] || '' : "",
        "residence_add_14": isTitleAvailable ? formData.newOwnerAddress?.Street?.[13] || '' : "",
        "residence_add_15": isTitleAvailable ? formData.newOwnerAddress?.Street?.[14] || '' : "",
        "residence_add_16": isTitleAvailable ? formData.newOwnerAddress?.Street?.[15] || '' : "",
        "residence_add_17": isTitleAvailable ? formData.newOwnerAddress?.Street?.[16] || '' : "",
        "residence_add_18": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[0] || '' : '',
        "residence_add_19": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[1] || '' : "",
        "residence_add_20": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[2] || '' : "",
        "residence_add_21": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[3] || '' : "",
        "residence_add_22": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[4] || '' : "",
        "residence_add_23": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[5] || '' : "",
        "residence_add_24": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[6] || '' : "",
        "residence_add_25": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[7] || '' : "",
        "residence_add_26": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[8] || '' : "",
        "residence_add_27": isTitleAvailable ? formData.newOwnerAddress?.["APT./SPACE/STE.#"]?.[9] || '' : "",

        "city_1": isTitleAvailable ? formData.newOwnerAddress?.City?.[0] || '' : "",
        "city_2": isTitleAvailable ? formData.newOwnerAddress?.City?.[1] || '' : "",
        "city_3": isTitleAvailable ? formData.newOwnerAddress?.City?.[2] || '' : "",
        "city_4": isTitleAvailable ? formData.newOwnerAddress?.City?.[3] || '' : "",
        "city_5": isTitleAvailable ? formData.newOwnerAddress?.City?.[4] || '' : "",
        "city_6": isTitleAvailable ? formData.newOwnerAddress?.City?.[5] || '' : "",
        "city_7": isTitleAvailable ? formData.newOwnerAddress?.City?.[6] || '' : "",
        "city_8": isTitleAvailable ? formData.newOwnerAddress?.City?.[7] || '' : "",
        "city_9": isTitleAvailable ? formData.newOwnerAddress?.City?.[8] || '' : "",
        "city_10": isTitleAvailable ? formData.newOwnerAddress?.City?.[9] || '' : "",
        "city_11": isTitleAvailable ? formData.newOwnerAddress?.City?.[10] || '' : "",
        "city_12": isTitleAvailable ? formData.newOwnerAddress?.City?.[11] || '' : "",
        "city_13": isTitleAvailable ? formData.newOwnerAddress?.City?.[12] || '' : "",
        "city_14": isTitleAvailable ? formData.newOwnerAddress?.City?.[13] || '' : "",
        "city_15": isTitleAvailable ? formData.newOwnerAddress?.City?.[14] || '' : "",
        "city_16": isTitleAvailable ? formData.newOwnerAddress?.City?.[15] || '' : "",
        "city_17": isTitleAvailable ? formData.newOwnerAddress?.City?.[16] || '' : "",
        "city_18": isTitleAvailable ? formData.newOwnerAddress?.City?.[17] || '' : "",
        "city_19": isTitleAvailable ? formData.newOwnerAddress?.City?.[18] || '' : "",
        "city_20": isTitleAvailable ? formData.newOwnerAddress?.City?.[19] || '' : "",

        "state_1": isTitleAvailable ? formData.newOwnerAddress?.State?.[0] || '' : "",
        "state_2": isTitleAvailable ? formData.newOwnerAddress?.State?.[1] || '' : "",

        "zip_1": isTitleAvailable ? formData.newOwnerAddress?.["ZIP Code"]?.[0] || '' : "",
        "zip_2": isTitleAvailable ? formData.newOwnerAddress?.["ZIP Code"]?.[1] || '' : "",
        "zip_3": isTitleAvailable ? formData.newOwnerAddress?.["ZIP Code"]?.[2] || '' : "",
        "zip_4": isTitleAvailable ? formData.newOwnerAddress?.["ZIP Code"]?.[3] || '' : "",
        "zip_5": isTitleAvailable ? formData.newOwnerAddress?.["ZIP Code"]?.[4] || '' : "",

        "county_1": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[0] : formData.newOwnerAddress?.County?.[0] || '' : "",
        "county_2": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[1] : formData.newOwnerAddress?.County?.[1] || '' : "",
        "county_3": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[2] : formData.newOwnerAddress?.County?.[2] || '' : "",
        "county_4": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[3] : formData.newOwnerAddress?.County?.[3] || '' : "",
        "county_5": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[4] : formData.newOwnerAddress?.County?.[4] || '' : "",
        "county_6": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[5] : formData.newOwnerAddress?.County?.[5] || '' : "",
        "county_7": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[6] : formData.newOwnerAddress?.County?.[6] || '' : "",
        "county_8": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[7] : formData.newOwnerAddress?.County?.[7] || '' : "",
        "county_9": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[8] : formData.newOwnerAddress?.County?.[8] || '' : "",
        "county_10": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[9] : formData.newOwnerAddress?.County?.[9] || '' : "",
        "county_11": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[10] : formData.newOwnerAddress?.County?.[10] || '' : "",
        "county_12": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[11] : formData.newOwnerAddress?.County?.[11] || '' : "",
        "county_13": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[12] : formData.newOwnerAddress?.County?.[12] || '' : "",
        "county_14": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[13] : formData.newOwnerAddress?.County?.[13] || '' : "",
        "county_15": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[14] : formData.newOwnerAddress?.County?.[14] || '' : "",
        "county_16": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[15] : formData.newOwnerAddress?.County?.[15] || '' : "",
        "county_17": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[16] : formData.newOwnerAddress?.County?.[16] || '' : "",
        "county_18": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[17] : formData.newOwnerAddress?.County?.[17] || '' : "",
        "county_19": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[18] : formData.newOwnerAddress?.County?.[18] || '' : "",
        "county_20": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[19] : formData.newOwnerAddress?.County?.[19] || '' : "",
        "county_21": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[20] : formData.newOwnerAddress?.County?.[20] || '' : "",
        "county_22": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[21] : formData.newOwnerAddress?.County?.[21] || '' : "",
        "county_23": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[22] : formData.newOwnerAddress?.County?.[22] || '' : "",
        "county_24": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[23] : formData.newOwnerAddress?.County?.[23] || '' : "",
        "county_25": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[24] : formData.newOwnerAddress?.County?.[24] || '' : "",
        "county_26": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[25] : formData.newOwnerAddress?.County?.[25] || '' : "",
        "county_27": isTitleAvailable ? formData.selectedRadio?.includes("trailer/vessel-location") ? formData.newOwnerKeptAddress?.County?.[26] : formData.newOwnerAddress?.County?.[26] || '' : "",

        "mailing_1": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[0] || "" : '' : "",
        "mailing_2": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[1] || "" : '' : "",
        "mailing_3": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[2] || "" : '' : "",
        "mailing_4": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[3] || "" : '' : "",
        "mailing_5": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[4] || "" : '' : "",
        "mailing_6": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[5] || "" : '' : "",
        "mailing_7": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[6] || "" : '' : "",
        "mailing_8": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[7] || "" : '' : "",
        "mailing_9": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[8] || "" : '' : "",
        "mailing_10": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[9] || "" : '' : "",
        "mailing_11": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[10] || "" : '' : "",
        "mailing_12": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[11] || "" : '' : "",
        "mailing_13": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[12] || "" : '' : "",
        "mailing_14": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[13] || "" : '' : "",
        "mailing_15": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[14] || "" : '' : "",
        "mailing_16": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[15] || "" : '' : "",
        "mailing_17": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[16] || "" : '' : "",
        "mailing_18": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[17] || "" : '' : "",
        "mailing_19": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[18] || "" : '' : "",
        "mailing_20": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[19] || "" : '' : "",
        "mailing_21": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[20] || "" : '' : "",
        "mailing_22": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[21] || "" : '' : "",
        "mailing_23": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[22] || "" : '' : "",
        "mailing_24": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[23] || "" : '' : "",
        "mailing_25": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[24] || "" : '' : "",
        "mailing_26": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[25] || "" : '' : "",
        "mailing_27": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? newOwnerAddressCombine?.[26] || "" : '' : "",

        "city_21": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[0] || "" : '' : "",
        "city_22": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[1] || "" : '' : "",
        "city_23": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[2] || "" : '' : "",
        "city_24": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[3] || "" : '' : "",
        "city_25": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[4] || "" : '' : "",
        "city_26": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[5] || "" : '' : "",
        "city_27": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[6] || "" : '' : "",
        "city_28": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[7] || "" : '' : "",
        "city_29": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[8] || "" : '' : "",
        "city_30": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[9] || "" : '' : "",
        "city_31": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[10] || "" : '' : "",
        "city_32": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[11] || "" : '' : "",
        "city_33": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[12] || "" : '' : "",
        "city_34": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[13] || "" : '' : "",
        "city_35": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[14] || "" : '' : "",
        "city_36": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[15] || "" : '' : "",
        "city_37": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[16] || "" : '' : "",
        "city_38": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[17] || "" : '' : "",
        "city_39": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[18] || "" : '' : "",
        "city_40": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.City?.[19] || "" : '' : "",

        "state_3": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.State?.[0] || "" : '' : "",
        "state_4": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.State?.[1] || "" : '' : "",

        "zip_6": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.["ZIP Code"]?.[0] || "" : '' : "",
        "zip_7": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.["ZIP Code"]?.[1] || "" : '' : "",
        "zip_8": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.["ZIP Code"]?.[2] || "" : '' : "",
        "zip_9": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.["ZIP Code"]?.[3] || "" : '' : "",
        "zip_10": isTitleAvailable ? formData.selectedRadio?.includes("if-mailing-address-is-different") ? formData.newOwnerMailingAddress?.["ZIP Code"]?.[4] || "" : '' : "",

        "date_title_9a": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? getCurrentDate() : "" : "",
        "date_title_9b": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? getCurrentDate() : "" : "",

        "dl/idcardno_1": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Driver License Number"]?.[0] : '' : "",
        "dl/idcardno_2": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Driver License Number"]?.[1] : '' : "",
        "dl/idcardno_3": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Driver License Number"]?.[2] : '' : "",
        "dl/idcardno_4": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Driver License Number"]?.[3] : '' : "",
        "dl/idcardno_5": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Driver License Number"]?.[4] : '' : "",
        "dl/idcardno_6": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Driver License Number"]?.[5] : '' : "",
        "dl/idcardno_7": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Driver License Number"]?.[6] : '' : "",
        "dl/idcardno_8": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Driver License Number"]?.[7] : '' : "",

        // "purchase_date": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Purchase Price/Value"] : '' : "",

        "dl/idcardno_9": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.["Driver License Number"]?.[0] : '' : "",
        "dl/idcardno_10": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.["Driver License Number"]?.[1] : '' : "",
        "dl/idcardno_11": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.["Driver License Number"]?.[2] : '' : "",
        "dl/idcardno_12": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.["Driver License Number"]?.[3] : '' : "",
        "dl/idcardno_13": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.["Driver License Number"]?.[4] : '' : "",
        "dl/idcardno_14": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.["Driver License Number"]?.[5] : '' : "",
        "dl/idcardno_15": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.["Driver License Number"]?.[6] : '' : "",
        "dl/idcardno_16": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.["Driver License Number"]?.[7] : '' : "",

        "purchase_date": isTitleAvailable ? (formData.newOwnerCount ?? 0) > 0 ? formData.ownersData?.[0]?.["Date of Sale"] : '' : "",
        "purchase_price": isTitleAvailable ? (formData.transactionSelections?.includes("Vehicle is a Gift") ? ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Gift Value"] : '') : ((formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.["Purchase Price/Value"] : '')) : ((formData.newOwnerCount ?? 0) > 0 ? '' : ''),

        "lienholder_2.1": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[0] : '' : "",
        "lienholder_2.2": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[1] : '' : "",
        "lienholder_2.3": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[2] : '' : "",
        "lienholder_2.4": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[3] : '' : "",
        "lienholder_2.5": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[4] : '' : "",
        "lienholder_2.6": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[5] : '' : "",
        "lienholder_2.7": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[6] : '' : "",
        "lienholder_2.8": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[7] : '' : "",
        "lienholder_2.9": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[8] : '' : "",
        "lienholder_4.1": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[9] : '' : "",
        "lienholder_3.0": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[10] : '' : "",
        "lienholder_3.1": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[11] : '' : "",
        "lienholder_3.2": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[12] : '' : "",
        "lienholder_3.3": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[13] : '' : "",
        "lienholder_3.4": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[14] : '' : "",
        "lienholder_3.5": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[15] : '' : "",
        "lienholder_4.2": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[16] : '' : "",
        "lienholder_3.6": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[17] : '' : "",
        "lienholder_3.7": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[18] : '' : "",
        "lienholder_3.8": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[19] : '' : "",
        "lienholder_3.9": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[20] : '' : "",
        "lienholder_4.0": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["True Full Name or Bank/Finance Company or Individual"]?.[21] : '' : "",

        "elt#_title_1": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["ELT Number (3 digits)"]?.[0] : '' : "",
        "elt#_title_2": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["ELT Number (3 digits)"]?.[1] : '' : "",
        "elt#_title_3": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["ELT Number (3 digits)"]?.[2] : '' : "",

        "lien_add_1": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[0] : '' : "",
        "lien_add_2": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[1] : '' : "",
        "lien_add_3": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[2] : '' : "",
        "lien_add_4": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[3] : '' : "",
        "lien_add_5": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[4] : '' : "",
        "lien_add_6": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[5] : '' : "",
        "lien_add_7": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[6] : '' : "",
        "lien_add_8": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[7] : '' : "",
        "lien_add_9": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[8] : '' : "",
        "lien_add_10": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[9] : '' : "",
        "lien_add_11": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[10] : '' : "",
        "lien_add_12": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[11] : '' : "",
        "lien_add_13": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[12] : '' : "",
        "lien_add_14": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[13] : '' : "",
        "lien_add_15": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[14] : '' : "",
        "lien_add_16": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[15] : '' : "",
        "lien_add_17": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[16] : '' : "",
        "lien_add_18": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[17] : '' : "",
        "lien_add_19": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[18] : '' : "",
        "lien_add_20": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[19] : '' : "",
        "lien_add_21": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[20] : '' : "",
        "lien_add_22": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[21] : '' : "",
        "lien_add_23": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[22] : '' : "",
        "lien_add_24": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[23] : '' : "",
        "lien_add_25": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[24] : '' : "",
        "lien_add_26": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[25] : '' : "",
        "lien_add_27": isTitleAvailable ? senerio?.includes("Add Lienholder") ? newLienholderAddressCombine?.[26] : '' : "",

        "city_41": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[0] : '' : "",
        "city_42": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[1] : '' : "",
        "city_43": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[2] : '' : "",
        "city_44": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[3] : '' : "",
        "city_45": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[4] : '' : "",
        "city_46": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[5] : '' : "",
        "city_47": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[6] : '' : "",
        "city_48": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[7] : '' : "",
        "city_49": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[8] : '' : "",
        "city_50": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[9] : '' : "",
        "city_51": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[10] : '' : "",
        "city_52": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[11] : '' : "",
        "city_53": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[12] : '' : "",
        "city_54": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[13] : '' : "",
        "city_55": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[14] : '' : "",
        "city_56": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[15] : '' : "",
        "city_57": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[16] : '' : "",
        "city_58": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[17] : '' : "",
        "city_59": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[18] : '' : "",
        "city_60": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["City"]?.[19] : '' : "",

        "state_5": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["State"]?.[0] : '' : "",
        "state_6": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["State"]?.[1] : '' : "",

        "zip_11": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["ZIP Code"]?.[0] : '' : "",
        "zip_12": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["ZIP Code"]?.[1] : '' : "",
        "zip_13": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["ZIP Code"]?.[2] : '' : "",
        "zip_14": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["ZIP Code"]?.[3] : '' : "",
        "zip_15": isTitleAvailable ? senerio?.includes("Add Lienholder") ? formData.newLienholder?.["address"]?.["ZIP Code"]?.[4] : '' : "",

        //dmv 14
        "S8b No": true,
        //not a us citizen
        "S8a Yes": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Not a United State Citizen") ? false : true : false,
        "S8a No": senerio?.includes("Change of Address") ? formData.transactionSelections?.includes("Not a United State Citizen") ? true : false : false,
    };
};



const mergeFilledPDFs = async (
    formTypes: string[],
    formData: FormData,
    senerio: string,
    plainPdf?: boolean,
): Promise<Uint8Array> => {
    const mergedPdf = await PDFDocument.create();
    const excludingForAutoFontSize = ["Make -1.0", "Make -1.1"];
    for (const type of formTypes) {
        const isPlain = plainPdf || (type === 'title' || type === 'DMVREG262new' && (senerio?.includes("Simple Transfer") || senerio?.includes("Multiple Transfer")));
        const pdfUrl = `/${isPlain ? "plain pdf" : 'pdfs'}/${type}.pdf`;
        const res = await fetch(pdfUrl);
        console.log(isPlain);



        if (!res.ok) {
            console.error(`❌ Failed to fetch PDF: ${pdfUrl}`);
            continue;
        }

        const pdfBytes = await res.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);

        try {
            const form = pdfDoc.getForm();
            const fields = form.getFields();

            const fieldMapping = buildFieldMapping(formData, senerio);

            // Fill fields
            fields?.forEach((field: PDFField) => {
                const name = field.getName();
                const value = fieldMapping[name];
                // console.log(name, value);

                try {
                    if (field instanceof PDFTextField) {
                        const strValue = (value !== undefined && value !== null) ? String(value) : '';

                        // Remove the character limit constraint from the PDF field itself
                        field.setMaxLength(undefined);

                        field.setText(strValue);
                        if (!excludingForAutoFontSize.includes(name)) {
                            field.setFontSize(11);
                        }
                    } else if (field instanceof PDFCheckBox) {
                        if (value === true || value === 'true') {
                            field.check();
                        } else {
                            field.uncheck();
                        }
                    }
                } catch (e: any) {
                    console.warn(`Could not fill field ${name} with value "${value}":`, e.message);
                }
            });

            // Make fields read-only
            fields?.forEach((field: PDFField) => {
                try {
                    if (typeof (field as any).enableReadOnly === 'function') {
                        (field as any).enableReadOnly();
                    }
                } catch (e: any) {
                    console.warn(`Could not set read-only for field ${field.getName()}:`, e.message);
                }
            });

        } catch (err: any) {
            console.warn(`Error processing form in ${type}:`, err.message);
        }

        const finalBytes = await pdfDoc.save();
        const loadedFilledPdf = await PDFDocument.load(finalBytes);
        const pages = await mergedPdf.copyPages(loadedFilledPdf, loadedFilledPdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
    }

    return await mergedPdf.save();
};


export async function generateMultiple262AndOne227(
    multipleFormDataList: FormData[],
    openInNewTab = true,
    senerio = "Simple Transfer"
): Promise<Uint8Array | null> {
    if (!Array.isArray(multipleFormDataList) || multipleFormDataList.length === 0) {
        console.warn("No transfer data provided.");
        return null;
    }

    try {
        // 1️⃣ Build DMVREG262new for each transfer (print-only mode)
        const allFormBytes: Uint8Array[] = [];
        for (const transferData of multipleFormDataList) {
            const bytes = await mergeFilledPDFs(
                ["DMVREG262new"],
                transferData,
                "Simple Transfer",
                false // print-only for 262
            );
            if (bytes) allFormBytes.push(bytes);
        }

        // 2️⃣ Prepare Reg227 / Reg343 / Title using first seller + last buyer
        const first = multipleFormDataList[0];
        const last = multipleFormDataList[multipleFormDataList.length - 1];

        const wantsTitle =
            first.transactionSelections?.includes("Transaction with Vehicle Title") ||
            first.transactionSelections?.includes("With Title");

        const combinedTransferData: FormData = {
            ...first,
            newOwnerCount: last.newOwnerCount,
            newOwnerData: last.newOwnerData,
            newOwnerAddress: last.newOwnerAddress,
            newOwnerMailingAddress: last.newOwnerMailingAddress,
            newOwnerLesseeAddress: last.newOwnerLesseeAddress,
            newOwnerKeptAddress: last.newOwnerKeptAddress,
            newOwnershipTypes: last.newOwnershipTypes,
            missingReason: last.missingReason,
            typeOfVehicleSelection: last.typeOfVehicleSelection,
            dateValues: last.dateValues,
            vehicleStatusInfoData: last.vehicleStatusInfoData,
            vehiclePurchaseInfo: last.vehiclePurchaseInfo,
            outOfStateVehicle: last.outOfStateVehicle,

            //! Add the date of sale from the last transfer
            ownersData: [{ ...first.ownersData?.[0], 'Date of Sale': last.ownersData?.[0]?.['Date of Sale'] || first.ownersData?.[0]?.['Date of Sale'] }]
        };

        // 3️⃣ Add Reg227 and/or Reg343 if required
        let hasReg227 = false;
        if (!wantsTitle) {
            const reg227Bytes = await mergeFilledPDFs(
                ["Reg227"],
                combinedTransferData,
                "Simple Transfer",
                false
            );
            if (reg227Bytes) {
                allFormBytes.push(reg227Bytes);
                hasReg227 = true;
            }
        }

        if (first.transactionSelections?.includes("Out of State Title")) {
            const reg343Bytes = await mergeFilledPDFs(
                ["Reg343"],
                combinedTransferData,
                "Simple Transfer",
                false
            );
            if (reg343Bytes) allFormBytes.push(reg343Bytes);
        }
        if (!hasReg227 && first.transactionSelections?.includes("There is a Current Lienholder")) {
            const reg227Bytes = await mergeFilledPDFs(
                ["Reg227"],
                combinedTransferData,
                "Simple Transfer",
                false
            );
            if (reg227Bytes) {
                allFormBytes.push(reg227Bytes);
                hasReg227 = true;
            }
        }

        //==> Vehicle is a Gift OR Family Transfer OR Smog Exemption: REG 256
        if (
            first.transactionSelections?.includes("Family Transfer") ||
            first.transactionSelections?.includes("Vehicle is a Gift") ||
            first.transactionSelections?.includes("Smog Exemption")
        ) {
            const Reg256Bytes = await mergeFilledPDFs(
                ["Reg256"],
                combinedTransferData,
                "Simple Transfer",
                false
            );
            if (Reg256Bytes) allFormBytes.push(Reg256Bytes);
        }

        ////* Salvage + Multiple Transfer: Reg488c
        if (senerio?.includes("Salvage")) {
            const reg488cBytes = await mergeFilledPDFs(
                ["Reg488c"],
                combinedTransferData,
                senerio,
                false
            );
            if (reg488cBytes) allFormBytes.push(reg488cBytes);
        }

        ////* Commercial + Multiple Transfer: Reg590
        if (first.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)")) {
            const reg590Bytes = await mergeFilledPDFs(
                ["Reg590"],
                combinedTransferData,
                senerio,
                false
            );
            if (reg590Bytes) allFormBytes.push(reg590Bytes);
        }

        // 4️⃣ Merge all PDFs together
        const finalMergedPdf = await PDFDocument.create();
        for (const bytes of allFormBytes) {
            const doc = await PDFDocument.load(bytes);
            const pages = await finalMergedPdf.copyPages(doc, doc.getPageIndices());
            pages.forEach((p) => finalMergedPdf.addPage(p));
        }

        // Add Collections PDF if there are any collections (from the last transfer)
        const collections = last.optionsForValidation || [];
        const allOptions = getCollectionOptions(senerio);

        if (collections.length > 0 || allOptions.length > 0) {
            const collectionsPdfBytes = await generateCollectionsPDF(collections, allOptions);
            if (collectionsPdfBytes) {
                const collectionsDoc = await PDFDocument.load(collectionsPdfBytes);
                const collectionsPages = await finalMergedPdf.copyPages(collectionsDoc, collectionsDoc.getPageIndices());
                collectionsPages.forEach((p) => finalMergedPdf.addPage(p));
            }
        }

        const finalBytes = await finalMergedPdf.save();

        // 5️⃣ Open merged PDF
        if (openInNewTab) {
            const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            window.open(url);
        }

        // 6️⃣ If title form required, open separately (print-only)
        if (wantsTitle) {
            try {
                const titleBytes = await mergeFilledPDFs(
                    ["title"],
                    combinedTransferData,
                    "Simple Transfer",
                    true // print-only mode
                );

                const blob = new Blob([titleBytes.buffer as ArrayBuffer], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
            } catch (e) {
                console.warn("Could not open title.pdf in a new tab:", e);
            }
        }

        return finalBytes;
    } catch (err) {
        console.error("Error generating merged transfer PDFs:", err);
        return null;
    }
}


async function handleOnPDF(form: any, senerio: any) {
    try {
        let formTypes: string[] = [];
        if (senerio?.includes("Simple Transfer")) {
            formTypes.push('DMVREG262new', 'Reg227');
            //==> Without Title: REG 227
            if (form.transactionSelections?.includes("Transaction with Vehicle Title")) {
                // formTypes = formTypes.filter(formType => formType !== "Reg227");
                // formTypes.push("title")
                try {
                    const titleBytes = await mergeFilledPDFs(
                        ["title"],
                        form,
                        "Simple Transfer",
                        false // print-only mode
                    );

                    const blob = new Blob([titleBytes.buffer as ArrayBuffer], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                } catch (e) {
                    console.warn("Could not open title.pdf in a new tab:", e);
                }
            }

            //==> Out Of State Title: REG 343
            if (form.transactionSelections?.includes("Out of State Title")) {
                formTypes.push("Reg343");
            }

            //==> Current Lienholder: REG 227
            if (!formTypes.includes("Reg227") && form.transactionSelections?.includes("There is a Current Lienholder")) {
                formTypes.push("Reg227");
            }

            //==> Vehicle is a Gift OR Family Transfer OR Smog Exemption: REG 256
            if (
                form.transactionSelections?.includes("Family Transfer") ||
                form.transactionSelections?.includes("Vehicle is a Gift") ||
                form.transactionSelections?.includes("Smog Exemption")
            ) {
                formTypes.push("Reg256");
            }
        }
        if (senerio?.includes("Duplicate Stickers") ||
            senerio?.includes("Duplicate Registration") ||
            senerio?.includes("Duplicate Plates & Stickers")) {
            formTypes.push('Reg156');
        }
        if (senerio?.includes("Restoring PNO Vehicle to Operational")) {
            formTypes.push("Reg256");
        }
        if (senerio?.includes("Name Change")) {
            formTypes.push("Reg256");
        }
        if (senerio?.includes("Add Lienholder") ||
            senerio?.includes("Remove Lienholder")) {
            if (form.transactionSelections?.includes("With Title") || (form.transactionSelections?.includes("Transaction with Vehicle Title"))) {
                formTypes = formTypes?.filter(formType => formType !== "Reg227");
                formTypes.push("title");
            } else {
                if (!formTypes.includes("Reg227")) {  // to prevent dual printing of reg 227 when simple transfer + remove lien holder
                    formTypes.push("Reg227");
                }
            }
        }
        if (senerio?.includes("Filing for Planned Non-Operation (PNO)")) {
            formTypes.push("REG102");
            const isReg156Needed = form.transactionSelections?.some((selection: string) =>
                selection.toLowerCase().includes("60 days before registration expires") ||
                selection.toLowerCase().includes("request pno card")
            );
            if (isReg156Needed) {
                formTypes.push("Reg156");
            }
        }
        if (senerio?.includes("Certificate of Non-Operation")) {
            formTypes.push("REG102");
        }
        if (senerio?.includes("Commercial Vehicle")) {
            if (!formTypes.includes("Reg343")) {
                formTypes.push("Reg343");
            }
            // Only push Reg4008 if vehicle is 10,001 lbs or more
            if (form.commercialInfo?.["GVWR"] === "Yes") {
                formTypes.push("Reg4008");
            }
            if (!formTypes.includes("Reg256")) {
                formTypes.push("Reg256");
            }
            // Only push 590 if Commercial Vehicle(BUS/LIMO/TAXI) is selected
            if (form.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)")) {
                formTypes.push("Reg590");
            }
        }
        if (senerio?.includes("Salvage")) {
            formTypes.push("Reg488c");
        }
        if (senerio?.includes("Disabled Person Placards/Plates")) {
            formTypes.push("REG195");
        }
        if (senerio?.includes("Duplicate Title")) {
            if (!formTypes.includes("Reg227")) {
                formTypes.push("Reg227");
            }
        }
        if (senerio?.includes("Change of Address")) {
            formTypes.push("DMV14");
        }
        if (senerio?.includes("Personalized Plates")) {
            formTypes.push("REG17");
        }
        const mergedBytes = await mergeFilledPDFs(formTypes, form, senerio, false);
        return mergedBytes;

    } catch (e) {
        console.error("error in genrating pdf : ", e)
    }
}


//--new collections designeddd
async function generateCollectionsPDF(
    selectedItems: string[],
    allItems: string[]
): Promise<Uint8Array | null> {
    try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([612, 792]);
        const { width, height } = page.getSize();

        const font = await pdfDoc.embedFont(StandardFonts.Courier);
        const boldFont = await pdfDoc.embedFont(StandardFonts.CourierBold);

        const centerX = width / 2;

        const drawCenteredText = (
            text: string,
            y: number,
            size: number,
            fontType = font,
            color = rgb(0, 0, 0)
        ) => {
            const textWidth = fontType.widthOfTextAtSize(text, size);
            page.drawText(text, {
                x: centerX - textWidth / 2,
                y,
                size,
                font: fontType,
                color,
            });
        };

        const drawDashedLine = (y: number) => {
            page.drawLine({
                start: { x: 60, y },
                end: { x: width - 60, y },
                thickness: 1,
                dashArray: [4, 4],
                color: rgb(0.3, 0.3, 0.3),
            });
        };

        let y = height - 50;

        // Top line
        drawDashedLine(y);
        y -= 25;

        // Title
        const redTo = "TO";
        const rest = " COMPLETE THE TRANSACTION";

        const toWidth = boldFont.widthOfTextAtSize(redTo, 16);
        const restWidth = font.widthOfTextAtSize(rest, 16);
        const totalWidth = toWidth + restWidth;

        const titleStartX = centerX - totalWidth / 2;

        page.drawText(redTo, {
            x: titleStartX,
            y,
            size: 16,
            font: boldFont,
            color: rgb(0.8, 0.1, 0.1),
        });

        page.drawText(rest, {
            x: titleStartX + toWidth,
            y,
            size: 16,
            font,
        });

        y -= 25;

        drawCenteredText(
            "Checklist for DMV Paperwork & Requirements",
            y,
            14
        );

        y -= 35;

        drawDashedLine(y);
        y -= 70;

        // ===============================
        // CHECKLIST (CENTERED BLOCK)
        // ===============================

        const items = allItems.length > 0 ? allItems : selectedItems;

        const boxSize = 12;
        const gap = 12;
        const lineHeight = 28;

        // 🔹 Find widest text
        let maxTextWidth = 0;
        items.forEach((item) => {
            const w = font.widthOfTextAtSize(item, 12);
            if (w > maxTextWidth) maxTextWidth = w;
        });

        const totalBlockWidth = boxSize + gap + maxTextWidth;

        // 🔹 Shared start position (centered block)
        const sharedStartX = centerX - totalBlockWidth / 2;

        items.forEach((item) => {
            // Checkbox (border only — no fill)
            page.drawRectangle({
                x: sharedStartX,
                y: y - 2,
                width: boxSize,
                height: boxSize,
                borderWidth: 1,
                borderColor: rgb(0, 0, 0),
            });

            //   // Real checkmark ✓
            //   if (selectedItems.includes(item)) {
            //     page.drawText("✓", {
            //       x: sharedStartX + 2,
            //       y: y - 1,
            //       size: 12,
            //       font: boldFont,
            //     });
            //   }

            // Text (all aligned same left)
            page.drawText(item, {
                x: sharedStartX + boxSize + gap,
                y,
                size: 10,
                font,
            });

            y -= lineHeight;
        });

        // ===============================
        // FOOTER (ALWAYS PAGE BOTTOM)
        // ===============================

        const footerY = 20;

        drawDashedLine(footerY + 25);

        drawCenteredText(
            "© Formatic – Your DMV paperwork simplified",
            footerY,
            12
        );

        drawDashedLine(footerY - 10);

        const pdfBytes = await pdfDoc.save();
        return pdfBytes;

    } catch (error) {
        console.error("Error generating Collections PDF:", error);
        return null;
    }
}

function getCollectionOptions(senerioName: string): string[] {
    try {
        const allOptions: string[] = [];
        seneriosDetails.forEach((scenario: any) => {
            // Check if this scenario form name is present in the input senerioName string
            // We use includes() which works for both comma-separated strings "FormA, FormB"
            // and JSON arrays "['FormA', 'FormB']".
            if (senerioName && senerioName.includes(scenario.form)) {

                const docBlock = scenario.blocks.find((b: any) =>
                    b.blockName === "Documents Received" || b.reference === "Documents Received"
                );

                if (docBlock && docBlock.fields) {
                    docBlock.fields.forEach((f: any) => {
                        if (f.label) {
                            allOptions.push(f.label);
                        }
                    });
                }
            }
        });

        // Deduplicate
        return Array.from(new Set(allOptions));
    } catch (e) {
        console.error("Error getting collection options:", e);
        return [];
    }
}



export async function headHandlerForPDf(sourceOfClick: string, confirm: any) {
    const savedSenerio = localStorage.getItem("senerio") || "Simple Transfer";

    const needsMessage =
        savedSenerio?.includes("Simple Transfer") ||
        savedSenerio?.includes("Multiple Transfer") ||
        savedSenerio?.includes("Add Lienholder") ||
        sourceOfClick === "Multiple Transfer";

    if (needsMessage) {
        const message = (() => {
            if (sourceOfClick === "Multiple Transfer" || savedSenerio?.includes("Multiple Transfer")) {
                const saved = localStorage.getItem("multipleTransferStates") || "{}";
                try {
                    const parsed = JSON.parse(saved);
                    const list = parsed?.multipleTransfer ?? [];
                    const count = Array.isArray(list) ? list.length : 0;
                    return `“Please load the printer with (${count}) DMV 262 forms before continuing.”`;
                } catch {
                    return `“Please load the printer with (0) DMV 262 forms before continuing.”`;
                }
            } else {
                return "“Please load the printer with one DMV 262 form before continuing.”";
            }
        })();

        const obj = {
            message,
            confirm: "Proceed",
            cancel: "Cancel",
        };

        const result = await confirm(obj);

        if (!result) {
            // toast("Action cancelled.", { icon: "⚠️" });
            return;
        }
    }

    const finalMergedPdf = await PDFDocument.create();
    // const savedSenerio = localStorage.getItem("senerio") || "Simple Transfer";
    if (sourceOfClick === "Multiple Transfer") {
        const savedForm = localStorage.getItem("multipleTransferStates");
        const parsed = JSON.parse(savedForm || "{}");
        const multipleFormDataList: FormData[] = parsed?.multipleTransfer || [];

        // Use the first transfer to build Reg227 by default (you can pass other index)
        await generateMultiple262AndOne227(multipleFormDataList, true, savedSenerio);
        return;
    }
    else {
        try {
            const savedForm = localStorage.getItem("formStates");
            // const savedSenerio = localStorage.getItem("senerio"); // Removed to use outer declaration
            const parsed = JSON.parse(savedForm || "{}");
            const filledBytes = await handleOnPDF(parsed, savedSenerio);

            if (filledBytes) {
                const filledDoc = await PDFDocument.load(filledBytes);
                const pages = await finalMergedPdf.copyPages(filledDoc, filledDoc.getPageIndices());
                pages.forEach((page) => finalMergedPdf.addPage(page));
            }

            // Add Collections PDF if there are any collections
            // Also need senerio here
            const collections = parsed.optionsForValidation || [];
            const allOptions = getCollectionOptions(savedSenerio);

            if (collections.length > 0 || allOptions.length > 0) {
                const collectionsPdfBytes = await generateCollectionsPDF(collections, allOptions);
                if (collectionsPdfBytes) {
                    const collectionsDoc = await PDFDocument.load(collectionsPdfBytes);
                    const collectionsPages = await finalMergedPdf.copyPages(collectionsDoc, collectionsDoc.getPageIndices());
                    collectionsPages.forEach((page) => finalMergedPdf.addPage(page));
                }
            }
        } catch (e) {
            console.error(`Error processing filled PDF:`, e);
        }
    }
    const finalBytes = await finalMergedPdf.save();
    const blob = new Blob([finalBytes as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
}