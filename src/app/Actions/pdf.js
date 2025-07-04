import {
    PDFDocument,
    PDFTextField,
    PDFCheckBox,
} from 'pdf-lib';

function formatSingleOwner(owner) {
    if (!owner) return '';

    const last = owner['Last Name'] || '';
    const first = owner['First Name'] || '';
    const middle = owner['Middle Name'] || '';

    const fullName = [last, first, middle].filter(Boolean).join(' ');
    return fullName;
}


const buildFieldMapping = (formData) => {
    const owner1 = formatSingleOwner(formData.ownersData?.[0]);
    const owner2 = formatSingleOwner(formData.ownersData?.[1]);
    const owner3 = formatSingleOwner(formData.ownersData?.[2]);

    const newOwner1 = formatSingleOwner(formData.newOwnerData?.[0]);
    const newOwner2 = formatSingleOwner(formData.newOwnerData?.[1]);
    const newOwner3 = formatSingleOwner(formData.newOwnerData?.[2]);

    const joinNames = (...names) =>
        names.filter(name => name && name.trim()).join(', ');

    const rawDate = formData.ownersData[0]?.['Date of Sale'] || '';
    const normalizedDate = rawDate.replace(/\s+/g, '/'); // Replace spaces with slashes

    const [month = '', day = '', year = ''] = normalizedDate.split('/');

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
        "True full name": owner1,
        "Co owner": owner2,
        "certification": owner1,
        "telephone number": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        "title": formData.ownersData[0]?.['Title if Signing for a Company'] || '',
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
        "Physical address": formData.ownerAddress?.residential?.["Street"] || '',
        "One license": formData.licensePlateState === "One license plate missing" ? true : false,
        "Two plates": formData.licensePlateState === "Two license plates are missing" ? true : false,
        "Apt #": formData.ownerAddress?.residential?.["APT./SPACE/STE.#"] || '',
        'I/We': joinNames(owner1, owner2, owner3),
        'to': joinNames(newOwner1, newOwner2, newOwner3),
        "PRINTED NAME": formData.ownersData?.[0]?.['Last Name'] || '',
        "FIRST NAME": formData.ownersData?.[0]?.['First Name'] || '',
        "MIDDLE NAME": formData.ownersData?.[0]?.['Middle Name'] || '',
        "App sign area code": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "App sign phone no": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        'sellingmonth': month || '',
        'sellingdate': day || '',
        'sellingyear1': year[0] || '',
        'sellingyear2': year[1] || '',
        'sellingyear3': year[2] || '',
        'sellingyear4': year[3] || '',
        'giftvalue': formData.transactionSelections?.includes('Vehicle is a Gift') ? formData.newOwnerData[0]?.['Gift Value'] || '' : '',
        'sellingprice': formData.transactionSelections?.includes('Vehicle is a Gift') ? '' : formData.newOwnerData[0]?.['Purchase Price/Value'] || '',
        'relation': formData.transactionSelections?.includes('Vehicle is a Gift') ? formData.newOwnerData[0]?.['Relationship with Gifter'] || '' : '',
        "odometer1": formData.vehicleInfoState?.['Mileage of Vehicle']?.split('')[0] || "",
        "odometer2": formData.vehicleInfoState?.['Mileage of Vehicle']?.split('')[1] || "",
        "odometer3": formData.vehicleInfoState?.['Mileage of Vehicle']?.split('')[2] || "",
        "odometer4": formData.vehicleInfoState?.['Mileage of Vehicle']?.split('')[3] || "",
        "odometer5": formData.vehicleInfoState?.['Mileage of Vehicle']?.split('')[4] || "",
        "odometer6": formData.vehicleInfoState?.['Mileage of Vehicle']?.split('')[5] || "",
        "odometer7": formData.vehicleInfoState?.['Mileage of Vehicle']?.split('')[6] || "",
        "notactualmileage": formData.vehicleInfoState?.["NOT Actual Mileage"],
        "mileageexceeds": formData.vehicleInfoState?.["Mileage Exceeds Mechanical Limit"],
        "PRINT BUYER'S NAME": newOwner1,
        "6 Purchase Price/Market Value": month,
        "Acquired Yr": year || '',
        "Date Purchased": day,
        'Purchase price': formData.transactionSelections?.includes("Vehicle is a Gift") ? formData.newOwnerData[0]?.['Gift Value'] || '' : formData.newOwnerData[0]?.['Purchase Price/Value'] || "",
        'SIGNATUREx': "",
        'DL/ID OR DEALER/DISM #': formData.newOwnerData[0]?.['Driver License Number'] || '',
        "PRINT BUYER'S NAME_1": newOwner2,
        "SIGNATUREx_1": "",
        "DATE": rawDate,
        "DATE_1": rawDate,
        "DL/ID OR DEALER/DISM #_1": formData.newOwnerData[1]?.['Driver License Number'] || '',
        "PRINT BUYER'S NAME_2": newOwner3,
        'SIGNATUREx_2': "",
        "DATE_2": rawDate,
        'DL/ID OR DEALER/DISM #_2': formData.newOwnerData[2]?.['Driver License Number'] || '',
        'DAYTIME TELEPHONE NO': formData.newOwnerData[0]?.['Phone Number'] || '',
        "PRINTSELLER'S NAME": owner1,
        'SIGNATUREx_3': "",
        "DATE_3": rawDate,
        'DL/ID OR DEALER/DISM #_3': formData.ownersData[0]?.['Driver License Number'] || '',
        "PRINT SELLER'S NAME": owner2,
        'SIGNATUREx_4': "",
        "DATE_4": rawDate,
        'DL/ID OR DEALER/DISM #_4': formData.ownersData[1]?.['Driver License Number'] || '',
        "PRINT SELLER'S NAME_1": owner3,
        'SIGNATUREx_5': "",
        "DATE_5": rawDate,
        "DATE_6": rawDate,
        "DATE_7": rawDate,
        'DL/ID OR DEALER/DISM #_5': formData.ownersData[2]?.['Driver License Number'] || '',
        'DAYTIME TELEPHONE NO_1': formData.ownersData[0]?.['Phone Number'] || '',
        'I/We_1': formData.powerOfAttorneyData?.appointer || '',
        'appoint': formData.powerOfAttorneyData?.appointee || '',
        'CheckBox': "CheckBox",
        'CheckBox_1': "CheckBox",
        'CheckBox_2': "CheckBox",
        'text_60czib': formData.newOwnerMailingAddress?.Street ? formData.newOwnerMailingAddress?.Street || '' : formData.newOwnerAddress?.Street || '',
        'text_61pxrx': formData.newOwnerMailingAddress.City ? formData.newOwnerMailingAddress.City || '' : formData.newOwnerAddress.City || '',
        'text_62cqaf': formData.newOwnerMailingAddress.State ? formData.newOwnerMailingAddress.State || '' : formData.newOwnerAddress.State || '',
        'text_63psgg': formData.newOwnerMailingAddress?.["ZIP Code"] ? formData.newOwnerMailingAddress?.["ZIP Code"] || '' : formData.newOwnerAddress?.["ZIP Code"] || '',
        'text_64xthv': formData.ownerAddress?.mailing?.["ZIP Code"] ? formData.ownerAddress?.mailing?.["ZIP Code"] || '' : formData.ownerAddress?.residential?.["ZIP Code"] || '',
        'text_65bzof': formData.ownerAddress?.mailing?.["State"] ? formData.ownerAddress?.mailing?.["State"] || '' : formData.ownerAddress?.residential?.["State"] || '',
        'text_66evl': formData.ownerAddress?.mailing ? formData.ownerAddress?.residential?.City || '' : formData.ownerAddress?.mailing?.City || '',
        'text_67vkky': formData.ownerAddress?.mailing ? formData.ownerAddress?.residential?.["Street"] || '' : formData.ownerAddress?.mailing?.["Street"] || '',
        'License Plate/CF Number1': formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        'Vehicle/Vessel ID/Number1': formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        'Year/Make': `${formData.vehicleInfoState?.['Year of Vehicle'] || ""} ${formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || ""}`,
        '1 True Full Name, Last': owner1,
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
        "1 True Full Name, Last-2": owner2,
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
        "1 Mailing Address": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["Street"] || '',
        "Mailing address": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["Street"] || '',
        "1 Apt/Space Number-2": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["APT./SPACE/STE.#"] || '',
        "Apt 2": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["APT./SPACE/STE.#"] || '',
        "1 City-2": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["City"] || '',
        "City2": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["City"] || '',
        "1 States2": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["State"] || '',
        "state2": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["State"] || '',
        "1 Zip Code-2.0": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["ZIP Code"] || '',
        "zip code2": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["ZIP Code"] || '',
        "Lost": formData.itemRequestedWasState?.checked?.includes("LOST"),
        "Stolen": formData.itemRequestedWasState?.checked?.includes("STOLEN"),
        "destroyed": formData.itemRequestedWasState?.checked?.includes("DESTROYED/MUTILATED"),
        "Not Received DMV": formData.itemRequestedWasState?.checked?.includes("NOT RECEIVED FROM DMV"),
        "Not received prior owner": formData.itemRequestedWasState?.checked?.includes("NOT RECEIVED FROM PRIOR OWNER"),
        "Surrendered": formData.itemRequestedWasState?.checked?.includes("SURRENDERED"),
        "one": formData.itemRequestedWasState?.checked?.includes("SURRENDERED") ? formData.itemRequestedWasState?.plateCount[0] === "ONE" : false,
        "Two": formData.itemRequestedWasState?.checked?.includes("SURRENDERED") ? formData.itemRequestedWasState?.plateCount[0] === "TWO" : false,
        "Special plates": formData.itemRequestedWasState?.checked?.includes("SPECIAL PLATES"),
        "REG card with current address": formData.itemRequestedWasState?.checked?.includes("REQUESTING REGISTRATION CARD"),
        "CVC": formData.itemRequestedWasState?.checked?.includes("PER CVC §4467"),
        "other": formData.itemRequestedWasState?.checked?.includes("OTHER"),
        "Explanation": formData.itemRequestedWasState?.checked?.includes("OTHER") ? formData.itemRequestedWasState?.otherExplain || '' : '',
        "Name of bank, finance company, or individual having a lien on this vehicle": formData.transactionSelections?.includes("There is a Current Lienholder") ? formData.LegalOwnerOfRecordData?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || '' : "NONE",
        "2 Address": formData.LegalOwnerOfRecordData?.["Street"] || '',
        "2 Apt/Space Number": formData.LegalOwnerOfRecordData?.["APT./SPACE/STE.#"] || '',
        "2 City": formData.LegalOwnerOfRecordData?.["City"] || '',
        "2 States1": formData.LegalOwnerOfRecordData?.["State"] || '',
        "2 Zip Code": formData.LegalOwnerOfRecordData?.["ZIP Code"] || '',
        "3 Print Name Legal Owner.0": owner1,
        "3 Print Name Legal Owner.1": owner2,
        "3 Print Name Legal Owner.2.0": owner3,
        "3 Date.0": formData.ownersData?.[0]?.['Date of Sale'] || '',
        "area code.0": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "area code": formData.ownersData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        "3 Daytime Phone Number": formData.ownersData?.[0]?.['Phone Number']?.slice(5) || '',
        "date.0": formData.ownersData?.[0]?.['Date of Sale'] || '',
        "area": formData.ownersData?.[1]?.['Phone Number']?.slice(1, 4) || '',
        "4 Daytime Phone Number 1": formData.ownersData?.[1]?.['Phone Number']?.slice(5) || '',
        "4 Date-2": formData.ownersData?.[0]?.['Date of Sale'] || '',
        "area23": formData.ownersData?.[2]?.['Phone Number']?.slice(1, 4) || '',
        "4 Daytime Phone Number 2.0": formData.ownersData?.[2]?.['Phone Number']?.slice(5) || '',
        "Printed name of authorized agent signing for company": formData.LegalOwnerOfRecordData?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || "",
        "title of authorized agent signing for company": "",
        "License Plate/CF Number122": formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        "Vehicle/Vessel ID/Number211": formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        "Year/Make2": formData.vehicleInfoState?.['Year of Vehicle'] || "",
        "Gift Box": "Gift Box",
        "Gift Box1": "Gift Box1",
        "market value": formData.newOwnerData?.[0]?.["Market Value"] || '',
        "true full name of new owner, last, first, middle, suffix, business name, or lessor": newOwner1,
        "6 DL/ID Card Numer-1.0.1.0": formData.newOwnerData[1]?.['Driver License Number']?.split('')[0] || '',
        "6 DL/ID Card Numer-1.0.1.1": formData.newOwnerData[1]?.['Driver License Number']?.split('')[1] || '',
        "6 DL/ID Card Numer-1.0.1.2": formData.newOwnerData[1]?.['Driver License Number']?.split('')[2] || '',
        "6 DL/ID Card Numer-1.0.1.3": formData.newOwnerData[1]?.['Driver License Number']?.split('')[3] || '',
        "6 DL/ID Card Numer-1.0.1.4": formData.newOwnerData[1]?.['Driver License Number']?.split('')[4] || '',
        "6 DL/ID Card Numer-1.0.1.5": formData.newOwnerData[1]?.['Driver License Number']?.split('')[5] || '',
        "6 DL/ID Card Numer-1.0.1.6": formData.newOwnerData[1]?.['Driver License Number']?.split('')[6] || '',
        "6 DL/ID Card Numer-1.0.1.7": formData.newOwnerData[1]?.['Driver License Number']?.split('')[7] || '',
        "6 DL/ID Card Numer-1.0.0": formData.newOwnerData[0]?.['Driver License Number']?.split('')[0] || '',
        "6 DL/ID Card Numer-1.1": formData.newOwnerData[0]?.['Driver License Number']?.split('')[1] || '',
        "6 DL/ID Card Numer-1.2": formData.newOwnerData[0]?.['Driver License Number']?.split('')[2] || '',
        "6 DL/ID Card Numer-1.3": formData.newOwnerData[0]?.['Driver License Number']?.split('')[3] || '',
        "6 DL/ID Card Numer-1.4": formData.newOwnerData[0]?.['Driver License Number']?.split('')[4] || '',
        "6 DL/ID Card Numer-1.5": formData.newOwnerData[0]?.['Driver License Number']?.split('')[5] || '',
        "6 DL/ID Card Numer-1.6": formData.newOwnerData[0]?.['Driver License Number']?.split('')[6] || '',
        "6 DL/ID Card Numer-1.7.0": formData.newOwnerData[0]?.['Driver License Number']?.split('')[7] || '',
        "6 DL/ID Card Numer-1.7.1": formData.newOwnerData[1]?.State || '',
        "6 Name First-1": newOwner2,
        "6 state": formData.newOwnerData[1]?.['State'] || '',
        "6 Name Last-2": newOwner3,
        "6 DL/ID CArd Number-2.0": formData.newOwnerData[2]?.['Driver License Number']?.split('')[0] || '',
        "6 DL/ID CArd Number-2.1": formData.newOwnerData[2]?.['Driver License Number']?.split('')[1] || '',
        "6 DL/ID CArd Number-2.2": formData.newOwnerData[2]?.['Driver License Number']?.split('')[2] || '',
        "6 DL/ID CArd Number-2.3": formData.newOwnerData[2]?.['Driver License Number']?.split('')[3] || '',
        "6 DL/ID CArd Number-2.4": formData.newOwnerData[2]?.['Driver License Number']?.split('')[4] || '',
        "6 DL/ID CArd Number-2.5": formData.newOwnerData[2]?.['Driver License Number']?.split('')[5] || '',
        "6 DL/ID CArd Number-2.6": formData.newOwnerData[2]?.['Driver License Number']?.split('')[6] || '',
        "6 DL/ID CArd Number-2.7": formData.newOwnerData[2]?.['Driver License Number']?.split('')[7] || '',
        "state-2.8": formData.newOwnerData[2]?.['State'] || '',
        "physical residence or business address.0": formData.newOwnerAddress?.["Street"] || "",
        "6 Apt/Space Number-1": formData.newOwnerAddress["APT./SPACE/STE.#"] || "",
        "6 City-1": formData.newOwnerAddress?.["City"] || "",
        "City-1": formData.newOwnerAddress?.["City"] || "",
        "6 States1": formData.newOwnerAddress?.["State"] || "",
        "6 Zip Code-1": formData.newOwnerAddress?.["ZIP Code"] || "",
        "county residence or county where vehicle or vessle is princi.0": "",
        "6 Mailing Address": formData.newOwnerMailingAddress?.Street || '',
        "6 Apt/Space Number-2": formData.newOwnerMailingAddress?.["APT./SPACE/STE.#"] || '',
        "6 City-2": formData.newOwnerMailingAddress?.City || '',
        "date.123": rawDate || '',
        "date 2": rawDate || '',
        "date 3": rawDate || '',
        '6 States 2.0': formData.newOwnerMailingAddress?.State || '',
        '6 Zip Code-2.0': formData.newOwnerMailingAddress?.["ZIP Code"] || '',
        'Lessee address, if different from address above': `${formData.newOwnerLesseeAddress?.Street || ''} ${formData.newOwnerLesseeAddress?.["APT./SPACE/STE.#"] || ''} ${formData.newOwnerLesseeAddress?.City || ''} ${formData.newOwnerLesseeAddress?.State || ''} `,
        'Vessel or trailer coach principally kept at, address or location if different from physical/business address above': `${formData.newOwnerKeptAddress?.Street || ''} ${formData.newOwnerKeptAddress?.["APT./SPACE/STE.#"] || ''} ${formData.newOwnerKeptAddress?.City || ''} ${formData.newOwnerKeptAddress?.State || ''} `,
        'county.0.0': formData.newOwnerKeptAddress?.County || '',
        '6 area code 1': formData.newOwnerData?.[0]?.['Phone Number']?.slice(1, 4) || '',
        'daytime telephone number': formData.newOwnerData?.[0]?.['Phone Number']?.slice(5) || '',
        'area code 2': formData.newOwnerData?.[1]?.['Phone Number']?.slice(1, 4) || '',
        'daytime number 2': formData.newOwnerData?.[1]?.['Phone Number']?.slice(5) || '',
        'area code 3': formData.newOwnerData?.[2]?.['Phone Number']?.slice(1, 4) || '',
        'daytime number 3': formData.newOwnerData?.[2]?.['Phone Number']?.slice(5) || '',
        '7 Name New Legal Owner': formData.LegalOwnerOfRecordData?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || "",
        'Physical residence or business address.0': formData.LegalOwnerOfRecordData?.["Street"] || "",
        '7 Apt/Space Number.0': formData.LegalOwnerOfRecordData?.["APT./SPACE/STE.#"] || "",
        '7 Apt/Space Number.1': formData.LegalOwnerOfRecordData?.["APT./SPACE/STE.#"] || "",
        '7 City.0': formData.LegalOwnerOfRecordData?.City || "",
        '7 City.1': formData.LegalOwnerOfRecordData?.City || "",
        '7 State.0': formData.LegalOwnerOfRecordData?.State || "",
        '7 State.1': formData.LegalOwnerOfRecordData?.State || "",
        '7 Zip Code.0': formData.LegalOwnerOfRecordData?.["ZIP Code"] || "",
        '7 Zip Code.1': formData.LegalOwnerOfRecordData?.["ZIP Code"] || "",
        'mailing address': formData.LegalOwnerOfRecordData?.["Street"] || "",
        "License Plate/CF Number": formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        "Veh/Vessel ID Number": formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        'text_70xghh': formData.newOwnerData?.[0]?.['6 Purchase Price/Market Value'] || "",
        'text_71tqjp': formData.newOwnerData?.[0]?.['Gift Value'] || "",
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
        "Text11": formData.vehicleInfoState?.['Year of Vehicle'] || "",
        'Text62': newOwner1,
        'Text73': newOwner2,
        'Text81': newOwner3,
        "Text64": formData.newOwnerData?.[0]?.['State'] || '',
        "Text74": formData.newOwnerData?.[1]?.['State'] || '',
        "Text75": formData.newOwnerData?.[2]?.['State'] || '',
        'Owner DL no': formData.newOwnerData[0]?.['Driver License Number']?.split('')[0] || '',
        'owner second digit': formData.newOwnerData[0]?.['Driver License Number']?.split('')[1] || '',
        'owner third digit': formData.newOwnerData[0]?.['Driver License Number']?.split('')[2] || '',
        'owner fourth digit': formData.newOwnerData[0]?.['Driver License Number']?.split('')[3] || '',
        'owner fifth digit': formData.newOwnerData[0]?.['Driver License Number']?.split('')[4] || '',
        'owner sixth digit': formData.newOwnerData[0]?.['Driver License Number']?.split('')[5] || '',
        'owner seventh digit': formData.newOwnerData[0]?.['Driver License Number']?.split('')[6] || '',
        'owner eighth digit': formData.newOwnerData[0]?.['Driver License Number']?.split('')[7] || '',
        "first co owner dl no": formData.newOwnerData[1]?.['Driver License Number']?.split('')[0] || '',
        "first co owner second digit": formData.newOwnerData[1]?.['Driver License Number']?.split('')[1] || '',
        "first co owner third digit": formData.newOwnerData[1]?.['Driver License Number']?.split('')[2] || '',
        "first co owner fourth digit": formData.newOwnerData[1]?.['Driver License Number']?.split('')[3] || '',
        "first co owner fifth digit": formData.newOwnerData[1]?.['Driver License Number']?.split('')[4] || '',
        "first co owner sixth digit": formData.newOwnerData[1]?.['Driver License Number']?.split('')[5] || '',
        "first co owner seventh digit": formData.newOwnerData[1]?.['Driver License Number']?.split('')[6] || '',
        "first co owner eighth digit": formData.newOwnerData[1]?.['Driver License Number']?.split('')[7] || '',
        "second co owner": formData.newOwnerData[2]?.['Driver License Number']?.split('')[0] || '',
        "second co owner second digit": formData.newOwnerData[2]?.['Driver License Number']?.split('')[1] || '',
        "second co owner third digit": formData.newOwnerData[2]?.['Driver License Number']?.split('')[2] || '',
        "second co owner fourth digit": formData.newOwnerData[2]?.['Driver License Number']?.split('')[3] || '',
        "second co owner fifth digit": formData.newOwnerData[2]?.['Driver License Number']?.split('')[4] || '',
        "second co owner sixth digit": formData.newOwnerData[2]?.['Driver License Number']?.split('')[5] || '',
        "second co owner seventh digit": formData.newOwnerData[2]?.['Driver License Number']?.split('')[6] || '',
        "second co owner eighth digit": formData.newOwnerData[2]?.['Driver License Number']?.split('')[7] || '',
        'Text82': formData.newOwnerAddress?.Street || '',
        'Text83': formData.newOwnerAddress?.["APT./SPACE/STE.#"] || '',
        "Text85": formData.newOwnerAddress?.City || '',
        'Text86': formData.newOwnerAddress?.State || '',
        'Text87': formData.newOwnerAddress?.["ZIP Code"] || '',
        'Text88': formData.newOwnerAddress?.County || '',
        "Text89": '',
        'Text90': formData.newOwnerMailingAddress?.Street || '',
        'Text91': formData.newOwnerMailingAddress?.["APT./SPACE/STE.#"] || '',
        "Text92": formData.newOwnerMailingAddress?.City || '',
        'Text93': formData.newOwnerMailingAddress?.State || '',
        'Text94': formData.newOwnerMailingAddress?.["ZIP Code"] || '',
        "Text95": formData.newOwnerLesseeAddress?.Street || '',
        "Text109": formData.newOwnerLesseeAddress?.["APT./SPACE/STE.#"] || '',
        "Text110": formData.newOwnerLesseeAddress?.City || '',
        "Text111": formData.newOwnerLesseeAddress?.State || '',
        "Text112": formData.newOwnerLesseeAddress?.["ZIP Code"] || '',
        "Text113": formData.newOwnerKeptAddress?.Street || '',
        "Text114": formData.newOwnerKeptAddress?.["APT./SPACE/STE.#"] || '',
        "Text115": formData.newOwnerKeptAddress?.City || '',
        "Text116": formData.newOwnerKeptAddress?.State || '',
        "Text117": formData.newOwnerKeptAddress?.["ZIP Code"] || '',
        "Text118": formData.LegalOwnerOfRecordData?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || '',
        "Text119": formData.LegalOwnerOfRecordData?.["ELT Number (3 digits)"] || '',
        "Text120": formData.LegalOwnerOfRecordData?.Street || '',
        "Text121": formData.LegalOwnerOfRecordData?.["APT./SPACE/STE.#"] || '',
        "Text122": formData.LegalOwnerOfRecordData?.City || '',
        "Text123": formData.LegalOwnerOfRecordData?.State || '',
        "Text124": formData.LegalOwnerOfRecordData?.["ZIP Code"] || '',
        "Text125": formData.LegalOwnerOfRecordData?.Street || '',
        "Text126": formData.LegalOwnerOfRecordData?.["APT./SPACE/STE.#"] || '',
        "Text127": formData.LegalOwnerOfRecordData?.City || '',
        "Text128": formData.LegalOwnerOfRecordData?.State || '',
        "Text129": formData.LegalOwnerOfRecordData?.["ZIP Code"] || '',
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
        "Text172": formData.outOfStateVehicle?.salesTaxPaidAmount || '',
        "Current Market Value 1": formData.newOwnerData[0]?.["Market Value"] || '',
        "Powered by other 2": formData.statementForSomgExemptionData?.["It is powered by"] ? formData.statementForSomgExemptionData?.Other || '' : '',
        "Text132.0": formData.vehicleInfoState?.["Mileage of Vehicle"]?.split('')[0] || "",
        "Text132.1": formData.vehicleInfoState?.["Mileage of Vehicle"]?.split('')[1] || "",
        "Text132.2": formData.vehicleInfoState?.["Mileage of Vehicle"]?.split('')[2] || "",
        "Text132.3": formData.vehicleInfoState?.["Mileage of Vehicle"]?.split('')[3] || "",
        "Text132.4": formData.vehicleInfoState?.["Mileage of Vehicle"]?.split('')[4] || "",
        "Text132.5": formData.vehicleInfoState?.["Mileage of Vehicle"]?.split('')[5] || "",
        //Reg343
        "Text12": `${formData.statementForSomgExemptionData?.diesel ? 'Diesel' : formData.statementForSomgExemptionData?.electricity ? 'Electricity' : formData.statementForSomgExemptionData?.Other || ''}`,
        "Text18": formData.vehicleInfoState?.['Motorcycle Engine Number'] || '',
        "Text29": formData.vehicleInfoState?.['Length (IN)'] || '',
        "Text30": formData.vehicleInfoState?.['Width (IN)'] || '',

        //check boxes
        "App for2": true,
        "Check Box1": formData.missingReason === 'Lost' ? true : false,
        "Check Box2": formData.missingReason === 'Stolen' ? true : false,
        "Check Box4": formData.missingReason === 'Not Recive From Prior Owner' ? true : false,
        "Check Box5": formData.missingReason === 'Not Recive From DMV(Allow 30 dys from issue date)' ? true : false,
        "Check Box6": formData.missingReason === 'Illegile/Mutilated(Attach old title)' ? true : false,
        "Gift Box": formData.transactionSelections?.includes("Vehicle is a Gift") ? true : false,
        "Gift Box1": formData.transactionSelections?.includes("Vehicle is a Gift") ? false : true,
        "And Box.0": formData.newOwnershipTypes?.[1] === 'and' ? true : false,
        "And Box.1": formData.newOwnershipTypes?.[2] === 'and' ? true : false,
        "And Box1.0": formData.newOwnershipTypes?.[1] === 'or' ? true : false,
        "And Box1.1": formData.newOwnershipTypes?.[2] === 'or' ? true : false,
        "Biennial Smog cert box": formData.statementForSomgExemptionData?.["The last smog certification was obtained within the last 90 days"] ? true : false,
        "Powered by box": formData.statementForSomgExemptionData?.["It is powered by"] ? true : false,
        "Powered by electricity box": formData.statementForSomgExemptionData?.["It is powered by"] ? formData.statementForSomgExemptionData?.electricity ? true : false : false,
        "Powered by diesel box": formData.statementForSomgExemptionData?.["It is powered by"] ? formData.statementForSomgExemptionData?.diesel ? true : false : false,
        "Powered by other box": formData.statementForSomgExemptionData?.["It is powered by"] ? formData.statementForSomgExemptionData?.Other ? true : false : false,
        "Located outside CA box1": formData.statementForSomgExemptionData?.["It is located outside the State of California. (Exception: Nevada and Mexico)"] ? true : false,
        "transferred from/between": formData.statementForSomgExemptionData?.["It is being transferred from/between:"] ? true : false,
        "Paren, grandparent, etc box": formData.statementForSomgExemptionData?.["It is being transferred from/between:"] ? true : false,
        "Companies leasing vehicle box": formData.statementForSomgExemptionData?.["A sole proprietorship to the proprietor as owner.*"] ? true : false,
        "Companies whose principal business": formData.statementForSomgExemptionData?.["Companies whose principal business is leasing vehicles. There is no change in lessee or operator.*"] ? true : false,
        "Lessor/lessee operator box": formData.statementForSomgExemptionData?.["Lessor and lessee of vehicle, and no change in the lessee or operator of the vehicle.*"] ? true : false,
        "Lessor and person": formData.statementForSomgExemptionData?.["Lessor and person who has been lessee's operator of the vehicle for at least one year.*"] ? true : false,
        "Individual as registered own box.1": formData.statementForSomgExemptionData?.["Individual(s) being added as registered owner(s).*"] ? true : false,
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
        "Check Box155": "PURCHASE",
        "Text165": formData.vehiclePurchaseInfo?.family_relationship || '',
        "Check Box157": "GIFT",
        "Check Box159": "TRADE",
        "Check Box161": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "dealer" ? true : false,
        "Check Box162": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "private party" ? true : false,
        "Check Box163": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "dismantler" ? true : false,
        "Check Box164": formData.vehiclePurchaseInfo?.["VEHICLE WAS PURCHASED OR ACQUIRED FROM:"] === "family" ? true : false,
        "Check Box166": formData.vehiclePurchaseInfo?.["Vehicle Modifications"] === "yes" ? true : false,
        "Check Box167": formData.vehiclePurchaseInfo?.["Vehicle Modifications"] === "no" ? true : false,
        "Check Box169": formData.outOfStateVehicle?.salesTaxPaid === "n/a" ? true : false,
        "Check Box170": formData.outOfStateVehicle?.salesTaxPaid === "yes" ? true : false,
        "Check Box171": formData.outOfStateVehicle?.salesTaxPaid === "no" ? true : false,
        "Check Box175": formData.outOfStateVehicle.outOfStatePlates?.value === "expired" ? true : false,
        "Check Box176": formData.outOfStateVehicle.outOfStatePlates?.value === "surrendered" ? true : false,
        "Check Box177": formData.outOfStateVehicle.outOfStatePlates?.value === "destroyed" ? true : false,
        "Check Box178": formData.outOfStateVehicle.outOfStatePlates?.value === "retained" ? true : false,
        "Check Box179": formData.outOfStateVehicle.outOfStatePlates?.value === "returned" ? true : false,
        'Check Box70': formData.newOwnershipTypes?.[1] === 'and' ? true : false,
        'Check Box71': formData.newOwnershipTypes?.[1] === 'or' ? true : false,
        'Check Box77': formData.newOwnershipTypes?.[2] === 'and' ? true : false,
        'Check Box80': formData.newOwnershipTypes?.[2] === 'or' ? true : false,
    };
};


async function extractFieldNamesFromPDF(pdfBytes) {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const fieldMap = {};
    fields.forEach(field => {
        const name = field.acroField?.getFullyQualifiedName?.() || field.getName();
        fieldMap[name] = `name`; // you can set default text or booleans if needed
    });

    return fieldMap;
}
const mergeFilledPDFs = async (formTypes, formData) => {
    const mergedPdf = await PDFDocument.create();
    const fieldMapping = buildFieldMapping(formData);

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

            // First pass: Fill all fields with values
            fields.forEach((field) => {
                const name = field.getName();
                // const value1 = field.getName();
                const value = fieldMapping[name];
                console.log(field.getName(), "field");

                try {
                    if (field instanceof PDFTextField) {
                        field.setText(value);
                        // console.log(`${name} with value:`, value);

                        field.setFontSize(11);
                    } else if (field instanceof PDFCheckBox) {
                        if (value === true || value === 'true') {
                            field.check();
                        } else {
                            field.uncheck();
                        }
                    }
                } catch (e) {
                    console.warn(`Could not fill field ${name}:`, e.message);
                }
            });

            fields.forEach((field) => {
                try {
                    if (typeof field.enableReadOnly === 'function') {
                        field.enableReadOnly();
                    }
                } catch (e) {
                    console.warn(`Could not set read-only for field ${field.getName()}:`, e.message);
                }
            });

        } catch (err) {
            console.warn(`Error processing form in ${type}:`, err.message);
        }

        const finalBytes = await pdfDoc.save();
        const loadedFilledPdf = await PDFDocument.load(finalBytes);
        const pages = await mergedPdf.copyPages(loadedFilledPdf, loadedFilledPdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
    }

    return await mergedPdf.save();
};
export async function handleOnPDF() {
    try {
        const savedForm = localStorage.getItem("formStates");
        const savedSenerio = localStorage.getItem("senerio");

        const form = JSON.parse(savedForm || "{}");
        const senerio = JSON.parse(savedSenerio || "{}");
        let formTypes = [];

        // console.log("form : ", form.transactionSelections);
        // console.log("form : ", form);

        // console.log("senerio : ", senerio);
        // console.log("formTypes : ", formTypes);


        // ====> SIMPLE TRANSFER SCENARIO
        if (senerio.includes("Simple Transfer")) {
            formTypes.push('DMVREG262new', 'Reg227');
            //==> Without Title: REG 227
            if (form.transactionSelections.includes("Transaction with Vehicle Title")) {
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
        if (senerio.includes("Duplicate Stickers") ||
            senerio.includes("Duplicate Plates & Stickers")) {
            formTypes.push('Reg156');
        }
        if (
            senerio?.includes("Restoring PNO Vehicle to Operational")
        ) {
            formTypes.push("Reg256");
        }
        //==> Remove duplicates just in case
        formTypes = [...new Set(formTypes)];


        const mergedBytes = await mergeFilledPDFs(formTypes, form);
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    } catch (e) {
        console.error("error in genrating pdf : ", e)
    }
}
