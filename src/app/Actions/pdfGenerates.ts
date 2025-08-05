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
        "PRINTED NAME": formData.newOwnerData?.[0]?.['Last Name'] || '',
        "FIRST NAME": formData.newOwnerData?.[0]?.['First Name'] || '',
        "MIDDLE NAME": formData.newOwnerData?.[0]?.['Middle Name'] || '',
        "App sign area code": formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "App sign phone no": formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '',
        "Signature date": rawDate || '',
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
        "other": formData.itemRequestedWasState?.checked?.includes("OTHER"),
        "Explanation": formData.itemRequestedWasState?.checked?.includes("OTHER") ? formData.itemRequestedWasState?.otherExplain || '' : '',
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

    };
};


const mergeFilledPDFs = async (
    formTypes: string[],
    formData: FormData,
    senerio: string,
    multipleFormDataList: FormData[] = []  // optional for multiple transfer
): Promise<Uint8Array> => {
    const mergedPdf = await PDFDocument.create();

    let dmv262Index = 0; // for tracking multiple 262 forms

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

            //  Select which data to use
            let currentData: FormData;

            if (type === "DMVREG262new" && multipleFormDataList.length > 0) {
                // Use specific transfer data
                currentData = multipleFormDataList[dmv262Index] || formData;
                dmv262Index++;
            } else {
                // Use default formData
                currentData = formData;
            }

            const fieldMapping = buildFieldMapping(currentData, senerio);

            // Fill fields
            fields.forEach((field: PDFField) => {
                const name = field.getName();
                const value = fieldMapping[name];
                console.log(name, value);

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

export async function handleOnPDF(activeTransferIndex?: number): Promise<void> {
    console.log("firstly activeTransferIndex:", activeTransferIndex);
    try {
        const savedForm = localStorage.getItem("formStates");
        const savedSenerio = localStorage.getItem("senerio");
        const multipleForms = localStorage.getItem("multipleTransferStates");

        const form: FormData = JSON.parse(savedForm || "{}");
        const senerio: string = JSON.parse(savedSenerio || "{}");
        const multipleTransfer = JSON.parse(multipleForms || "{}");

        let formTypes: string[] = [];

        // console.log("multipleTransfer ==>", multipleTransfer);
        // console.log("Transfer 01 ==>", multipleTransfer.multipleTransfer?.[0]?.transactionSelections);
        // console.log("Transfer 02 ==>", multipleTransfer.multipleTransfer?.[1]?.transactionSelections);
        // console.log("Transfer 03 ==>", multipleTransfer.multipleTransfer?.[2]?.transactionSelections);
        // console.log("Transfer 04 ==>", multipleTransfer.multipleTransfer?.[3]?.transactionSelections);
        // console.log("Transfer 05 ==>", multipleTransfer.multipleTransfer?.[4]?.transactionSelections);

        // ====> MULTIPLE TRANSFER SCENARIO

        // if (senerio?.includes("Multiple Transfer")) {
        //     formTypes.push('DMVREG262new', 'Reg227');

        //     // ==> Correctly access transactionSelections array from the first form in multipleTransfer
        //     let transactionSelections = [];
        //     if (
        //         typeof activeTransferIndex === "number" &&
        //         multipleTransfer?.multipleTransfer &&
        //         Array.isArray(multipleTransfer.multipleTransfer) &&
        //         multipleTransfer.multipleTransfer[activeTransferIndex]
        //     ) {
        //         transactionSelections = multipleTransfer.multipleTransfer[activeTransferIndex]?.transactionSelections || [];
        //     }

        //     // ==> Ensure it's always an array
        //     if (!Array.isArray(transactionSelections)) {
        //         transactionSelections = [transactionSelections];
        //     }

        //     // ==> Without Title: remove REG 227
        //     if (transactionSelections?.includes("Transaction with Vehicle Title")) {
        //         formTypes = formTypes.filter(formType => formType !== "Reg227");
        //     }

        //     // ==> Out Of State Title: Add REG 343
        //     if (transactionSelections?.includes("Out of State Title")) {
        //         formTypes.push("Reg343");
        //     }

        //     // ==> Current Lienholder: Add REG 227
        //     if (transactionSelections.includes("There is a Current Lienholder")) {
        //         formTypes.push("Reg227");
        //     }

        //     // ==> Gift / Family / Smog: Add REG 256
        //     if (
        //         transactionSelections.includes("Family Transfer") ||
        //         transactionSelections.includes("Vehicle is a Gift") ||
        //         transactionSelections.includes("Smog Exemption")
        //     ) {
        //         formTypes.push("Reg256");
        //     }

        //     console.log("log transactionSelections:", transactionSelections);
        // }

        // console.log("log formTypes after processing:", formTypes);
        // ====> SIMPLE TRANSFER SCENARIO
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
            senerio?.includes("Duplicate Plates & Stickers")) {
            formTypes.push('Reg156');
        }
        if (senerio?.includes("Restoring PNO Vehicle to Operational")) {
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
        //==> Remove duplicates just in case
        formTypes = [...new Set(formTypes)];

        const mergedBytes = await mergeFilledPDFs(formTypes, form, senerio);
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    } catch (e) {
        console.error("error in genrating pdf : ", e)
    }
}