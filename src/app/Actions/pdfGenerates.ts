import {
    PDFDocument,
    PDFTextField,
    PDFCheckBox,
    PDFField,
} from 'pdf-lib';

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
};

type FormData = {
    personalOrBusinessInformationData?: any;
    previousResidenceOrBusinessAddressData?: any;
    newOrCorrectResidenceOrBusinessAddressData?: any;
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
            "GVW Weight Range"?: string;
            "CGW Weight Range"?: string;
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
        plate?: string;
    };
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
    const owner1 = formatSingleOwner(formData.ownersData?.[0]);
    const owner2 = formatSingleOwner(formData.ownersData?.[1]);
    const owner3 = formatSingleOwner(formData.ownersData?.[2]);

    const newOwner1 = formatSingleOwner(formData.newOwnerData?.[0]);
    const newOwner2 = formatSingleOwner(formData.newOwnerData?.[1]);
    const newOwner3 = formatSingleOwner(formData.newOwnerData?.[2]);
    const odoMeter = formData.vehicleInfoState?.['Mileage of Vehicle'] || '';
    const reversedOdoMeter = odoMeter?.split('').reverse().join('');
    const joinNames = (...names: (string | undefined)[]) =>
        names.filter(name => name && name.trim()).join(', ');
    const rawDate = formData.ownersData?.[0]?.['Date of Sale'] || '';
    const { month, day, year } = extractDateParts(rawDate);

    return {
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
        "True full name": (formData.ownerCount ?? 0) > 0 ? owner1 : '',
        "Co owner": (formData.ownerCount ?? 1) > 1 ? owner2 : '',
        "certification": (formData.newOwnerCount ?? 0) > 0 ? newOwner1 : '',
        "telephone number": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        "title": formData.ownersData?.[0]?.['Title if Signing for a Company'] || '',
        "DL1": formData.ownersData?.[0]?.['Driver License Number']?.split('')[0] || '',
        "DL2": formData.ownersData?.[0]?.['Driver License Number']?.split('')[1] || '',
        "DL3": formData.ownersData?.[0]?.['Driver License Number']?.split('')[2] || '',
        "DL4": formData.ownersData?.[0]?.['Driver License Number']?.split('')[3] || '',
        "DL5": formData.ownersData?.[0]?.['Driver License Number']?.split('')[4] || '',
        "DL6": formData.ownersData?.[0]?.['Driver License Number']?.split('')[5] || '',
        "DL7": formData.ownersData?.[0]?.['Driver License Number']?.split('')[6] || '',
        "DL8": formData.ownersData?.[0]?.['Driver License Number']?.split('')[7] || '',
        "2DL1": formData.ownersData?.[1]?.['Driver License Number']?.split('')[0] || '',
        "2DL2": formData.ownersData?.[1]?.['Driver License Number']?.split('')[1] || '',
        "2DL3": formData.ownersData?.[1]?.['Driver License Number']?.split('')[2] || '',
        "2DL4": formData.ownersData?.[1]?.['Driver License Number']?.split('')[3] || '',
        "2DL5": formData.ownersData?.[1]?.['Driver License Number']?.split('')[4] || '',
        "2DL6": formData.ownersData?.[1]?.['Driver License Number']?.split('')[5] || '',
        "2DL7": formData.ownersData?.[1]?.['Driver License Number']?.split('')[6] || '',
        "2DL8": formData.ownersData?.[1]?.['Driver License Number']?.split('')[7] || '',
        "Physical address": formData.newOwnerAddress?.Street || '',
        "Physical address 1": formData.ownerAddress?.residential?.Street || '',
        "County 1": formData.ownerAddress?.residential?.County || '',
        "County": formData.newOwnerAddress?.County || '',
        "One license": senerio?.includes("Duplicate Plates & Stickers") ? formData.licensePlateState === "One license plate missing" ? true : false : false,
        "Two plates": senerio?.includes("Duplicate Plates & Stickers") ? formData.licensePlateState === "Two license plates are missing" ? true : false : false,
        "Apt #": formData.ownerAddress?.residential?.["APT./SPACE/STE.#"] || '',
        "City": formData.ownerAddress?.residential?.City || '',
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
        'text_60czib': formData.newOwnerMailingAddress?.Street ? `${formData.newOwnerMailingAddress?.["APT./SPACE/STE.#"] || ''}   ${formData.newOwnerMailingAddress?.Street || ''}` : `${formData.newOwnerAddress?.["APT./SPACE/STE.#"] || ''}   ${formData.newOwnerAddress?.Street || ''}`,
        'text_61pxrx': formData.newOwnerMailingAddress?.City ? formData.newOwnerMailingAddress?.City || '' : formData.newOwnerAddress?.City || '',
        'text_62cqaf': formData.newOwnerMailingAddress?.State ? formData.newOwnerMailingAddress?.State || '' : formData.newOwnerAddress?.State || '',
        'text_63psgg': formData.newOwnerMailingAddress?.["ZIP Code"] ? formData.newOwnerMailingAddress?.["ZIP Code"] || '' : formData.newOwnerAddress?.["ZIP Code"] || '',
        'text_64xthv': formData.ownerAddress?.isMailingDifferent === true ? formData.ownerAddress?.mailing?.["ZIP Code"] || '' : formData.ownerAddress?.residential?.["ZIP Code"] || '',
        'text_65bzof': formData.ownerAddress?.isMailingDifferent === true ? formData.ownerAddress?.mailing?.["State"] || '' : formData.ownerAddress?.residential?.["State"] || '',
        'text_66evl': formData.ownerAddress?.isMailingDifferent === true ? formData.ownerAddress?.mailing?.City || '' : formData.ownerAddress?.residential?.City || '',
        'text_67vkky': formData.ownerAddress?.isMailingDifferent === true ? `${formData.ownerAddress?.mailing?.["Street"] || ''} ${formData.ownerAddress?.mailing?.["APT./SPACE/STE.#"] || ''}` : `${formData.ownerAddress?.residential?.["Street"] || ''} ${formData.ownerAddress?.residential?.["APT./SPACE/STE.#"] || ''}`,
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
        "zip code": formData.ownerAddress?.residential?.["ZIP Code"] || '',
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
        "REG card with current address": formData.itemRequestedWasState?.checked?.includes("REQUESTING REGISTRATION CARD"),
        "CVC": formData.itemRequestedWasState?.checked?.includes("PER CVC §4467"),
        "other": formData.itemRequestedWasState?.checked?.includes("OTHER") ? true : senerio?.includes("Duplicate Registration") ? true : false,
        "Explanation": formData.itemRequestedWasState?.checked?.includes("OTHER") ? formData.itemRequestedWasState?.otherExplain || '' : senerio?.includes("Duplicate Registration") ? "Requesting a Duplicate Registration Card" : "",
        "Name of bank, finance company, or individual having a lien on this vehicle": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || 'NONE' : "NONE",
        "2 Address": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["Street"] || '' : "",
        "2 Apt/Space Number": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["APT./SPACE/STE.#"] || '' : "",
        "2 City": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["City"] || '' : "",
        "2 States1": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["State"] || '' : "",
        "2 Zip Code": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.residential?.["ZIP Code"] || '' : "",
        "3 Print Name Legal Owner.0": owner1,
        "3 Print Name Legal Owner.1": owner1,
        "3 Print Name Legal Owner.2.0": owner2,
        "3 Date.0": formData.ownersData?.[0]?.['Date of Sale'] || '',
        "date.0": formData.ownersData?.[0]?.['Date of Sale'] || '',
        "4 Date-2": (formData.ownerCount ?? 0) > 1 ? formData.ownersData?.[0]?.['Date of Sale'] || '' : '',
        "area code.0": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "area code": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "area": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "area23": formData.ownersData?.[1]?.['Phone Number']?.slice(1, 4) || '',
        "3 Daytime Phone Number": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        "4 Daytime Phone Number 1": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        "4 Daytime Phone Number 2.0": formData.ownersData?.[1]?.['Phone Number']?.slice(5) || '',
        "Printed name of authorized agent signing for company": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Name of bank, finance company, or individual(s) having a lien on this vehicle"] || "NONE" : "NONE",
        "title of authorized agent signing for company": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Title of authorized agent signing for company"] || "" : '',
        "area code.1": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Phone number"]?.slice(1, 4) || "" : "",
        "4 Daytime Phone Number 2.1": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Phone number"]?.slice(5) || "" : "",
        "date.1": senerio?.includes("Remove Lienholder") ? formData.lienReleaseState?.companyAddress?.["Date of Sale"] || "" : "",
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
        'Lessee address, if different from address above': `${formData.newOwnerLesseeAddress?.["APT./SPACE/STE.#"] || ''}    ${formData.newOwnerLesseeAddress?.Street || ''}    ${formData.newOwnerLesseeAddress?.City || ''}    ${formData.newOwnerLesseeAddress?.State || ''} `,
        'Vessel or trailer coach principally kept at, address or location if different from physical/business address above': `${formData.newOwnerKeptAddress?.["APT./SPACE/STE.#"] || ''}    ${formData.newOwnerKeptAddress?.Street || ''}    ${formData.newOwnerKeptAddress?.City || ''}    ${formData.newOwnerKeptAddress?.State || ''} `,
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
        'Text73': (formData.newOwnerCount ?? 0) > 1 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[1]) : '',
        'Text81': (formData.newOwnerCount ?? 0) > 2 ? formatSingleOwnerWithLastNameFirst(formData.newOwnerData?.[2]) : '',
        "Text64": formData.newOwnerData?.[0]?.['State'] || '',
        "Text74": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['State'] || '' : '',
        "Text75": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['State'] || '' : '',
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
        "Text113": `${formData.newOwnerKeptAddress?.["APT./SPACE/STE.#"] || ''}   ${formData.newOwnerKeptAddress?.Street || ''}`,
        "Text114": formData.newOwnerKeptAddress?.["APT./SPACE/STE.#"] || '',
        "Text115": formData.newOwnerKeptAddress?.City || '',
        "Text116": formData.newOwnerKeptAddress?.State || '',
        "Text117": formData.newOwnerKeptAddress?.["ZIP Code"] || '',
        "Text118": formData.transactionSelections?.includes('There is a Current Lienholder') ? formData.LegalOwnerOfRecordData?.residential?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || '' : 'NONE',
        "Text119": formData.transactionSelections?.includes('There is a Current Lienholder') && formData.transactionSelections?.includes('Out of State Title') ? formData.LegalOwnerOfRecordData?.residential?.["ELT Number (3 digits)"] || '' : '',
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
        "Text18": formData.typeOfVehicleSelection?.includes("MOTORCYCLE") ? formData.vehicleInfoState?.['Motorcycle Engine Number'] || '' : '',
        "Text29": formData.typeOfVehicleSelection?.includes("TRAILER COACH") ? formData.vehicleInfoState?.['Length (IN)'] || '' : '',
        "Text30": formData.typeOfVehicleSelection?.includes("TRAILER COACH") ? formData.vehicleInfoState?.['Width (IN)'] || '' : '',

        //check boxes
        "App for2": true,
        "Check Box1": formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Lost' ? true : false,
        "Check Box2": formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Stolen' ? true : false,
        "Check Box4": formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Not Recive From Prior Owner' ? true : false,
        "Check Box5": formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Not Recive From DMV(Allow 30 dys from issue date)' ? true : false,
        "Check Box6": formData.transactionSelections?.includes("Transaction with Vehicle Title") || formData.transactionSelections?.includes("With Title") ? false : formData.missingReason === 'Illegile/Mutilated(Attach old title)' ? true : false,
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
        "Check Box20": formData.typeOfVehicleSelection === "AUTO" ? true : false,
        "Check Box24": formData.typeOfVehicleSelection === "Commercial" ? true : false,
        "Check Box25": formData.typeOfVehicleSelection === "MOTORCYCLE" ? true : false,
        "Check Box26": formData.typeOfVehicleSelection === "OFF HIGHWAY" ? true : false,
        "Check Box27": formData.typeOfVehicleSelection === "TRAILER COACH" ? true : false,
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
        "Check Box183": true,
        "Text184": (formData.newOwnerCount ?? 0) > 0 ? formatSingleOwner(formData.newOwnerData?.[0]) : '',
        "Text185": (formData.newOwnerCount ?? 0) > 0 ? formData.ownersData?.[0]?.['Date of Sale'] || '' : '',
        "Text186": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '' : '',
        "Text187": (formData.newOwnerCount ?? 0) > 0 ? formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '' : '',
        "Text188": (formData.newOwnerCount ?? 0) > 1 ? formatSingleOwner(formData.newOwnerData?.[1]) : '',
        "Text189": (formData.newOwnerCount ?? 0) > 1 ? formData.ownersData?.[0]?.['Date of Sale'] || '' : '',
        "Text190": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Phone Number']?.slice(1, 4) || '' : '',
        "Text191": (formData.newOwnerCount ?? 0) > 1 ? formData.newOwnerData?.[1]?.['Phone Number']?.slice(5) || '' : '',
        "Text192": (formData.newOwnerCount ?? 0) > 2 ? formatSingleOwner(formData.newOwnerData?.[2]) : '',
        "Text193": (formData.newOwnerCount ?? 0) > 2 ? formData.ownersData?.[0]?.['Date of Sale'] || '' : '',
        "Text194": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Phone Number']?.slice(1, 4) || '' : '',
        "Text195": (formData.newOwnerCount ?? 0) > 2 ? formData.newOwnerData?.[2]?.['Phone Number']?.slice(5) || '' : '',
        "7 ELT #.0": senerio?.includes("Add Lienholder") ? formData.newLienholder?.address?.["ELT Number (3 digits)"]?.split('')[0] || '' : '',
        "7 ELT #.1.0": senerio?.includes("Add Lienholder") ? formData.newLienholder?.address?.["ELT Number (3 digits)"]?.split('')[1] || '' : '',
        "7 ELT #.1.1": senerio?.includes("Add Lienholder") ? formData.newLienholder?.address?.["ELT Number (3 digits)"]?.split('')[2] || '' : '',
        "gift box": formData.transactionSelections?.includes("Vehicle is a Gift"),
        "Family transfer box": formData.transactionSelections?.includes("Family Transfer"),
        "textarea_69crqf": senerio?.includes("Restoring PNO Vehicle to Operational") ? " The vehicle was previously placed on Planned Non Operation (PNO) status I now intend to operate it on public roads and I am submitting payment for registration fees and for any late fees penalities." :
            senerio?.includes("Commercial Vehicle") ? formData?.vehicleBodyState?.["Statement of Facts"] || '' : '',
        //Reg102
        "PNO": formData?.transactionSelections?.includes('60 days before registration expires or 90 days after') ? true : false,
        "veh lic plate #.0": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[0]?.plate || '' : '',
        "veh id #.0": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[0]?.vin || '' : '',
        "veh make.0": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[0]?.make || '' : '',
        "veh equip #.0": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[0]?.equipment || '' : '',

        "veh lic plate #.1": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[1]?.plate || '' : '',
        "veh id #.1": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[1]?.vin || '' : '',
        "veh make.1": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[1]?.make || '' : '',
        "veh equip #.1": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[1]?.equipment || '' : '',

        "veh lic plate #.2": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[2]?.plate || '' : '',
        "veh id #.2": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[2]?.vin || '' : '',
        "veh make.2": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[2]?.make || '' : '',
        "veh equip #.2": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[2]?.equipment || '' : '',

        "veh lic plate #.3": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[3]?.plate || '' : '',
        "veh id #.3": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[3]?.vin || '' : '',
        "veh make.3": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[3]?.make || '' : '',
        "veh equip #.3": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[3]?.equipment || '' : '',

        "veh lic plate #.4": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[4]?.plate || '' : '',
        "veh id #.4": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[4]?.vin || '' : '',
        "veh make.4": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[4]?.make || '' : '',
        "veh equip #.4": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[4]?.equipment || '' : '',

        "veh lic plate #.5": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[5]?.plate || '' : '',
        "veh id #.5": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[5]?.vin || '' : '',
        "veh make.5": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[5]?.make || '' : '',
        "veh equip #.5": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[5]?.equipment || '' : '',

        "veh lic plate #.6": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[6]?.plate || '' : '',
        "veh id #.6": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[6]?.vin || '' : '',
        "veh make.6": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[6]?.make || '' : '',
        "veh equip #.6": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[6]?.equipment || '' : '',

        "veh lic plate #.7": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[7]?.plate || '' : '',
        "veh id #.7": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[7]?.vin || '' : '',
        "veh make.7": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[7]?.make || '' : '',
        "veh equip #.7": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[7]?.equipment || '' : '',

        "veh lic plate #.8": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[8]?.plate || '' : '',
        "veh id #.8": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[8]?.vin || '' : '',
        "veh make.8": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[8]?.make || '' : '',
        "veh equip #.8": senerio?.includes("Filing for Planned Non-Operation (PNO)") ? formData?.plannedNonOperationState?.[8]?.equipment || '' : '',

        "license plate #.0": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[0]?.plate || '' : '',
        "vin.0": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[0]?.vin || '' : '',
        "make.0": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[0]?.make || '' : '',
        "equip #.0": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[0]?.equipment || '' : '',

        "license plate #.1": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[1]?.plate || '' : '',
        "vin.1": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[1]?.vin || '' : '',
        "make.1": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[1]?.make || '' : '',
        "equip #.1": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[1]?.equipment || '' : '',

        "license plate #.2": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[2]?.plate || '' : '',
        "vin.2": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[2]?.vin || '' : '',
        "make.2": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[2]?.make || '' : '',
        "equip #.2": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[2]?.equipment || '' : '',

        "license plate #.3": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[3]?.plate || '' : '',
        "vin.3": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[3]?.vin || '' : '',
        "make.3": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[3]?.make || '' : '',
        "equip #.3": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[3]?.equipment || '' : '',

        "license plate #.4": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[4]?.plate || '' : '',
        "vin.4": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[4]?.vin || '' : '',
        "make.4": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[4]?.make || '' : '',
        "equip #.4": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[4]?.equipment || '' : '',

        "license plate #.5": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[5]?.plate || '' : '',
        "vin.5": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[5]?.vin || '' : '',
        "make.5": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[5]?.make || '' : '',
        "equip #.5": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[5]?.equipment || '' : '',

        "license plate #.6": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[6]?.plate || '' : '',
        "vin.6": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[6]?.vin || '' : '',
        "make.6": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[6]?.make || '' : '',
        "equip #.6": senerio?.includes("Certificate of Non-Operation") ? formData?.plannedNonOperationState?.[6]?.equipment || '' : '',

        "from month.0": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["FROM: MONTH, DAY, YEAR"])?.month : '',
        "from day.0": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["FROM: MONTH, DAY, YEAR"])?.day || '' : '',
        "from year.0": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["FROM: MONTH, DAY, YEAR"])?.year || '' : '',
        "to month": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["TO: MONTH, DAY, YEAR"])?.month || '' : '',
        "to day": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["TO: MONTH, DAY, YEAR"])?.day || '' : '',
        "to year": senerio?.includes("Certificate of Non-Operation") ? extractDateParts(formData?.vehicleStorageLocation?.["TO: MONTH, DAY, YEAR"])?.year || '' : '',

        "address": senerio?.includes("Certificate of Non-Operation") ? formData?.vehicleStorageLocation?.Address || '' : '',
        "city": senerio?.includes("Certificate of Non-Operation") ? formData?.vehicleStorageLocation?.City || '' : '',
        "State_VSL": senerio?.includes("Certificate of Non-Operation") ? formData?.vehicleStorageLocation?.State || '' : '',
        "zip": senerio?.includes("Certificate of Non-Operation") ? formData?.vehicleStorageLocation?.["ZIP Code"] || '' : '',

        "Check Box34": formData.transactionSelections?.includes("Out of State Title") ? true : false,
        "Check Box36": formData.transactionSelections?.includes("Out of State Title") ? true : false,


        //reg 156
        "license year": senerio?.includes("Duplicate Stickers") && senerio?.includes("Yearly Sticker") ? true : false,
        "license month": senerio?.includes("Duplicate Stickers") && senerio?.includes("Monthly Sticker") ? true : false,

        "Text49": senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["Number of axles"] || '' : '',
        "Text50": senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["Unladen weight"] || '' : '',
        "Check Box51": senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["Weight Actual"] || '' : '',
        "Check Box55": senerio?.includes("Commercial Vehicle") ? formData?.commercialInfo?.["Weight Estimated"] || '' : '',

        //reg 4008

        "Name": senerio?.includes("Commercial Vehicle") ? owner1 || '' : '',
        "text_31jsfn": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.residential?.Street || '' : '',
        "text_32olri": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.residential?.["APT./SPACE/STE.#"] || '' : '',
        "City.0": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.residential?.City || '' : '',
        "States1.0": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.residential?.State || '' : '',
        "Zip Code.0": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.residential?.["ZIP Code"] || '' : '',
        "Address.0.1": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.residential?.County || '' : '',
        "Check Box 1": senerio?.includes("Commercial Vehicle") ? formData?.newOwnerAddress?.["If no California county and used out-of-state, check this box"] || false : false,

        "text_30xebc": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.mailing?.Street || '' : '',
        "text_33mpyh": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.mailing?.["APT./SPACE/STE.#"] || '' : '',
        "City.1": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.mailing?.City || '' : '',
        "States1.1": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.mailing?.State || '' : '',
        "Zip Code.1": senerio?.includes("Commercial Vehicle") ? formData?.ownerAddress?.mailing?.["ZIP Code"] || '' : '',

        "License- 1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle License Number"] || '' : '',
        "VIN- 1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle Identification Number"] || '' : '',
        "Make -1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["Vehicle Make"] || '' : '',
        // "Under 10,001 pounds.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["GVW Weight Range"] || '' : '',
        "GVW -1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["GVW Weight Range"] || '' : '',
        "CGW -1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["CGW Weight Range"] || '' : '',
        "Date 1st operated-1.0": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[0]?.["Date Operated"] || '' : '',

        "License- 1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle License Number"] || '' : '',
        "VIN- 1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle Identification Number"] || '' : '',
        "Make -1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["Vehicle Make"] || '' : '',
        // "Under 10,001 pounds.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["GVW Weight Range"] || '' : '',
        "GVW -1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["GVW Weight Range"] || '' : '',
        "CGW -1.1": senerio?.includes("Commercial Vehicle") ? formData?.vehicleDeclarationEntryData?.[1]?.["CGW Weight Range"] || '' : '',
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

        //reg 590
        "Vehicle identification number": senerio?.includes("Commercial Vehicle") ? formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "" : '',
        "Text2": senerio?.includes("Commercial Vehicle") ? formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "" : '',
        "Text3": senerio?.includes("Commercial Vehicle") ? formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "" : '',
        "Check Box 4": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Bus" ? true : false || false : false : false,
        "Check Box 5": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Taxicab" ? true : false || false : false : false,
        "Check Box 6": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Rental Limousine" ? true : false || false : false : false,
        "Check Box 7": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Ambulance" ? true : false || false : false : false,
        "Check Box 8": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.vehicletype === "Station Wagon" ? true : false || false : false : false,
        "Check Box9": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.["The owner of this vehicle and it is registered in my name"] === true ? true : false || false : false : false,
        "Check Box10": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.["Employee of a business which required me to own and operate a station wagon which is registered in my name"] === true ? true : false || false : false : false,
        "Text14": senerio?.includes("Commercial Vehicle") ? formData.transactionSelections?.includes("Commercial Vehicle(BUS/LIMO/TAXI)") ? formData.commercialInfo?.["commercialStartDate"] || '' : '' : '',

        //reg 488c
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
        "DATE STOLEN1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Date stolen'] || "" : '',
        "DATE RECOVERED1": senerio?.includes("Salvage") ? formData.salvageCertificateState?.['Date recovered'] || "" : '',
        "PRINTED NAME OF INSURANCE CO. OR APPLICANT1": senerio?.includes("Salvage") ? owner1 : '',
        "DL OR ID NUMBER1": senerio?.includes("Salvage") ? formData.ownersData?.[0]?.['Driver License Number'] : '',
        "STREET ADDRESS": senerio?.includes("Salvage") ? formData.ownerAddress?.residential?.Street : '',
        "CITY": senerio?.includes("Salvage") ? formData.ownerAddress?.residential?.City : '',
        "STATE": senerio?.includes("Salvage") ? formData.ownerAddress?.residential?.State : '',
        "ZIP CODE": senerio?.includes("Salvage") ? formData.ownerAddress?.residential?.["ZIP Code"] : '',
        "PRINTED NAME OF AGENT": senerio?.includes("Salvage") ? formData.ownersData?.[0]?.["Agent Name"] || '' : '',


        "Are Being Surrendered": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "ARE BEING SURRENDERED" ? true : false : false,
        "surrendedone": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "ARE BEING SURRENDERED" ? formData.certificateOfLicensePlateDispositionState?.platesSurrendered === "ONE" ? true : false : false : false,
        "surrendedtwo": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "ARE BEING SURRENDERED" ? formData.certificateOfLicensePlateDispositionState?.platesSurrendered === "TWO" ? true : false : false : false,
        "have been lost": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "HAVE BEEN LOST" ? true : false : false,
        "have been destroyed": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "HAVE BEEN DESTROYED (OCCUPATIONAL LICENSEES ONLY)" ? true : false : false,
        "plate with owner": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "PLATE WITH OWNER - RETAINED BY OWNER FOR REASSIGNMENT" ? true : false : false,
        "OL NUMBER 3": senerio?.includes("Salvage") ? formData.certificateOfLicensePlateDispositionState?.licensePlatesAssignedTo === "HAVE BEEN DESTROYED (OCCUPATIONAL LICENSEES ONLY)" ? formData.certificateOfLicensePlateDispositionState?.occupationalLicenseNumber : "" : "",

        //Reg 195
        "Name or organization name": senerio?.includes("Disabled Person Placards/Plates") ? newOwner1 || '' : '',
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

        //reg 256

        "checkbox_76urox": senerio?.includes("Name Change") ? senerio?.includes("Name Discrepancy") ? true : false : false,
        "text_71uait": senerio?.includes("Name Change") ? senerio?.includes("Name Discrepancy") ? formData?.nameChangeData?.discrepency1 || '' : '' : '',
        "text_72rrpr": senerio?.includes("Name Change") ? senerio?.includes("Name Discrepancy") ? formData?.nameChangeData?.discrepency2 || '' : '' : '',
        "checkbox_77lxng": senerio?.includes("Name Change") ? senerio?.includes("Name Correction") ? true : false : false,
        "text_73xplb": senerio?.includes("Name Change") ? senerio?.includes("Name Correction") ? formData?.nameChangeData?.correction || '' : "" : '',
        "checkbox_78tyvm": senerio?.includes("Name Change") ? senerio?.includes("Legal Name Change") ? true : false : false,
        "text_75ujtd": senerio?.includes("Name Change") ? senerio?.includes("Legal Name Change") ? formData?.nameChangeData?.changeFrom || '' : "" : '',
        "text_74udmw": senerio?.includes("Name Change") ? senerio?.includes("Legal Name Change") ? formData?.nameChangeData?.changeTo || '' : "" : '',

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

        "street name.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[0] || '' : '',
        "street name 1.0.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[1] || '' : '',
        "street name 1.0.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[2] || '' : '',
        "street name 1.0.2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[3] || '' : '',
        "street name 1.0.3.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[4] || '' : '',
        "street name 1.0.4.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[5] || '' : '',
        "street name 1.0.5.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[6] || '' : '',
        "street name 1.0.6.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[7] || '' : '',
        "street name 1.0.7.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[8] || '' : '',
        "street name 1.0.8.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[9] || '' : '',
        "street name 1.0.9.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[10] || '' : '',
        "street name 1.0.10.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[11] || '' : '',
        "street name 1.0.11.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[12] || '' : '',
        "street name 1.0.12.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[13] || '' : '',
        "street name 1.0.13.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[14] || '' : '',
        "street name 1.0.14.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[15] || '' : '',
        "street name 1.0.15.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[16] || '' : '',
        "street name 1.0.16.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[17] || '' : '',
        "street name 1.0.17.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[18] || '' : '',
        "street name 1.0.18.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[19] || '' : '',
        "street name 1.0.19.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[20] || '' : '',
        "street name 1.0.19.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[21] || '' : '',
        "street name 1.0.20.0.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[22] || '' : '',
        "street name 1.0.20.1.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[23] || '' : '',
        "street name 1.0.20.2.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[24] || '' : '',
        "street name 1.0.20.3.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[25] || '' : '',
        "street name 1.0.20.4.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[26] || '' : '',
        "street name 1.0.20.5.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[27] || '' : '',
        "street name 1.0.20.6.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[28] || '' : '',
        "street name 1.0.20.7.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[29] || '' : '',
        "street name 1.0.20.8.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[30] || '' : '',
        "street name 1.0.20.9.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[31] || '' : '',
        "street name 1.0.20.10.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[32] || '' : '',
        "street name 1.0.20.11.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[33] || '' : '',
        "street name 1.0.20.12.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[34] || '' : '',
        "street name 1.0.20.13.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[35] || '' : '',
        "street name 1.0.20.14.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[36] || '' : '',
        "street name 1.0.20.15.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[37] || '' : '',
        "street name 1.0.20.16.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[38] || '' : '',
        "street name 1.0.20.17.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[39] || '' : '',
        "street name 1.0.20.18.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[40] || '' : '',
        "street name 1.0.20.19.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[41] || '' : '',
        "street name 1.0.20.20.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[42] || '' : '',
        "street name 1.0.20.21.0": senerio?.includes("Change of Address") ? formData?.previousResidenceOrBusinessAddressData?.["STREET NAME"]?.[43] || '' : '',

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

    };
};


const mergeFilledPDFs = async (
    formTypes: string[],
    formData: FormData,
    senerio: string,
    // multipleFormDataList: FormData[] = []  // optional for multiple transfer
): Promise<Uint8Array> => {
    const mergedPdf = await PDFDocument.create();

    // let dmv262Index = 0; // for tracking multiple 262 forms

    for (const type of formTypes) {
        const pdfUrl = `/pdfs/${type}.pdf`;
        const res = await fetch(pdfUrl);

        if (!res.ok) {
            console.error(`❌ Failed to fetch PDF: ${pdfUrl}`);
            continue;
        }

        const pdfBytes = await res.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);

        try {
            const form = pdfDoc.getForm();
            const fields = form.getFields();

            // //  Select which data to use
            // let currentData: FormData;

            // if (type === "DMVREG262new" && multipleFormDataList.length > 0) {
            //     // Use specific transfer data
            //     currentData = multipleFormDataList[dmv262Index] || formData;
            //     dmv262Index++;
            // } else {
            //     // Use default formData
            //     currentData = formData;
            // }

            const fieldMapping = buildFieldMapping(formData, senerio);

            // Fill fields
            fields.forEach((field: PDFField) => {
                const name = field.getName();
                const value = fieldMapping[name];
                // console.log(name, value);

                try {
                    if (field instanceof PDFTextField) {
                        field.setText(value);
                        field.setFontSize(11);
                    } else if (field instanceof PDFCheckBox) {
                        if (value === true || value === 'true') {
                            field.check();
                        } else {
                            field.uncheck();
                        }
                    }
                } catch (e: any) {
                    console.warn(`Could not fill field ${name}:`, e.message);
                }
            });

            // Make fields read-only
            fields.forEach((field: PDFField) => {
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
async function handleOnPDF(form: any, senerio: any) {
    try {
        let formTypes: string[] = [];
        if (senerio?.includes("Simple Transfer")) {
            formTypes.push('DMVREG262new', 'Reg227');
            //==> Without Title: REG 227
            if (form.transactionSelections?.includes("Transaction with Vehicle Title")) {
                formTypes = formTypes.filter(formType => formType !== "Reg227");
            }

            //==> Out Of State Title: REG 343
            if (form.transactionSelections?.includes("Out of State Title")) {
                formTypes.push("Reg343");
            }

            //==> Current Lienholder: REG 227
            if (form.transactionSelections?.includes("There is a Current Lienholder")) {
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
            if (form.transactionSelections?.includes("With Title")) {
                formTypes = formTypes?.filter(formType => formType !== "Reg227");
            } else {
                formTypes.push("Reg227");
            }
        }
        if (senerio?.includes("Filing for Planned Non-Operation (PNO)")) {
            formTypes.push("Reg102");
            if (form.transactionSelections?.includes('60 days before registration expires or 90 days after')) {
                formTypes.push("Reg156");
            }
        }
        if (senerio?.includes("Certificate of Non-Operation")) {
            formTypes.push("Reg102");
        }
        if (senerio?.includes("Commercial Vehicle")) {
            formTypes.push("Reg343");
            formTypes.push("Reg4008");
            formTypes.push("Reg256");
            formTypes.push("Reg590");
        }
        if (senerio?.includes("Salvage")) {
            formTypes.push("Reg488c");
        }
        if (senerio?.includes("Disabled Person Placards/Plates")) {
            formTypes.push("REG195");
        }
        if (senerio?.includes("Duplicate Title")) {
            formTypes.push("Reg227");
        }
        if (senerio?.includes("Change of Address")) {
            formTypes.push("DMV14");
        }
        const mergedBytes = await mergeFilledPDFs(formTypes, form, senerio);
        return mergedBytes;

    } catch (e) {
        console.error("error in genrating pdf : ", e)
    }
}
export async function headHandlerForPDf(sourceOfClick: string) {
    const finalMergedPdf = await PDFDocument.create();
    if (sourceOfClick === "Multiple Transfer") {

        const savedForm = localStorage.getItem("multipleTransferStates");
        const savedSenerio = localStorage.getItem("senerio");

        const parsed = JSON.parse(savedForm || "[]");
        const multipleFormDataList = parsed?.multipleTransfer || [];
        const senerio: string = JSON.parse(savedSenerio || "[]");

        if (!multipleFormDataList.length) {
            console.warn("No transfer data found.");
            return;
        }

        for (const data of multipleFormDataList) {
            const filledBytes = await handleOnPDF(data, ["Simple Transfer"]);
            if (!filledBytes) continue;

            try {
                const filledDoc = await PDFDocument.load(filledBytes);
                const pages = await finalMergedPdf.copyPages(filledDoc, filledDoc.getPageIndices());
                pages.forEach((page) => finalMergedPdf.addPage(page));
            } catch (e) {
                console.error(`Error processing filled PDF for ${data.transferNumber}`, e);
            }
        }

    } else {
        try {
            const savedForm = localStorage.getItem("formStates");
            const savedSenerio = localStorage.getItem("senerio");
            const parsed = JSON.parse(savedForm || "{}");
            const filledBytes = await handleOnPDF(parsed, savedSenerio);

            if (filledBytes) {
                const filledDoc = await PDFDocument.load(filledBytes);
                const pages = await finalMergedPdf.copyPages(filledDoc, filledDoc.getPageIndices());
                pages.forEach((page) => finalMergedPdf.addPage(page));
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