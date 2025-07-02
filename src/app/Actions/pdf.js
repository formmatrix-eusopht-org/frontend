import {
    PDFDocument,
    PDFTextField,
    PDFCheckBox,
    PDFRadioGroup,
} from 'pdf-lib';

function formatSingleOwner(owner) {
    if (!owner) return '';

    const last = owner['Last Name'] ? owner['Last Name'] : '';
    const first = owner['First Name'] ? (last ? `, ${owner['First Name']}` : owner['First Name']) : '';
    const middle = owner['Middle Name'] ? ((last || first) ? `, ${owner['Middle Name']}` : owner['Middle Name']) : '';

    return `${last}${first}${middle}`;
}

const buildFieldMapping = (formData) => {
    const owner1 = formatSingleOwner(formData.ownersData[0]);
    const owner2 = formatSingleOwner(formData.ownersData[1]);
    const owner3 = formatSingleOwner(formData.ownersData[2]);

    const newOwner1 = formatSingleOwner(formData.newOwnerData[0]);
    const newOwner2 = formatSingleOwner(formData.newOwnerData[1]);
    const newOwner3 = formatSingleOwner(formData.newOwnerData[2]);
    return {
        'IDENTIFICATION NUMBER': formData.vehicleInfoState?.['Vehicle/Hull Identification Number'] || "",
        'YEAR MODEL': formData.vehicleInfoState?.['Year of Vehicle'] || "",
        'MAKE': formData.vehicleInfoState?.['Make of Vehicle OR Vessel Builder'] || "",
        'LICENSE PLATE/CF NO': formData.vehicleInfoState?.['Vehicle License Plate or Vessel CF Number'] || "",
        'MOTORCYCLE ENGINE NUMBER': formData.vehicleInfoState?.['Motorcycle Engine Number'] || '',
        'I/We': owner1,
        'to': newOwner1,
        "PRINTBUYER'S": formData.transactionSelections?.includes('Vehicle is a Gift') ? formData.newOwnerData[0]?.['Relationship with Gifter'] || '' : '',
        "PRINT BUYER'S NAME": newOwner1,
        'Purchase price': formData.newOwnerData[0]?.['6 Purchase Price/Market Value'] || "",
        'SIGNATUREx': "",
        'DL/ID OR DEALER/DISM #': formData.newOwnerData[0]?.['Driver License Number'] || '',
        "PRINT BUYER'S NAME_1": newOwner2,
        "SIGNATUREx_1": "",
        "DL/ID OR DEALER/DISM #_1": formData.newOwnerData[1]?.['Driver License Number'] || '',
        "PRINT BUYER'S NAME_2": newOwner3,
        'SIGNATUREx_2': "",
        'DL/ID OR DEALER/DISM #_2': formData.newOwnerData[2]?.['Driver License Number'] || '',
        'DAYTIME TELEPHONE NO': formData.newOwnerData[0]?.['Phone Number'] || '',
        "PRINTSELLER'S NAME": owner1,
        'SIGNATUREx_3': "",
        'DL/ID OR DEALER/DISM #_3': formData.ownersData[0]?.['Driver License Number'] || '',
        "PRINT SELLER'S NAME": owner2,
        'SIGNATUREx_4': "",
        'DL/ID OR DEALER/DISM #_4': formData.ownersData[1]?.['Driver License Number'] || '',
        "PRINT SELLER'S NAME_1": owner3,
        'SIGNATUREx_5': "",
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
        'Year/Make': formData.vehicleInfoState?.['Year of Vehicle'] || "",
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
        "1 Zip Code-1": formData.ownerAddress?.residential?.["ZIP Code"] || '',
        "County of residence": formData.ownerAddress?.residential?.["County"] || '',
        "1 Mailing Address": formData.isMailingDifferent === false ? "" : formData.ownerAddress?.mailing?.["Street"] || '',
        "1 Apt/Space Number-2": formData.ownerAddress?.mailing?.["APT./SPACE/STE.#"] || '',
        "1 City-2": formData.ownerAddress?.mailing?.["City"] || '',
        "1 States2": formData.ownerAddress?.mailing?.["State"] || '',
        "1 Zip Code-2.0": formData.ownerAddress?.mailing?.["ZIP Code"] || '',
        "Name of bank, finance company, or individual having a lien on this vehicle": formData.LegalOwnerOfRecordData?.["Name of Bank, Finance Company, or Individual having a Lien on this Vehicle"] || '',
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
        "Purchase price": formData.newOwnerData?.[0]?.["Purchase Price/Value"] || '',
        "Gift Box": "Gift Box",
        "Gift Box1": "Gift Box1",
        "market value": formData.newOwnerData?.[0]?.["Market Value"] || '',
        "true full name of new owner, last, first, middle, suffix, business name, or lessor": newOwner1,
        "6 DL/ID Card Numer-1.0.0": formData.newOwnerData[0]?.['Driver License Number']?.split(' ')[0] || '',
        "6 DL/ID Card Numer-1.0.1.0": formData.newOwnerData[1]?.['Driver License Number']?.split(' ')[0] || '',
        "6 DL/ID Card Numer-1.0.1.1": formData.newOwnerData[1]?.['Driver License Number']?.split(' ')[1] || '',
        "6 DL/ID Card Numer-1.0.1.2": formData.newOwnerData[1]?.['Driver License Number']?.split(' ')[2] || '',
        "6 DL/ID Card Numer-1.0.1.3": formData.newOwnerData[1]?.['Driver License Number']?.split(' ')[3] || '',
        "6 DL/ID Card Numer-1.0.1.4": formData.newOwnerData[1]?.['Driver License Number']?.split(' ')[4] || '',
        "6 DL/ID Card Numer-1.0.1.5": formData.newOwnerData[1]?.['Driver License Number']?.split(' ')[5] || '',
        "6 DL/ID Card Numer-1.0.1.6": formData.newOwnerData[1]?.['Driver License Number']?.split(' ')[6] || '',
        "6 DL/ID Card Numer-1.0.1.7": formData.newOwnerData[1]?.['Driver License Number']?.split(' ')[7] || '',
        "6 DL/ID Card Numer-1.1": formData.newOwnerData[0]?.['Driver License Number']?.split(' ')[1] || '',
        "6 DL/ID Card Numer-1.2": formData.newOwnerData[0]?.['Driver License Number']?.split(' ')[2] || '',
        "6 DL/ID Card Numer-1.3": formData.newOwnerData[0]?.['Driver License Number']?.split(' ')[3] || '',
        "6 DL/ID Card Numer-1.4": formData.newOwnerData[0]?.['Driver License Number']?.split(' ')[4] || '',
        "6 DL/ID Card Numer-1.5": formData.newOwnerData[0]?.['Driver License Number']?.split(' ')[5] || '',
        "6 DL/ID Card Numer-1.6": formData.newOwnerData[0]?.['Driver License Number']?.split(' ')[6] || '',
        "6 DL/ID Card Numer-1.7.0": formData.newOwnerData[0]?.['Driver License Number']?.split(' ')[7] || '',
        "6 DL/ID Card Numer-1.7.1": formData.newOwnerData[0]?.State || '',
        "6 Name First-1": newOwner2,
        "6 state": formData.newOwnerData[1]?.['State'] || '',
        "6 Name Last-2": newOwner3,
        "6 DL/ID CArd Number-2.0": formData.newOwnerData[2]?.['Driver License Number']?.split(' ')[0] || '',
        "6 DL/ID CArd Number-2.1": formData.newOwnerData[2]?.['Driver License Number']?.split(' ')[1] || '',
        "6 DL/ID CArd Number-2.2": formData.newOwnerData[2]?.['Driver License Number']?.split(' ')[2] || '',
        "6 DL/ID CArd Number-2.3": formData.newOwnerData[2]?.['Driver License Number']?.split(' ')[3] || '',
        "6 DL/ID CArd Number-2.4": formData.newOwnerData[2]?.['Driver License Number']?.split(' ')[4] || '',
        "6 DL/ID CArd Number-2.5": formData.newOwnerData[2]?.['Driver License Number']?.split(' ')[5] || '',
        "6 DL/ID CArd Number-2.6": formData.newOwnerData[2]?.['Driver License Number']?.split(' ')[6] || '',
        "6 DL/ID CArd Number-2.7": formData.newOwnerData[2]?.['Driver License Number']?.split(' ')[7] || '',
        "state-2.8": formData.newOwnerData[2]?.['State'] || '',
        "physical residence or business address.0": formData.newOwnerAddress?.["Street"] || "",
        "6 Apt/Space Number-1": formData.newOwnerAddress["APT./SPACE/STE.#"] || "",
        "6 City-1": formData.newOwnerAddress?.["City"] || "",
        "6 States1": formData.newOwnerAddress?.["State"] || "",
        "6 Zip Code-1": formData.newOwnerAddress?.["ZIP Code"] || "",
        "county residence or county where vehicle or vessle is princi.0": formData.newOwnerAddress?.County || "",
        "6 Mailing Address": formData.newOwnerMailingAddress?.Street || '',
        "6 Apt/Space Number-2": formData.newOwnerMailingAddress?.["APT./SPACE/STE.#"] || '',
        "6 City-2": formData.newOwnerMailingAddress?.City || '',
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
        "Powered by other 2": formData.statementForSomgExemptionData?.Other || '',

        //Reg343
        "Text12": `${formData.statementForSomgExemptionData?.diesel ? 'Diesel' : formData.statementForSomgExemptionData?.electricity ? 'Electricity' : formData.statementForSomgExemptionData?.Other || ''}`,
        "Text18": formData.vehicleInfoState?.['Motorcycle Engine Number'] || '',
        "Text29": formData.vehicleInfoState?.['Length (IN)'] || '',
        "Text30": formData.vehicleInfoState?.['Width (IN)'] || '',

        //check boxes
        "Group1": "Group1",
        "CheckBox": "CheckBox",
        "CheckBox_1": "CheckBox_1",
        "CheckBox_2": "CheckBox_2",
        "App for": "App for",
        "App for2": "App for2",
        "Check Box1": "Check Box1",
        "Check Box2": "Check Box2",
        "Check Box6": "Check Box6",
        "Check Box4": "Check Box4",
        "Check Box5": "Check Box5",
        "Gift Box": formData.transactionSelections?.includes("Vehicle is a Gift") ? true : false,
        "Gift Box1": formData.transactionSelections?.includes("Vehicle is a Gift") ? false : true,
        "And Box.0": formData.newOwnershipTypes?.[1] === 'and' ? true : false,
        "And Box.1": formData.newOwnershipTypes?.[2] === 'and' ? true : false,
        "And Box1.0": formData.newOwnershipTypes?.[1] === 'or' ? true : false,
        "And Box1.1": formData.newOwnershipTypes?.[2] === 'or' ? true : false,
        "Family transfer box": "Family transfer box",
        "addition/deletion box": "addition/deletion box",
        "gift box": "gift box",
        "Court order box": "Court order box",
        "inheritance box": "inheritance box",
        "Biennial Smog cert box": "Biennial Smog cert box",
        "Powered by box": "Powered by box",
        "Powered by electricity box": formData.statementForSomgExemptionData?.electricity ? true : false,
        "Powered by diesel box": formData.statementForSomgExemptionData?.diesel ? true : false,
        "Powered by other box": formData.statementForSomgExemptionData?.Other ? true : false,
        "Paren, grandparent, etc box": "Paren, grandparent, etc box",
        "Companies leasing vehicle box": "Companies leasing vehicle box",
        "Lessor/Lessee of vehicle box": "Lessor/Lessee of vehicle box",
        "Lessor/lessee operator box": "Lessor/lessee operator box",
        "Transfer only box": "Transfer only box",
        "Title only box": "Title only box",
        "checkbox_76urox": "checkbox_76urox",
        "checkbox_77lxng": "checkbox_77lxng",
        "checkbox_78tyvm": "checkbox_78tyvm",
        "checkbox_76bcix": "checkbox_76bcix",
        "checkbox_80yjyf": "checkbox_80yjyf",
        "checkbox_81iyuu": "checkbox_81iyuu",
        "checkbox_82vosg": "checkbox_82vosg",
        "Check Box9": "Check Box9",
        "Check Box10": "Check Box10",
        "Check Box11": "Check Box11",
        "Check Box12": "Check Box12",
        "Check Box13": "Check Box13",
        "Check Box16": "Check Box16",
        "Check Box17": "Check Box17",
        "Check Box18": "Check Box18",
        "Check Box19": "Check Box19",
        "Check Box22": "Check Box22",
        "Check Box23": "Check Box23",
        "Check Box29": "Check Box29",
        "Check Box30": "Check Box30",
        "Check Box32": "Check Box32",
        "Check Box33": "Check Box33",
        "Check Box49": "Check Box49",
        "Check Box50": "Check Box50",
        "Check Box52": "Check Box52",
        "Check Box53": "Check Box53",
        "Check Box54": "Check Box54",
        "Check Box62": "Check Box62",
        "Check Box63": "Check Box63",
        "Check Box64": "Check Box64",
        "Check Box65": "Check Box65",
        "Check Box66": "Check Box66",
        "Check Box67": "Check Box67",
        "Check Box68": "Check Box68",
        "Check Box69": "Check Box69",
        "Check Box73": "Check Box73",
        "Check Box74": "Check Box74",
        "Check Box75": "Check Box75",
        "Check Box76": "Check Box76",
        "Check Box78": "Check Box78",
        "Check Box79": "Check Box79",
        "Check Box81": "Check Box81",
        "Check Box82": "Check Box82",
        "Check Box83": "Check Box83",
        "Check Box85": "Check Box85",
        "Check Box86": "Check Box86",
        "Check Box87": "Check Box87",
        "Check Box88": "Check Box88",
        "Check Box89": "Check Box89",
        "Check Box90": "Check Box90",
        "Check Box91": "Check Box91",
        "Check Box92": "Check Box92",
        "Check Box93": "Check Box93",
        "Check Box94": "Check Box94",
        "Check Box95": "Check Box95",
        "Check Box109": "Check Box109",
        "Check Box20": "Check Box20",
        "Check Box24": "Check Box24",
        "Check Box25": "Check Box25",
        "Check Box26": "Check Box26",
        "Check Box27": "Check Box27",
        "Check Box31": "Check Box31",
        "Check Box34": "Check Box34",
        "Check Box35": "Check Box35",
        "Check Box36": "Check Box36",
        "Check Box51": "Check Box51",
        "Check Box55": "Check Box55",
        "Check Box70": "Check Box70",
        "Check Box71": "Check Box71",
        "Check Box77": "Check Box77",
        "Check Box80": "Check Box80",
        "Check Box130": "Check Box130",
        "Check Box131": "Check Box131",
        "Check Box133": "Check Box133",
        "Check Box134": "Check Box134",
        "Check Box135": "Check Box135",
        "Check Box140": "Check Box140",
        "Check Box150": "Check Box150",
        "Check Box151": "Check Box151",
        "Check Box152": "Check Box152",
        "Check Box153": "Check Box153",
        "Check Box154": "Check Box154",
        "Check Box155": "Check Box155",
        "Check Box157": "Check Box157",
        "Check Box159": "Check Box159",
        "Check Box161": "Check Box161",
        "Check Box162": "Check Box162",
        "Check Box163": "Check Box163",
        "Check Box164": "Check Box164",
        "Check Box166": "Check Box166",
        "Check Box167": "Check Box167",
        "Check Box169": "Check Box169",
        "Check Box170": "Check Box170",
        "Check Box171": "Check Box171",
        "Check Box173": "Check Box173",
        "Check Box174": "Check Box174",
        "Check Box175": "Check Box175",
        "Check Box176": "Check Box176",
        "Check Box177": "Check Box177",
        "Check Box178": "Check Box178",
        "Check Box179": "Check Box179",
        "Check Box180": "Check Box180",
        "Check Box181": "Check Box181",
        "Check Box182": "Check Box182",
        "Check Box183": "Check Box183",
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
                // console.log(field.getName(), "field");

                try {
                    if (field instanceof PDFTextField) {
                        field.setText(value);
                        // console.log(`${name} with value:`, value);

                        field.setFontSize(11);
                    } else if (field instanceof PDFCheckBox) {
                        console.log(`${name}`);
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

            // Second pass: Make all fields read-only
            // fields.forEach((field) => {
            //     try {
            //         // Try all available methods to set read-only
            //         if (typeof field.enableReadOnly === 'function') {
            //             field.enableReadOnly();
            //         }
            //         // if (typeof field.setReadOnly === 'function') {
            //         // field.setReadOnly(true);
            //         // }

            //         // Additional visual indication
            //         // if (field instanceof PDFTextField) {
            //         //     field.setBackgroundColor([0.95, 0.95, 0.95]);
            //         // }
            //     } catch (e) {
            //         console.warn(`Could not set read-only for field ${field.getName()}:`, e.message);
            //     }
            // });

            // Optional: Flatten the form to make fields permanently uneditable
            // form.flatten();

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

        if (senerio.includes('Disabled Person Placards/Plates')) {
            formTypes = ['REG195'];
        } else if (
            senerio.includes('Personalized Plates (Order)') ||
            senerio.includes('Personalized Plates (Reassignment)') ||
            senerio.includes('Personalized Plates (Replacement)') ||
            senerio.includes('Personalized Plates (Exchange)')
        ) {
            formTypes = ['REG17'];
        } else if (
            senerio.includes("Filing for Planned Non-Operation (PNO)") ||
            senerio.includes('Certificate Of Non-Operation')
        ) {
            formTypes = ['REG102'];
        } else if (senerio.includes('Add Lienholder')) {
            formTypes = ['Reg227'];
        } else if (senerio.includes('Remove Lienholder')) {
            formTypes = ['Reg227', 'DMVReg166'];
        } else if (senerio.includes('Duplicate Title')) {
            formTypes = ['Reg227'];
        } else if (
            senerio.includes('Duplicate Registration') ||
            senerio.includes('Duplicate Plates & Stickers') ||
            senerio.includes('Duplicate Stickers')
        ) {
            formTypes = ['Reg156'];
        } else if (senerio.includes('Name Change')) {
            formTypes = ['Reg256'];
        } else if (senerio.includes('Change Of Address')) {
            formTypes = ['DMV14'];
        } else if (senerio.includes('Salvage')) {
            formTypes = ['Reg488c'];
        } else if (senerio.includes('Restoring PNO Vehicle to Operational')) {
            formTypes = ['Reg256'];
        } else if (senerio.includes('Commercial Vehicle')) {
            formTypes = ['Reg343', 'Reg4008', 'Reg256'];
        } else if (senerio.includes('Simple Transfer')) {
            formTypes = ['DMVREG262', 'Reg227'];
            if (
                form.transactionSelections?.includes('Family Transfer') ||
                form.transactionSelections?.includes('Vehicle is a Gift') ||
                form.transactionSelections?.includes('Smog Exemption')
            ) {
                formTypes.push('Reg256');
            }
            if (form.transactionSelections?.includes('Out of State Title')) {
                formTypes.push('Reg343');
            }
        }

        const mergedBytes = await mergeFilledPDFs(formTypes, form);
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    } catch (e) {
        console.error("error in genrating pdf : ", e)
    }
}