export const seneriosDetails = [
    {
        form: "Simple Transfer",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [
                {
                    label: 'Transaction with Vehicle Title',
                    type: "checkbox",
                    placeholder: 'Transaction with Vehicle Title'
                }, {
                    label: 'Out of State Title',
                    type: "checkbox",
                    placeholder: 'Out of State Title'
                }, {
                    label: 'There is a Current Lienholder',
                    type: "checkbox",
                    placeholder: 'There is a Current Lienholder'
                }, {
                    label: 'Is the Vehicle a Motorcycle',
                    type: "checkbox",
                    placeholder: 'Is the Vehicle a Motorcycle'
                }, {
                    label: 'Vehicle is a Gift',
                    type: "checkbox",
                    placeholder: 'Vehicle is a Gift'
                }, {
                    label: 'Family Transfer',
                    type: "checkbox",
                    placeholder: 'Family Transfer'
                }, {
                    label: 'Smog Exemption',
                    type: "checkbox",
                    placeholder: 'Smog Exemption'
                }
            ]
        }, {
            reference: "Type of Vehicle",
            blockName: "Type of Vehicle",
            fields: [
                {
                    label: 'AUTO',
                    type: "checkbox",
                    placeholder: 'AUTO'
                }, {
                    label: 'MOTORCYCLE',
                    type: "checkbox",
                    placeholder: 'MOTORCYCLE'
                }, {
                    label: 'OFF HIGHWAY',
                    type: "checkbox",
                    placeholder: 'OFF HIGHWAY'
                }, {
                    label: 'TRAILER COACH',
                    type: "checkbox",
                    placeholder: 'TRAILER COACH'
                }
            ]
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [
                {
                    label: 'Motorcycle Engine Number',
                    type: "input field",
                    placeholder: 'Motorcycle Engine Number'
                }, {
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                }, {
                    label: 'Length (IN)',
                    type: "input field",
                    placeholder: 'Length (IN)'
                }, {
                    label: 'Width (IN)',
                    type: "input field",
                    placeholder: 'Width (IN)'
                }, {
                    label: 'Mileage of Vehicle',
                    type: "input field",
                    placeholder: 'Mileage of Vehicle'
                }, {
                    label: 'NOT Actual Mileage',
                    type: "checkbox",
                    placeholder: 'NOT Actual Mileage'
                }, {
                    label: 'Mileage Exceeds Mechanical Limit',
                    type: "checkbox",
                    placeholder: 'Mileage Exceeds Mechanical Limit'
                }, {
                    label: 'If kilometers check this box',
                    type: "checkbox",
                    placeholder: 'If kilometers check this box'
                }
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 3,
            fields: [
                { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' },
                { label: 'Date of Sale', type: 'date', placeholder: 'MM/DD/YYYY' },
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Legal Owner of Record",
            blockName: "Legal Owner of Record",
            // subOptions: [
            //     {
            //         label: "If mailing address is different",
            //         fieldName: "Mailing Address",
            //         type: "radiocheckbox",
            //         subFields: [
            //             {
            //                 label: 'Street',
            //                 type: "input field",
            //                 placeholder: 'Street'
            //             }, {
            //                 label: 'APT./SPACE/STE.#',
            //                 type: "address",
            //                 placeholder: 'APT./SPACE/STE.#'
            //             }, {
            //                 label: 'City',
            //                 type: "input field",
            //                 placeholder: 'City'
            //             }, {
            //                 label: 'State',
            //                 type: "dropdown",
            //                 placeholder: 'State'
            //             }, {
            //                 label: 'ZIP Code',
            //                 type: "input field",
            //                 placeholder: 'ZIP Code'
            //             },
            //         ]
            //     },
            // ],
            fields: [
                {
                    label: 'Name of Bank, Finance Company, or Individual having a Lien on this Vehicle',
                    type: "input field",
                    placeholder: 'Name of Bank, Finance Company, or Individual having a Lien on this Vehicle'
                }, {
                    label: 'ELT Number (3 digits)',
                    type: "input field",
                    placeholder: 'ELT Number (3 digits)'
                }, {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "New Registered Owner(s)",
            blockName: "New Registered Owner(s)",
            ownersNumber: 3,
            fields: [
                {
                    label: 'First Name',
                    type: "input field",
                    placeholder: 'First Name'
                }, {
                    label: 'Middle Name',
                    type: "input field",
                    placeholder: 'Middle Name'
                }, {
                    label: 'Last Name',
                    type: "input field",
                    placeholder: 'Last Name'
                }, {
                    label: 'Driver License Number',
                    type: "input field",
                    placeholder: 'Driver License Number'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                }, {
                    label: 'Purchase Price/Value',
                    type: "input field",
                    placeholder: 'Enter Amount'
                }, {
                    label: 'Market Value',
                    type: "input field",
                    placeholder: 'Enter Market Value'
                }, {
                    label: 'Relationship with Gifter',
                    type: "input field",
                    placeholder: 'Enter Relationship'
                }, {
                    label: 'Gift Value',
                    type: "input field",
                    placeholder: 'Enter Gift Value '
                }
            ]
        }, {
            reference: "New Registered Owner Address",
            blockName: "Address",
            subOptions: [
                {
                    label: "If mailing address is different",
                    fieldName: "Mailing Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }, {
                    label: "If lessee address is different",
                    fieldName: "Lessee Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }, {
                    label: "Trailer/Vessel location",
                    fieldName: "Vessel or Trailer Coach Principally Kept At",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'County',
                            type: "input field",
                            placeholder: 'County'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "DATE INFORMATION",
            blockName: "DATE INFORMATION",
            fields: [
                {
                    label: 'DATE VEHICLE ENTERED OR WILL ENTER CALIFORNIA (CA):',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE VEHICLE FIRST OPERATED IN CALIFORNIA:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE YOU WENT TO WORK IN CALIFORNIA, OBTAINED A CA DRIVER LICENSE, OR BECAME A RESIDENT:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE VEHICLE WAS PURCHASED OR ACQUIRED:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                },
            ]
        }, {
            reference: "Vehicle Status Information",
            blockName: "Vehicle Status Information",
            fields: [
                {
                    label:
                        "IF VEHICLE WAS PREVIOUSLY REGISTERED IN CA, THEN REGISTERED OR LOCATED OUTSIDE CA AND HAS NOW RETURNED, ENTER DATE VEHICLE ENTERED CA. IF YOU DID NOT OWN THE VEHICLE AT ENTRY, CHECK BOX:",
                    type: "checkbox",
                    placeholder:
                        "IF VEHICLE WAS PREVIOUSLY REGISTERED IN CA, THEN REGISTERED OR LOCATED OUTSIDE CA AND HAS NOW RETURNED, ENTER DATE VEHICLE ENTERED CA. IF YOU DID NOT OWN THE VEHICLE AT ENTRY, CHECK BOX:",
                },
                {
                    label: "IF YOU ARE NOT A CA RESIDENT, CHECK THIS BOX:",
                    type: "checkbox",
                    placeholder: "IF YOU ARE NOT A CA RESIDENT, CHECK THIS BOX:",
                },
                {
                    label: "Vehicle Condition",
                    type: "radiobutton",
                    options: [
                        { value: "NEW", name: "NEW" },
                        { value: "USED", name: "USED" },
                    ],
                },
                {
                    label: "Purchase Location",
                    type: "radiobutton",
                    options: [
                        { value: "INSIDE CA", name: "INSIDE CA" },
                        { value: "OUTSIDE CA", name: "OUTSIDE CA" },
                    ],
                }
            ],
        }, {
            reference: "Statement for Smog Exemption",
            blockName: "Statement for Smog Exemption",
            fields: [
                {
                    label:
                        "The last smog certification was obtained within the last 90 days",
                    type: "checkbox",
                    placeholder:
                        "The last smog certification was obtained within the last 90 days",
                },
                {
                    label: "It is powered by",
                    type: "checkbox",
                    placeholder: "It is powered by",
                    subOptions: [
                        { label: "electricity", type: "checkbox" },
                        { label: "diesel", type: "checkbox" },
                        { label: "Other", type: "checkbox" }
                    ]
                },
                {
                    label: "It is located outside the State of California. (Exception: Nevada and Mexico)",
                    type: "checkbox",
                    placeholder: "It is located outside the State of California. (Exception: Nevada and Mexico)",
                },
                {
                    label: "It is being transferred from/between:",
                    type: "checkbox",
                    placeholder: "It is being transferred from/between:",
                    subText: "The parent, grandparent, child, grandchild, brother, sister, spouse, or domestic partner (as defined in Family Code §297) of the transferee.*"
                },
                {
                    label: "A sole proprietorship to the proprietor as owner.*",
                    type: "checkbox",
                    placeholder: "A sole proprietorship to the proprietor as owner.*",
                },
                {
                    label: "Companies whose principal business is leasing vehicles. There is no change in lessee or operator.*",
                    type: "checkbox",
                    placeholder: "Companies whose principal business is leasing vehicles. There is no change in lessee or operator.*",
                },
                {
                    label: "Lessor and lessee of vehicle, and no change in the lessee or operator of the vehicle.*",
                    type: "checkbox",
                    placeholder: "Lessor and lessee of vehicle, and no change in the lessee or operator of the vehicle.*",
                },
                {
                    label: "Lessor and person who has been lessee's operator of the vehicle for at least one year.*",
                    type: "checkbox",
                    placeholder: "Lessor and person who has been lessee's operator of the vehicle for at least one year.*",
                },
                {
                    label: "Individual(s) being added as registered owner(s).*",
                    type: "checkbox",
                    placeholder: "Individual(s) being added as registered owner(s).*",
                }
            ],
        }, {
            blockName: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
            reference: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
            fields: [
                {
                    label: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
                    type: "radiobutton",
                    options: [
                        { value: "dealer", name: "DEALER" },
                        { value: "private party", name: "PRIVATE PARTY" },
                        { value: "dismantler", name: "DISMANTLER" },
                        { value: "family", name: "IMMEDIATE FAMILY MEMBER – STATE RELATIONSHIP:" },
                    ],
                },
                {
                    label: "Vehicle Modifications",
                    type: "radiobutton",
                    options: [
                        { value: "yes", name: "YES" },
                        { value: "no", name: "NO" },
                    ],
                },
            ],
        }, {
            blockName: "FOR OUT-OF-STATE OR OUT-OF-COUNTRY VEHICLES",
            reference: "FOR OUT-OF-STATE OR OUT-OF-COUNTRY VEHICLES",
            fields: [
                {
                    label: "For vehicle which enterthe state within 1 year of purchase, was Sale Tax paid to another state?",
                    type: "radiobutton",
                    options: [
                        { value: "n/a", name: "N/A" },
                        { value: "yes", name: "YES" },
                        { value: "no", name: "NO" },
                    ],
                },
                {
                    label: "Vehicle Modifications",
                    type: "radiobutton",
                    options: [
                        { value: "yes", name: "YES" },
                        { value: "no", name: "NO" },
                    ],
                },
            ],
        }, {
            reference: "Power of Attorney",
            blockName: "Power of Attorney",
            fields: [
                {
                    label: 'I/We',
                    type: "input field",
                    placeholder: 'PRINT NAMES'
                }, {
                    label: 'appoint',
                    type: "input field",
                    placeholder: 'APPOINTEE NAME(S)'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Missing Title Reason",
            blockName: "Missing Title Reason",
            fields: [
                {
                    label: 'Select reason',
                    type: "dropdown",
                    placeholder: 'Select reason'
                }
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Buyer's Driver's License or ID",
                    // unless: []
                },
                {
                    label: "Collect Smog Certificate",
                    // unless: ["smog exempt", "motorcycle"]
                }, {
                    label: "Have a DMV Authorized Agent HandFill REG 31",
                    // unless: ["smog exempt", "motorcycle"]
                }
            ]
        }
        ]
    }, {
        form: "Duplicate Title",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [
                {
                    label: 'There is a Current Lienholder',
                    type: "checkbox",
                    placeholder: 'There is a Current Lienholder'
                }
            ]
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [
                {
                    label: 'Motorcycle Engine Number',
                    type: "input field",
                    placeholder: 'Motorcycle Engine Number'
                }, {
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                }, {
                    label: 'Length (IN)',
                    type: "input field",
                    placeholder: 'Length (IN)'
                }, {
                    label: 'Width (IN)',
                    type: "input field",
                    placeholder: 'Width (IN)'
                }, {
                    label: 'Mileage of Vehicle',
                    type: "input field",
                    placeholder: 'Mileage of Vehicle'
                }, {
                    label: 'NOT Actual Mileage',
                    type: "checkbox",
                    placeholder: 'NOT Actual Mileage'
                }, {
                    label: 'Mileage Exceeds Mechanical Limit',
                    type: "checkbox",
                    placeholder: 'Mileage Exceeds Mechanical Limit'
                }, {
                    label: 'If kilometers check this box',
                    type: "checkbox",
                    placeholder: 'If kilometers check this box'
                }
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 2,
            fields: [
                { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' },
                { label: 'Date of Sale', type: 'date', placeholder: 'MM/DD/YYYY' },
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Legal Owner of Record",
            blockName: "Legal Owner of Record",
            subOptions: [
                {
                    label: "If mailing address is different",
                    fieldName: "Mailing Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                },
            ],
            fields: [
                {
                    label: 'Name of Bank, Finance Company, or Individual having a Lien on this Vehicle',
                    type: "input field",
                    placeholder: 'Name of Bank, Finance Company, or Individual having a Lien on this Vehicle'
                }, {
                    label: 'ELT Number (3 digits)',
                    type: "input field",
                    placeholder: 'ELT Number (3 digits)'
                }, {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Missing Title Reason",
            blockName: "Missing Title Reason",
            fields: [
                {
                    label: 'Select reason',
                    type: "dropdown",
                    placeholder: 'Select reason'
                }
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                },
                {
                    label: "Collect Title Replacement Fee",
                }
            ]
        }
        ]
    }, {
        form: "Duplicate Registration",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [
                {
                    label: 'Is the Vehicle a Motorcycle',
                    type: "checkbox",
                    placeholder: 'Is the Vehicle a Motorcycle'
                }
            ]
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [
                {
                    label: 'Motorcycle Engine Number',
                    type: "input field",
                    placeholder: 'Motorcycle Engine Number'
                }, {
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                }, {
                    label: 'Length (IN)',
                    type: "input field",
                    placeholder: 'Length (IN)'
                }, {
                    label: 'Width (IN)',
                    type: "input field",
                    placeholder: 'Width (IN)'
                }
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 2,
            commonFields: {
                label: 'Title if Signing for a Company',
                type: "input field",
                placeholder: 'Enter Title'
            },
            fields: [
                { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' },
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                },
                {
                    label: "Collect Replacement Registration Fee",
                }
            ]
        }
        ]
    }, {
        form: "Name Change",
        blocks: [
            {
                reference: "Vehicle Information",
                blockName: "Vehicle Information",
                fields: [{
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                },
                ]
            }, {
                reference: "Name Statement (Ownership Certificate Required)",
                blockName: "Name Statement (Ownership Certificate Required)",
                fields: []
            }, {
                reference: "New Registered Owner(s)",
                blockName: "New Registered Owner(s)",
                fields: [
                    { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                    { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                    { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                    { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                    { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                    { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' },
                ]
            }, {
                reference: "Documents Received",
                blockName: "Documents Received",
                fields: [
                    {
                        label: "Collect Legal Proof of Name Change",
                    },
                    {
                        label: "Collect Original Vehicle Title",
                    },
                    {
                        label: "Collect a copy of Registered Owner’s updated CA Driver’s License or ID",
                    },
                ]
            }
        ]
    },
    {
        form: "Multiple Transfer",
        blocks: [{
            reference: "Multiple Transfer",
            blockName: "Multiple Transfer",
            transfersNumber: 5,
            fields: [
                {
                    label: 'Transfer Numbers',
                }
            ]
        },
        {
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [
                {
                    label: 'Transaction with Vehicle Title',
                    type: "checkbox",
                    placeholder: 'Transaction with Vehicle Title'
                }, {
                    label: 'Out of State Title',
                    type: "checkbox",
                    placeholder: 'Out of State Title'
                }, {
                    label: 'There is a Current Lienholder',
                    type: "checkbox",
                    placeholder: 'There is a Current Lienholder'
                }, {
                    label: 'Is the Vehicle a Motorcycle',
                    type: "checkbox",
                    placeholder: 'Is the Vehicle a Motorcycle'
                }, {
                    label: 'Vehicle is a Gift',
                    type: "checkbox",
                    placeholder: 'Vehicle is a Gift'
                }, {
                    label: 'Family Transfer',
                    type: "checkbox",
                    placeholder: 'Family Transfer'
                }, {
                    label: 'Smog Exemption',
                    type: "checkbox",
                    placeholder: 'Smog Exemption'
                }
            ]
        }, {
            reference: "Type of Vehicle",
            blockName: "Type of Vehicle",
            fields: [
                {
                    label: 'AUTO',
                    type: "checkbox",
                    placeholder: 'AUTO'
                }, {
                    label: 'MOTORCYCLE',
                    type: "checkbox",
                    placeholder: 'MOTORCYCLE'
                }, {
                    label: 'OFF HIGHWAY',
                    type: "checkbox",
                    placeholder: 'OFF HIGHWAY'
                }, {
                    label: 'TRAILER COACH',
                    type: "checkbox",
                    placeholder: 'TRAILER COACH'
                }
            ]
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [
                {
                    label: 'Motorcycle Engine Number',
                    type: "input field",
                    placeholder: 'Motorcycle Engine Number'
                }, {
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                }, {
                    label: 'Length (IN)',
                    type: "input field",
                    placeholder: 'Length (IN)'
                }, {
                    label: 'Width (IN)',
                    type: "input field",
                    placeholder: 'Width (IN)'
                }, {
                    label: 'Mileage of Vehicle',
                    type: "input field",
                    placeholder: 'Mileage of Vehicle'
                }, {
                    label: 'NOT Actual Mileage',
                    type: "checkbox",
                    placeholder: 'NOT Actual Mileage'
                }, {
                    label: 'Mileage Exceeds Mechanical Limit',
                    type: "checkbox",
                    placeholder: 'Mileage Exceeds Mechanical Limit'
                }, {
                    label: 'If kilometers check this box',
                    type: "checkbox",
                    placeholder: 'If kilometers check this box'
                }
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 3,
            fields: [
                { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' },
                { label: 'Date of Sale', type: 'date', placeholder: 'MM/DD/YYYY' },
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Legal Owner of Record",
            blockName: "Legal Owner of Record",
            subOptions: [
                {
                    label: "If mailing address is different",
                    fieldName: "Mailing Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                },
            ],
            fields: [
                {
                    label: 'Name of Bank, Finance Company, or Individual having a Lien on this Vehicle',
                    type: "input field",
                    placeholder: 'Name of Bank, Finance Company, or Individual having a Lien on this Vehicle'
                }, {
                    label: 'ELT Number (3 digits)',
                    type: "input field",
                    placeholder: 'ELT Number (3 digits)'
                }, {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "New Registered Owner(s)",
            blockName: "New Registered Owner(s)",
            ownersNumber: 3,
            fields: [
                {
                    label: 'First Name',
                    type: "input field",
                    placeholder: 'First Name'
                }, {
                    label: 'Middle Name',
                    type: "input field",
                    placeholder: 'Middle Name'
                }, {
                    label: 'Last Name',
                    type: "input field",
                    placeholder: 'Last Name'
                }, {
                    label: 'Driver License Number',
                    type: "input field",
                    placeholder: 'Driver License Number'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                }, {
                    label: 'Purchase Price/Value',
                    type: "input field",
                    placeholder: 'Enter Amount'
                }, {
                    label: 'Market Value',
                    type: "input field",
                    placeholder: 'Enter Market Value'
                }, {
                    label: 'Relationship with Gifter',
                    type: "input field",
                    placeholder: 'Enter Relationship'
                }, {
                    label: 'Gift Value',
                    type: "input field",
                    placeholder: 'Enter Gift Value '
                }
            ]
        }, {
            reference: "New Registered Owner Address",
            blockName: "Address",
            subOptions: [
                {
                    label: "If mailing address is different",
                    fieldName: "Mailing Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }, {
                    label: "If lessee address is different",
                    fieldName: "Lessee Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }, {
                    label: "Trailer/Vessel location",
                    fieldName: "Vessel or Trailer Coach Principally Kept At",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'County',
                            type: "input field",
                            placeholder: 'County'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "DATE INFORMATION",
            blockName: "DATE INFORMATION",
            fields: [
                {
                    label: 'DATE VEHICLE ENTERED OR WILL ENTER CALIFORNIA (CA):',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE VEHICLE FIRST OPERATED IN CALIFORNIA:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE YOU WENT TO WORK IN CALIFORNIA, OBTAINED A CA DRIVER LICENSE, OR BECAME A RESIDENT:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE VEHICLE WAS PURCHASED OR ACQUIRED:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                },
            ]
        }, {
            reference: "Vehicle Status Information",
            blockName: "Vehicle Status Information",
            fields: [
                {
                    label:
                        "IF VEHICLE WAS PREVIOUSLY REGISTERED IN CA, THEN REGISTERED OR LOCATED OUTSIDE CA AND HAS NOW RETURNED, ENTER DATE VEHICLE ENTERED CA. IF YOU DID NOT OWN THE VEHICLE AT ENTRY, CHECK BOX:",
                    type: "checkbox",
                    placeholder:
                        "IF VEHICLE WAS PREVIOUSLY REGISTERED IN CA, THEN REGISTERED OR LOCATED OUTSIDE CA AND HAS NOW RETURNED, ENTER DATE VEHICLE ENTERED CA. IF YOU DID NOT OWN THE VEHICLE AT ENTRY, CHECK BOX:",
                },
                {
                    label: "IF YOU ARE NOT A CA RESIDENT, CHECK THIS BOX:",
                    type: "checkbox",
                    placeholder: "IF YOU ARE NOT A CA RESIDENT, CHECK THIS BOX:",
                },
                {
                    label: "Vehicle Condition",
                    type: "radiobutton",
                    options: [
                        { value: "NEW", name: "NEW" },
                        { value: "USED", name: "USED" },
                    ],
                },
                {
                    label: "Purchase Location",
                    type: "radiobutton",
                    options: [
                        { value: "INSIDE CA", name: "INSIDE CA" },
                        { value: "OUTSIDE CA", name: "OUTSIDE CA" },
                    ],
                }
            ],
        }, {
            reference: "Statement for Smog Exemption",
            blockName: "Statement for Smog Exemption",
            fields: [
                {
                    label:
                        "The last smog certification was obtained within the last 90 days",
                    type: "checkbox",
                    placeholder:
                        "The last smog certification was obtained within the last 90 days",
                },
                {
                    label: "It is powered by",
                    type: "checkbox",
                    placeholder: "It is powered by",
                    subOptions: [
                        { label: "electricity", type: "checkbox" },
                        { label: "diesel", type: "checkbox" },
                        { label: "Other", type: "checkbox" }
                    ]
                },
                {
                    label: "It is located outside the State of California. (Exception: Nevada and Mexico)",
                    type: "checkbox",
                    placeholder: "It is located outside the State of California. (Exception: Nevada and Mexico)",
                },
                {
                    label: "It is being transferred from/between:",
                    type: "checkbox",
                    placeholder: "It is being transferred from/between:",
                    subText: "The parent, grandparent, child, grandchild, brother, sister, spouse, or domestic partner (as defined in Family Code §297) of the transferee.*"
                },
                {
                    label: "A sole proprietorship to the proprietor as owner.*",
                    type: "checkbox",
                    placeholder: "A sole proprietorship to the proprietor as owner.*",
                },
                {
                    label: "Companies whose principal business is leasing vehicles. There is no change in lessee or operator.*",
                    type: "checkbox",
                    placeholder: "Companies whose principal business is leasing vehicles. There is no change in lessee or operator.*",
                },
                {
                    label: "Lessor and lessee of vehicle, and no change in the lessee or operator of the vehicle.*",
                    type: "checkbox",
                    placeholder: "Lessor and lessee of vehicle, and no change in the lessee or operator of the vehicle.*",
                },
                {
                    label: "Lessor and person who has been lessee's operator of the vehicle for at least one year.*",
                    type: "checkbox",
                    placeholder: "Lessor and person who has been lessee's operator of the vehicle for at least one year.*",
                },
                {
                    label: "Individual(s) being added as registered owner(s).*",
                    type: "checkbox",
                    placeholder: "Individual(s) being added as registered owner(s).*",
                }
            ],
        }, {
            blockName: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
            reference: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
            fields: [
                {
                    label: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
                    type: "radiobutton",
                    options: [
                        { value: "dealer", name: "DEALER" },
                        { value: "private party", name: "PRIVATE PARTY" },
                        { value: "dismantler", name: "DISMANTLER" },
                        { value: "family", name: "IMMEDIATE FAMILY MEMBER – STATE RELATIONSHIP:" },
                    ],
                },
                {
                    label: "Vehicle Modifications",
                    type: "radiobutton",
                    options: [
                        { value: "yes", name: "YES" },
                        { value: "no", name: "NO" },
                    ],
                },
            ],
        }, {
            blockName: "FOR OUT-OF-STATE OR OUT-OF-COUNTRY VEHICLES",
            reference: "FOR OUT-OF-STATE OR OUT-OF-COUNTRY VEHICLES",
            fields: [
                {
                    label: "For vehicle which enterthe state within 1 year of purchase, was Sale Tax paid to another state?",
                    type: "radiobutton",
                    options: [
                        { value: "n/a", name: "N/A" },
                        { value: "yes", name: "YES" },
                        { value: "no", name: "NO" },
                    ],
                },
                {
                    label: "Vehicle Modifications",
                    type: "radiobutton",
                    options: [
                        { value: "yes", name: "YES" },
                        { value: "no", name: "NO" },
                    ],
                },
            ],
        }, {
            reference: "Power of Attorney",
            blockName: "Power of Attorney",
            fields: [
                {
                    label: 'I/We',
                    type: "input field",
                    placeholder: 'PRINT NAMES'
                }, {
                    label: 'appoint',
                    type: "input field",
                    placeholder: 'APPOINTEE NAME(S)'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Missing Title Reason",
            blockName: "Missing Title Reason",
            fields: [
                {
                    label: 'Select reason',
                    type: "dropdown",
                    placeholder: 'Select reason'
                }
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Buyer's Driver's License or ID",
                    // unless: []
                },
                {
                    label: "Collect Smog Certificate",
                    // unless: ["smog exempt", "motorcycle"]
                }, {
                    label: "Have a DMV Authorized Agent HandFill REG 31",
                    // unless: ["smog exempt", "motorcycle"]
                }
            ]
        }
        ]
    },
    {
        form: "Duplicate Stickers",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [{
                label: 'Is the Vehicle a Motorcycle',
                type: "checkbox",
                placeholder: 'Is the Vehicle a Motorcycle'
            }
            ]
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [
                {
                    label: 'Motorcycle Engine Number',
                    isHidden: true,
                    type: "input field",
                    placeholder: 'Motorcycle Engine Number'
                }, {
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                }
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 2,
            commonFields: {
                label: 'Title if Signing for a Company',
                type: "input field",
                placeholder: 'Enter Title'
            },
            fields: [
                {
                    label: 'First Name',
                    type: "input field",
                    placeholder: 'First Name'
                }, {
                    label: 'Middle Name',
                    type: "input field",
                    placeholder: 'Middle Name'
                }, {
                    label: 'Last Name',
                    type: "input field",
                    placeholder: 'Last Name'
                }, {
                    label: 'Driver License Number',
                    type: "input field",
                    placeholder: 'Driver License Number'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                }
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "THE ITEM REQUESTED WAS",
            blockName: "THE ITEM REQUESTED WAS",
            fields: [
                {
                    label: "LOST",
                    value: "LOST",
                }, {
                    label: "STOLEN",
                    value: "STOLEN",
                }, {
                    label: "DESTROYED/MUTILATED (REMNANTS/REMAINS OF THE PLATE(S) MUST BE SURRENDERED TO DMV)",
                    value: "DESTROYED/MUTILATED",
                }, {
                    label: "NOT RECEIVED FROM DMV (ALLOW 30 DAYS FROM ISSUE DATE BEFORE REAPPLYING)",
                    value: "NOT RECEIVED FROM DMV",
                }, {
                    label: "NOT RECEIVED FROM PRIOR OWNER",
                    value: "NOT RECEIVED FROM PRIOR OWNER",
                }, {
                    label: "SURRENDERED",
                    value: "SURRENDERED",
                }, {
                    label: "SPECIAL PLATES WERE RETAINED BY OWNER (PERSONALIZED, DISABLED PERSON, DISABLED VETERAN)",
                    value: "SPECIAL PLATES",
                }, {
                    label: "REQUESTING REGISTRATION CARD WITH CURRENT ADDRESS",
                    value: "REQUESTING REGISTRATION CARD",
                }, {
                    label: "PER CVC §4467 – COPY OF A POLICE REPORT, COURT DOCUMENTATION, OR OTHER LAW ENFORCEMENT DOCUMENTATION REQUIRED.",
                    value: "PER CVC §4467",
                }
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                },
                {
                    label: "Collect Sticker Replacement Fee",
                },
                {
                    label: "Issue only one sticker",
                }
            ]
        }
        ]
    }, {
        form: "Duplicate Plates & Stickers",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [
                {
                    label: 'Is the Vehicle a Motorcycle',
                    type: "checkbox",
                    placeholder: 'Is the Vehicle a Motorcycle'
                }
            ]
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [
                {
                    label: 'Motorcycle Engine Number',
                    type: "input field",
                    placeholder: 'Motorcycle Engine Number'
                }, {
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                }
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 2,
            commonFields: {
                label: 'Title if Signing for a Company',
                type: "input field",
                placeholder: 'Enter Title'
            },
            fields: [
                { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' },
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "THE ITEM REQUESTED WAS",
            blockName: "THE ITEM REQUESTED WAS",
            fields: [
                {
                    label: "LOST",
                    value: "LOST",
                }, {
                    label: "STOLEN",
                    value: "STOLEN",
                }, {
                    label: "DESTROYED/MUTILATED (REMNANTS/REMAINS OF THE PLATE(S) MUST BE SURRENDERED TO DMV)",
                    value: "DESTROYED/MUTILATED",
                }, {
                    label: "NOT RECEIVED FROM DMV (ALLOW 30 DAYS FROM ISSUE DATE BEFORE REAPPLYING)",
                    value: "NOT RECEIVED FROM DMV",
                }, {
                    label: "NOT RECEIVED FROM PRIOR OWNER",
                    value: "NOT RECEIVED FROM PRIOR OWNER",
                }, {
                    label: "SURRENDERED",
                    value: "SURRENDERED",
                }, {
                    label: "SPECIAL PLATES WERE RETAINED BY OWNER (PERSONALIZED, DISABLED PERSON, DISABLED VETERAN)",
                    value: "SPECIAL PLATES",
                }, {
                    label: "REQUESTING REGISTRATION CARD WITH CURRENT ADDRESS",
                    value: "REQUESTING REGISTRATION CARD",
                }, {
                    label: "PER CVC §4467 – COPY OF A POLICE REPORT, COURT DOCUMENTATION, OR OTHER LAW ENFORCEMENT DOCUMENTATION REQUIRED.",
                    value: "PER CVC §4467",
                }
            ]
        }, {
            reference: "License Plate",
            blockName: "License Plate",
            fields: [
                {
                    label: "One license plate missing (automobiles/two-plate commercial vehicles/pick-ups only)",
                    value: "One license plate missing",
                }, {
                    label: "Two license plates are missing or one plate is missing for a single-plate commercial truck tractor, motorcycle, or trailer",
                    value: "Two license plates are missing",
                }
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                },
                {
                    label: "Collect Plate and Sticker Replacement Fee",
                },
                {
                    label: "Issue only one plate and sticker",
                }
            ]
        }
        ]
    }, {
        form: "Add Lienholder",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [{
                label: 'With Title',
                type: "checkbox",
                placeholder: 'With Title'
            }
            ]
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [{
                label: 'Vehicle/Hull Identification Number',
                type: "input field",
                placeholder: 'Vehicle/Hull Identification Number'
            }, {
                label: 'Vehicle License Plate or Vessel CF Number',
                type: "input field",
                placeholder: 'Vehicle License Plate or Vessel CF Number'
            }, {
                label: 'Year of Vehicle',
                type: "input field",
                placeholder: 'Year of Vehicle'
            }, {
                label: 'Make of Vehicle OR Vessel Builder',
                type: "input field",
                placeholder: 'Make of Vehicle OR Vessel Builder'
            }
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 2,
            fields: [
                {
                    label: 'First Name',
                    type: "input field",
                    placeholder: 'First Name'
                }, {
                    label: 'Middle Name',
                    type: "input field",
                    placeholder: 'Middle Name'
                }, {
                    label: 'Last Name',
                    type: "input field",
                    placeholder: 'Last Name'
                }, {
                    label: 'Driver License Number',
                    type: "input field",
                    placeholder: 'Driver License Number'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                }
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Missing Title Reason",
            blockName: "Missing Title Reason",
            fields: [
                {
                    label: 'Select reason',
                    type: "dropdown",
                    placeholder: 'Select reason'
                }
            ]
        }, {
            reference: "New Lien Holder",
            blockName: "New Lien Holder",
            subOption: [
                {
                    label: "If mailing address is different",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        }
                    ],
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'True Full Name or Bank/Finance Company or Individual',
                    type: "input field",
                    placeholder: 'True Full Name or Bank/Finance Company or Individual'
                }, {
                    label: 'ELT Number (3 digits)',
                    type: "input field",
                    placeholder: 'ELT Number (3 digits)'
                }, {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                },
                {
                    label: "Collect Proof of Vehicle Ownership",
                },
                {
                    label: "Collect Lienholder Information",
                },
                {
                    label: "Collect Original Vehicle Title",
                }
            ]
        }
        ]
    }, {
        form: "Remove Lienholder",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [
                {
                    label: 'With Title',
                    type: "checkbox",
                    placeholder: 'With Title'
                }
            ]
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [
                {
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                }
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 2,
            fields: [
                {
                    label: 'First Name',
                    type: "input field",
                    placeholder: 'First Name'
                }, {
                    label: 'Middle Name',
                    type: "input field",
                    placeholder: 'Middle Name'
                }, {
                    label: 'Last Name',
                    type: "input field",
                    placeholder: 'Last Name'
                }, {
                    label: 'Driver License Number',
                    type: "input field",
                    placeholder: 'Driver License Number'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                }
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "Missing Title Reason",
            blockName: "Missing Title Reason",
            fields: [
                {
                    label: 'Select reason',
                    type: "dropdown",
                    placeholder: 'Select reason'
                }
            ]
        }, {
            reference: "Lien Release",
            blockName: "Lien Release",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                    subFields: [
                        { label: 'Street', type: "input field", placeholder: 'Street' },
                        { label: 'APT./SPACE/STE.#', type: "address", placeholder: 'APT./SPACE/STE.#' },
                        { label: 'City', type: "input field", placeholder: 'City' },
                        { label: 'State', type: "dropdown", placeholder: 'State' },
                        { label: 'ZIP Code', type: "input field", placeholder: 'ZIP Code' },]
                }
            ],
            fields: [
                { label: 'Name of bank, finance company, or individual(s) having a lien on this vehicle', type: "input field", placeholder: 'Name of bank, finance company, or individual(s) having a lien on this vehicle' },
                { label: 'Street', type: "input field", placeholder: 'Street' },
                { label: 'APT./SPACE/STE.#', type: "address", placeholder: 'APT./SPACE/STE.#' },
                { label: 'City', type: "input field", placeholder: 'City' },
                { label: 'State', type: "dropdown", placeholder: 'State' },
                { label: 'ZIP Code', type: "input field", placeholder: 'ZIP Code' },
                { label: 'Date of Sale', type: 'date', placeholder: 'MM/DD/YYYY' },
                { label: 'Phone number', type: 'phone', placeholder: 'Phone number' },
                { label: 'Printed name of authorized agent', type: 'input field', placeholder: 'Full name' },
                { label: 'Title of authorized agent signing for company', type: 'input field', placeholder: 'Title of authorized agent signing for company' },
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                },
                {
                    label: "Collect Proof of Vehicle Ownership",
                },
                {
                    label: "Collect Original Vehicle Title",
                }
            ]
        }
        ]
    }, {
        form: "Filing for Planned Non-Operation (PNO)",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [
                {
                    label: '60 days before registration expires or 90 days after',
                    type: "checkbox",
                    placeholder: '60 days before registration expires or 90 days after'
                }, {
                    label: 'Request PNO card',
                    type: "checkbox",
                    placeholder: 'Request PNO card'
                },
            ]
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 2,
            commonFields: {
                label: 'Title if Signing for a Company',
                type: "input field",
                placeholder: 'Enter Title'
            },
            fields: [
                {
                    label: 'First Name',
                    type: "input field",
                    placeholder: 'First Name'
                }, {
                    label: 'Middle Name',
                    type: "input field",
                    placeholder: 'Middle Name'
                }, {
                    label: 'Last Name',
                    type: "input field",
                    placeholder: 'Last Name'
                }, {
                    label: 'Driver License Number',
                    type: "input field",
                    placeholder: 'Driver License Number'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                }
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "PLANNED NON-OPERATION CERTIFICATE",
            blockName: "PLANNED NON-OPERATION CERTIFICATE",
            contentType: "Chart",
            defaultFields: 2,
            fields: [
                { label: "Vehicle License Plate Number", key: "plate", placeholder: "License plate number" },
                { label: "Vehicle ID Number", key: "vin", placeholder: "VIN" },
                { label: "Make", key: "make", placeholder: "Make" },
                { label: "Equipment Number (Optional)", key: "equipment", placeholder: "Equipment number" },
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                }, {
                    label: "Collect PNO Fee ($23)",
                }, {
                    label: "Customer Must Must Pay Full Registration Fees, Plus Any Late Penalties",
                },
            ]
        }
        ]
    }, {
        form: "Restoring PNO Vehicle to Operational",
        blocks: [{
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [{
                label: 'Vehicle/Hull Identification Number',
                type: "input field",
                placeholder: 'Vehicle/Hull Identification Number'
            }, {
                label: 'Vehicle License Plate or Vessel CF Number',
                type: "input field",
                placeholder: 'Vehicle License Plate or Vessel CF Number'
            }, {
                label: 'Year of Vehicle',
                type: "input field",
                placeholder: 'Year of Vehicle'
            }, {
                label: 'Make of Vehicle OR Vessel Builder',
                type: "input field",
                placeholder: 'Make of Vehicle OR Vessel Builder'
            }
            ]
        }, {
            reference: "New Registered Owner(s)",
            blockName: "New Registered Owner(s)",
            fields: [
                {
                    label: 'First Name',
                    type: "input field",
                    placeholder: 'First Name'
                }, {
                    label: 'Middle Name',
                    type: "input field",
                    placeholder: 'Middle Name'
                }, {
                    label: 'Last Name',
                    type: "input field",
                    placeholder: 'Last Name'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                }
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                }, {
                    label: "Collect Proof of Insurance",
                }, {
                    label: "Collect Smog Certification",
                }, {
                    label: "Collect Any Registration / Late Fees",
                },
            ]
        }]
    }, {
        form: "Certificate of Non-Operation",
        blocks: [{
            reference: "Vehicle Storage Location",
            blockName: "Vehicle Storage Location",
            fields: [
                {
                    label: 'FROM: MONTH, DAY, YEAR',
                    type: "date",
                    placeholder: 'MM/DD/YYYY'
                }, {
                    label: 'TO: MONTH, DAY, YEAR',
                    type: "date",
                    placeholder: 'MM/DD/YYYY'
                }, {
                    label: 'Address',
                    type: "input field",
                    placeholder: 'Address'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                },
            ]
        }, {
            reference: "PLANNED NON-OPERATION CERTIFICATE",
            blockName: "PLANNED NON-OPERATION CERTIFICATE",
            contentType: "Chart",
            defaultFields: 2,
            fields: [
                { label: "Vehicle License Plate Number", key: "plate", placeholder: "License plate number" },
                { label: "Vehicle ID Number", key: "vin", placeholder: "VIN" },
                { label: "Make", key: "make", placeholder: "Make" },
                { label: "Equipment Number (Optional)", key: "equipment", placeholder: "Equipment number" },
            ]
        }
        ]
    },
    {
        form: "Personalized Plates",
        blocks: [{
            reference: "Plates Selection",
            blockName: "Plates Selection",
            options: ["Order", "Replace", "Reassign/Retain", "Exchange"],
            fields: [
                {
                    label: "Plates allowed 2-6 Characters",
                    fields: [
                        {
                            label: "Breast Cancer Awareness",
                            type: "checkbox",
                            placeholder: "Breast Cancer Awareness",
                        },
                        {
                            label: "California Arts Council",
                            type: "checkbox",
                            placeholder: "California Arts Council",
                        }, {
                            label: "California Agricultural (CalAg)",
                            type: "checkbox",
                            placeholder: "California Agricultural (CalAg)",
                        },
                        {
                            label: "California Memorial",
                            type: "checkbox",
                            placeholder: "California Memorial",
                        }, {
                            label: "California Museums (Snoopy)",
                            type: "checkbox",
                            placeholder: "California Museums (Snoopy)",
                        },
                        {
                            label: "Collegiate (only UCLA is available)",
                            type: "checkbox",
                            placeholder: "Collegiate (only UCLA is available)",
                        }, {
                            label: "Kids - Child Health and Safety Funds",
                            type: "checkbox",
                            placeholder: "Kids - Child Health and Safety Funds",
                        },
                        {
                            label: "Pet Lovers",
                            type: "checkbox",
                            placeholder: "Pet Lovers",
                        }, {
                            label: "Veterans' Organization",
                            type: "checkbox",
                            placeholder: "Veterans' Organization",
                        }
                    ],
                }, {
                    label: "Plates allowed 2-7 Characters",
                    fields: [
                        {
                            label: "Environmental License Plate (ELP)",
                            type: "checkbox",
                            placeholder: "Environmental License Plate (ELP)",
                        },
                        {
                            label: "California Coastal Commission (Whale Tail)",
                            type: "checkbox",
                            placeholder: "California Coastal Commission (Whale Tail)",
                        }, {
                            label: "Lake Tahoe Conservancy",
                            type: "checkbox",
                            placeholder: "Lake Tahoe Conservancy",
                        },
                        {
                            label: "Yosemite Foundation",
                            type: "checkbox",
                            placeholder: "Yosemite Foundation",
                        }, {
                            label: "California 1960s Legacy",
                            type: "checkbox",
                            placeholder: "California 1960s Legacy",
                        }
                    ],
                }, {
                    label: "Other Options",
                    fields: [
                        {
                            label: "Honoring Veterans Plate",
                            type: "checkbox",
                            placeholder: "Honoring Veterans Plate",
                        },
                        {
                            label: "Duplicate Decal",
                            type: "checkbox",
                            placeholder: "Duplicate Decal",
                        }
                    ],
                },]
        }, {
            reference: "Select Configuration",
            blockName: "Select Configuration",
            fields: [
                { label: "Automobile", type: "checkbox" },
                { label: "Commercial", type: "checkbox" },
                { label: "Trailer", type: "checkbox" },
                { label: "Motorcycle", type: "checkbox" },
            ],
        }, {
            reference: "FOR REPLACEMENT ONLY",
            blockName: "FOR REPLACEMENT ONLY",
            fields: [],
        }, {
            reference: "REASSIGN, RETAIN INTEREST, OR RELEASE INTEREST",
            blockName: "REASSIGN, RETAIN INTEREST, OR RELEASE INTEREST",
            fields: [
                {
                    key: 'specialInterestLicensePlateNumber',
                    label: 'SPECIAL INTEREST LICENSE PLATE NUMBER',
                    type: "input field",
                    placeholder: 'ENTER PLATE NUMBER'
                }, {
                    key: 'removedFrom',
                    label: 'REMOVED FROM (VEHICLE IDENTIFICATION NUMBER)',
                    type: "input field",
                    placeholder: 'ENTER VIN'
                }, {
                    key: 'licensePlatePlacedOn',
                    label: 'PLACED ON (CURRENT LICENSE PLATE)',
                    type: "input field",
                    placeholder: 'ENTER LICENSE PLATE'
                }, {
                    key: 'vinPlacedOn',
                    label: 'PLACED ON (VEHICLE IDENTIFICATION NUMBER)',
                    type: "input field",
                    placeholder: 'ENTER VIN'
                }, {
                    key: 'releaseInterest',
                    label: 'RETAIN INTEREST FOR FUTURE USE',
                    type: "checkbox",
                }, {
                    key: 'releaseInterest',
                    label: 'RELEASE INTEREST/SURRENDER TO DMV',
                    type: "checkbox",
                }, {
                    key: 'feeEnclosed',
                    label: 'Fee enclosed',
                    type: "checkbox",
                }, {
                    key: 'releaseInterest',
                    label: 'RELEASE INTEREST TO NEW OWNER',
                    type: "checkbox",
                },
            ],
        }, {
            reference: "PLATE PURCHASER",
            blockName: "PLATE PURCHASER",
            subOptions: [
                {
                    label: "If Plate Owner is Different",
                    fieldName: "PLATE OWNER",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'True Full Name (Last, First, Middle Initial, Suffix)',
                            type: "input field",
                            placeholder: 'True Full Name (Last, First, Middle Initial, Suffix)'
                        }, {
                            label: 'Street Address or PO Box',
                            type: "input field",
                            placeholder: 'Street Address or PO Box'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        }, {
                            label: 'Phone Number',
                            type: "phone",
                            placeholder: 'Phone Number'
                        },
                    ]
                },
            ],
            fields: [
                {
                    label: 'True Full Name (Last, First, Middle Initial, Suffix)',
                    type: "input field",
                    placeholder: 'True Full Name (Last, First, Middle Initial, Suffix)'
                }, {
                    label: 'Street Address or PO Box',
                    type: "input field",
                    placeholder: 'Street Address or PO Box'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                },
            ]
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                }, {
                    label: "Collect Current Registration Card or Vehicle Information",
                }
            ]
        }
        ]
    },
    {
        form: "Commercial Vehicle",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [
                {
                    label: 'Commercial Vehicle(BUS/LIMO/TAXI)',
                    type: "checkbox",
                    placeholder: 'Commercial Vehicle(BUS/LIMO/TAXI)'
                }, {
                    label: 'There is a Current Lienholder',
                    type: "checkbox",
                    placeholder: 'There is a Current Lienholder'
                }
            ]
        }, {
            blockName: "Commercial Vehicle Information",
            fields: [
                {
                    label: "Number of axles",
                    type: "input field",
                    placeholder: "Enter number",
                },
                {
                    label: "Unladen weight",
                    type: "input field",
                    placeholder: "Enter weight",
                },
                {
                    label: "Body Model Type",
                    type: "dropdown",
                    options: [
                        { value: "type1", name: "Body type 1" },
                        { value: "type2", name: "Body type 2" },
                        { value: "type3", name: "Body type 3" },
                    ],
                },
            ],
            checkboxGroups: [
                {
                    question: "",
                    options: [
                        { label: "ACTUAL", value: "ACTUAL" },
                        {
                            label: "ESTIMATED (VEHICLES OVER 10,001 LBS. ONLY)",
                            value: "ESTIMATED",
                            subtext: "For vehicles over 10,001 lbs only",
                        },
                    ],
                },
                {
                    question:
                        "Will this vehicle be used for the transportation of persons for hire, compensation, or profit (e.g. limousine, taxi, bus, etc.)?",
                    options: [
                        { label: "Yes", value: "transportationForHireYes" },
                        { label: "No", value: "transportationForHireNo" },
                    ],
                },
                {
                    question:
                        "Is this a commercial vehicle that operates at 10,001 lbs. or more (or is a pickup exceeding 8,001 lbs. unladen and/or 11,499 lbs. Gross Vehicle Weight Rating (GVWR)?",
                    options: [
                        { label: "Yes", value: "commercialVehicleYes" },
                        { label: "No", value: "commercialVehicleNo" },
                    ],
                },
            ],
        }, {
            reference: "Vehicle Information",
            blockName: "Vehicle Information",
            fields: [
                {
                    label: 'Motorcycle Engine Number',
                    type: "input field",
                    placeholder: 'Motorcycle Engine Number'
                }, {
                    label: 'Vehicle/Hull Identification Number',
                    type: "input field",
                    placeholder: 'Vehicle/Hull Identification Number'
                }, {
                    label: 'Vehicle License Plate or Vessel CF Number',
                    type: "input field",
                    placeholder: 'Vehicle License Plate or Vessel CF Number'
                }, {
                    label: 'Year of Vehicle',
                    type: "input field",
                    placeholder: 'Year of Vehicle'
                }, {
                    label: 'Make of Vehicle OR Vessel Builder',
                    type: "input field",
                    placeholder: 'Make of Vehicle OR Vessel Builder'
                }, {
                    label: 'Length (IN)',
                    type: "input field",
                    placeholder: 'Length (IN)'
                }, {
                    label: 'Width (IN)',
                    type: "input field",
                    placeholder: 'Width (IN)'
                }, {
                    label: 'Mileage of Vehicle',
                    type: "input field",
                    placeholder: 'Mileage of Vehicle'
                }, {
                    label: 'NOT Actual Mileage',
                    type: "checkbox",
                    placeholder: 'NOT Actual Mileage'
                }, {
                    label: 'Mileage Exceeds Mechanical Limit',
                    type: "checkbox",
                    placeholder: 'Mileage Exceeds Mechanical Limit'
                }, {
                    label: 'If kilometers check this box',
                    type: "checkbox",
                    placeholder: 'If kilometers check this box'
                }
            ]
        }, {
            reference: "Vehicle Declaration Entry",
            blockName: "Vehicle Declaration Entry",
            numberOfEntry: 2,
            fields: [
                { label: "Vehicle License Number", type: "input field", placeholder: "ENTER LICENSE NUMBER" },
                { label: "Vehicle Identification Number", type: "input field", placeholder: "Enter VIN" },
                { label: "Vehicle Make", type: "input field", placeholder: "Enter Vehicle Make" },
                {
                    label: "GVW Weight Range", type: "dropdown", placeholder: "Select GVW range",
                    options: [
                        { label: "Under 10,001", code: "None", value: "Under 10,001" },
                        { label: "10,001-15,000", code: "A", value: "10,001-15,000" },
                        { label: "15,001-20,000", code: "B", value: "15,001-20,000" },
                        { label: "20,001-26,000", code: "C", value: "20,001-26,000" },
                        { label: "26,001-30,000", code: "D", value: "26,001-30,000" },
                        { label: "30,001-35,000", code: "E", value: "30,001-35,000" },
                        { label: "35,001-40,000", code: "F", value: "35,001-40,000" },
                        { label: "40,001-45,000", code: "G", value: "40,001-45,000" },
                        { label: "45,001-50,000", code: "H", value: "45,001-50,000" },
                        { label: "50,001-54,999", code: "I", value: "50,001-54,999" },
                        { label: "55,000-60,000", code: "J", value: "55,000-60,000" },
                        { label: "60,001-65,000", code: "K", value: "60,001-65,000" },
                        { label: "65,001-70,000", code: "L", value: "65,001-70,000" },
                        { label: "70,001-75,000", code: "M", value: "70,001-75,000" },
                        { label: "75,001-80,000", code: "N", value: "75,001-80,000" },
                    ]
                },
                {
                    label: "CGW Weight Range", type: "dropdown", placeholder: "Select CGW range",
                    options: [
                        { label: "Under 10,001", code: "None", value: "Under 10,001" },
                        { label: "10,001-15,000", code: "A", value: "10,001-15,000" },
                        { label: "15,001-20,000", code: "B", value: "15,001-20,000" },
                        { label: "20,001-26,000", code: "C", value: "20,001-26,000" },
                        { label: "26,001-30,000", code: "D", value: "26,001-30,000" },
                        { label: "30,001-35,000", code: "E", value: "30,001-35,000" },
                        { label: "35,001-40,000", code: "F", value: "35,001-40,000" },
                        { label: "40,001-45,000", code: "G", value: "40,001-45,000" },
                        { label: "45,001-50,000", code: "H", value: "45,001-50,000" },
                        { label: "50,001-54,999", code: "I", value: "50,001-54,999" },
                        { label: "55,000-60,000", code: "J", value: "55,000-60,000" },
                        { label: "60,001-65,000", code: "K", value: "60,001-65,000" },
                        { label: "65,001-70,000", code: "L", value: "65,001-70,000" },
                        { label: "70,001-75,000", code: "M", value: "70,001-75,000" },
                        { label: "75,001-80,000", code: "N", value: "75,001-80,000" },
                    ]
                },
                { label: "Date Operated", type: "datepicker", placeholder: "MM-DD-YYYY" },
            ],
        }, {
            reference: "Registered Owner(s)",
            blockName: "Registered Owner(s)",
            ownersNumber: 3,
            fields: [
                { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' }
            ]
        }, {
            reference: "Owner Address",
            blockName: "Address",
            subOption: [
                {
                    label: "If mailing address is different",
                    type: "radiocheckbox",
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "New Registered Owner(s)",
            blockName: "New Registered Owner(s)",
            ownersNumber: 3,
            fields: [
                {
                    label: 'First Name',
                    type: "input field",
                    placeholder: 'First Name'
                }, {
                    label: 'Middle Name',
                    type: "input field",
                    placeholder: 'Middle Name'
                }, {
                    label: 'Last Name',
                    type: "input field",
                    placeholder: 'Last Name'
                }, {
                    label: 'Driver License Number',
                    type: "input field",
                    placeholder: 'Driver License Number'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'Phone Number',
                    type: "phone",
                    placeholder: 'Phone Number'
                }, {
                    label: 'Purchase Price/Value',
                    type: "input field",
                    placeholder: 'Enter Amount'
                }, {
                    label: 'Market Value',
                    type: "input field",
                    placeholder: 'Enter Market Value'
                }, {
                    label: 'Relationship with Gifter',
                    type: "input field",
                    placeholder: 'Enter Relationship'
                }, {
                    label: 'Gift Value',
                    type: "input field",
                    placeholder: 'Enter Gift Value '
                }
            ]
        }, {
            reference: "New Registered Owner Address",
            blockName: "Address",
            subOptions: [
                {
                    label: "If mailing address is different",
                    fieldName: "Mailing Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }, {
                    label: "If lessee address is different",
                    fieldName: "Lessee Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }, {
                    label: "Trailer/Vessel location",
                    fieldName: "Vessel or Trailer Coach Principally Kept At",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'County',
                            type: "input field",
                            placeholder: 'County'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }, {
                    label: 'County',
                    type: "input field",
                    placeholder: 'County'
                }, {
                    label: 'If no California county and used out-of-state, check this box',
                    type: "checkbox",
                    placeholder: 'If no California county and used out-of-state, check this box'
                },
            ]
        }, {
            reference: "Legal Owner of Record",
            blockName: "Legal Owner of Record",
            subOptions: [
                {
                    label: "If mailing address is different",
                    fieldName: "Mailing Address",
                    type: "radiocheckbox",
                    subFields: [
                        {
                            label: 'Street',
                            type: "input field",
                            placeholder: 'Street'
                        }, {
                            label: 'APT./SPACE/STE.#',
                            type: "address",
                            placeholder: 'APT./SPACE/STE.#'
                        }, {
                            label: 'City',
                            type: "input field",
                            placeholder: 'City'
                        }, {
                            label: 'State',
                            type: "dropdown",
                            placeholder: 'State'
                        }, {
                            label: 'ZIP Code',
                            type: "input field",
                            placeholder: 'ZIP Code'
                        },
                    ]
                },
            ],
            fields: [
                {
                    label: 'Name of Bank, Finance Company, or Individual having a Lien on this Vehicle',
                    type: "input field",
                    placeholder: 'Name of Bank, Finance Company, or Individual having a Lien on this Vehicle'
                }, {
                    label: 'ELT Number (3 digits)',
                    type: "input field",
                    placeholder: 'ELT Number (3 digits)'
                }, {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "address",
                    placeholder: 'APT./SPACE/STE.#'
                }, {
                    label: 'City',
                    type: "input field",
                    placeholder: 'City'
                }, {
                    label: 'State',
                    type: "dropdown",
                    placeholder: 'State'
                }, {
                    label: 'ZIP Code',
                    type: "input field",
                    placeholder: 'ZIP Code'
                }
            ]
        }, {
            reference: "DATE INFORMATION",
            blockName: "DATE INFORMATION",
            fields: [
                {
                    label: 'DATE VEHICLE ENTERED OR WILL ENTER CALIFORNIA (CA):',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE VEHICLE FIRST OPERATED IN CALIFORNIA:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE YOU WENT TO WORK IN CALIFORNIA, OBTAINED A CA DRIVER LICENSE, OR BECAME A RESIDENT:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                }, {
                    label: 'DATE VEHICLE WAS PURCHASED OR ACQUIRED:',
                    subFields: [
                        {
                            label: "Month",
                            type: "date input field",
                            placeholder: "MM"
                        }, {
                            label: "Day",
                            type: "date input field",
                            placeholder: "DD"
                        }, {
                            label: "Year",
                            type: "date input field",
                            placeholder: "YYYY"
                        },
                    ]
                },
            ]
        }, {
            reference: "Vehicle Status Information",
            blockName: "Vehicle Status Information",
            fields: [
                {
                    label:
                        "IF VEHICLE WAS PREVIOUSLY REGISTERED IN CA, THEN REGISTERED OR LOCATED OUTSIDE CA AND HAS NOW RETURNED, ENTER DATE VEHICLE ENTERED CA. IF YOU DID NOT OWN THE VEHICLE AT ENTRY, CHECK BOX:",
                    type: "checkbox",
                    placeholder:
                        "IF VEHICLE WAS PREVIOUSLY REGISTERED IN CA, THEN REGISTERED OR LOCATED OUTSIDE CA AND HAS NOW RETURNED, ENTER DATE VEHICLE ENTERED CA. IF YOU DID NOT OWN THE VEHICLE AT ENTRY, CHECK BOX:",
                },
                {
                    label: "IF YOU ARE NOT A CA RESIDENT, CHECK THIS BOX:",
                    type: "checkbox",
                    placeholder: "IF YOU ARE NOT A CA RESIDENT, CHECK THIS BOX:",
                },
                {
                    label: "Vehicle Condition",
                    type: "radiobutton",
                    options: [
                        { value: "NEW", name: "NEW" },
                        { value: "USED", name: "USED" },
                    ],
                },
                {
                    label: "Purchase Location",
                    type: "radiobutton",
                    options: [
                        { value: "INSIDE CA", name: "INSIDE CA" },
                        { value: "OUTSIDE CA", name: "OUTSIDE CA" },
                    ],
                }
            ],
        }, {
            blockName: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
            reference: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
            fields: [
                {
                    label: "VEHICLE WAS PURCHASED OR ACQUIRED FROM:",
                    type: "radiobutton",
                    options: [
                        { value: "dealer", name: "DEALER" },
                        { value: "private party", name: "PRIVATE PARTY" },
                        { value: "dismantler", name: "DISMANTLER" },
                        { value: "family", name: "IMMEDIATE FAMILY MEMBER – STATE RELATIONSHIP:" },
                    ],
                },
                {
                    label: "Vehicle Modifications",
                    type: "radiobutton",
                    options: [
                        { value: "yes", name: "YES" },
                        { value: "no", name: "NO" },
                    ],
                },
            ],
        }, {
            blockName: "Statement for Vehicle Body Change",
            reference: "Statement for Vehicle Body Change",
            fields: [], // no dynamic fields, hardcoded in component
        }, {
            blockName: "For Commercial Vehicle Only",
            reference: "For Commercial Vehicle Only",
            fields: [], // no dynamic fields, hardcoded in component
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                }, {
                    label: "Collect Vehicle Information",
                }, {
                    label: "Collect Proof of Ownership",
                }, {
                    label: "Collect Weight Certificate",
                }
            ]
        }
        ]
    }, {
        form: "Salvage",
        blocks: [
            {
                reference: "Transaction Details",
                blockName: "Transaction Details",
                fields: [
                    {
                        label: 'Orginal',
                        type: "checkbox",
                        placeholder: 'Orginal'
                    }, {
                        label: 'Duplicate',
                        type: "checkbox",
                        placeholder: 'Duplicate'
                    }
                ]
            }, {
                reference: "Salvage Certificate",
                blockName: "Salvage Certificate",
                fields: [
                    {
                        label: 'State of last Registeration',
                        type: "input field",
                        placeholder: 'Enter State'
                    }, {
                        label: 'Date of Registeration Expires',
                        type: "date",
                        placeholder: 'MM/DD/YYYY'
                    }, {
                        label: 'Cost/value',
                        type: "input field",
                        placeholder: 'Enter Cost/value'
                    }, {
                        label: 'Claim number',
                        type: "input field",
                        placeholder: 'Enter Claim number'
                    }, {
                        label: 'Date wrecked',
                        type: "date",
                        placeholder: 'Enter Date wrecked'
                    }, {
                        label: 'Date stolen',
                        type: "date",
                        placeholder: 'Enter Date stolen'
                    }, {
                        label: 'Date recovered',
                        type: "date",
                        placeholder: 'Enter Date recovered'
                    },
                ]
            }, {
                reference: "Vehicle Information",
                blockName: "Vehicle Information",
                fields: [
                    {
                        label: 'Vehicle/Hull Identification Number',
                        type: "input field",
                        placeholder: 'Vehicle/Hull Identification Number'
                    }, {
                        label: 'Vehicle License Plate or Vessel CF Number',
                        type: "input field",
                        placeholder: 'Vehicle License Plate or Vessel CF Number'
                    }, {
                        label: 'Year of Vehicle',
                        type: "input field",
                        placeholder: 'Year of Vehicle'
                    }, {
                        label: 'Make of Vehicle OR Vessel Builder',
                        type: "input field",
                        placeholder: 'Make of Vehicle OR Vessel Builder'
                    },
                ]
            }, {
                reference: "Registered Owner(s)",
                blockName: "Registered Owner(s)",
                ownersNumber: 3,
                fields: [
                    { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                    { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                    { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                    { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                    { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                    { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' },
                    { label: 'Agent Name', type: 'input field', placeholder: 'Agent Name' },
                ]
            }, {
                reference: "Owner Address",
                blockName: "Address",
                fields: [
                    {
                        label: 'Street',
                        type: "input field",
                        placeholder: 'Street'
                    }, {
                        label: 'APT./SPACE/STE.#',
                        type: "address",
                        placeholder: 'APT./SPACE/STE.#'
                    }, {
                        label: 'City',
                        type: "input field",
                        placeholder: 'City'
                    }, {
                        label: 'County',
                        type: "input field",
                        placeholder: 'County'
                    }, {
                        label: 'State',
                        type: "dropdown",
                        placeholder: 'State'
                    }, {
                        label: 'ZIP Code',
                        type: "input field",
                        placeholder: 'ZIP Code'
                    }
                ]
            }, {
                reference: "Certification of License Plate Disposition",
                blockName: "Certification of License Plate Disposition",
                fields: [
                    { label: "ARE BEING SURRENDERED", type: "checkbox" },
                    { label: "HAVE BEEN LOST", type: "checkbox" },
                    { label: "HAVE BEEN DESTROYED (OCCUPATIONAL LICENSEES ONLY)", type: "checkbox" },
                    { label: "PLATE WITH OWNER - RETAINED BY OWNER FOR REASSIGNMENT", type: "checkbox" }
                ]
            }, {
                reference: "Documents Received",
                blockName: "Documents Received",
                fields: [
                    {
                        label: "Collect Receipts for Repairs and Parts",
                    }, {
                        label: "Collect Brake and Light Inspection Certificates",
                    }, {
                        label: "Collect Proof of Insurance",
                    }, {
                        label: "Collect a copy of Registrant’s CA Driver’s License or ID",
                    }
                ]
            }
        ]
    }, {
        form: "Disabled Person Placards/Plates",
        blocks: [
            {
                reference: "New Registered Owner(s)",
                blockName: "New Registered Owner(s)",
                fields: [
                    { label: 'First Name', type: 'input field', placeholder: 'First Name' },
                    { label: 'Middle Name', type: 'input field', placeholder: 'Middle Name' },
                    { label: 'Last Name', type: 'input field', placeholder: 'Last Name' },
                    { label: 'Driver License Number', type: 'input field', placeholder: 'Driver License Number' },
                    { label: 'State', type: 'dropdown', placeholder: 'Select State' },
                    { label: 'Date of Birth', type: 'date', placeholder: 'MM/DD/YYYY' },
                    { label: 'Phone Number', type: 'phone', placeholder: 'Phone Number' },
                ]
            }, {
                reference: "New Registered Owner Address",
                blockName: "Address",
                subOptions: [
                    {
                        label: "If mailing address is different",
                        fieldName: "Mailing Address",
                        type: "radiocheckbox",
                        subFields: [
                            {
                                label: 'Street',
                                type: "input field",
                                placeholder: 'Street'
                            }, {
                                label: 'APT./SPACE/STE.#',
                                type: "address",
                                placeholder: 'APT./SPACE/STE.#'
                            }, {
                                label: 'City',
                                type: "input field",
                                placeholder: 'City'
                            }, {
                                label: 'State',
                                type: "dropdown",
                                placeholder: 'State'
                            }, {
                                label: 'ZIP Code',
                                type: "input field",
                                placeholder: 'ZIP Code'
                            },
                        ]
                    },],
                fields: [
                    {
                        label: 'Street',
                        type: "input field",
                        placeholder: 'Street'
                    }, {
                        label: 'APT./SPACE/STE.#',
                        type: "address",
                        placeholder: 'APT./SPACE/STE.#'
                    }, {
                        label: 'City',
                        type: "input field",
                        placeholder: 'City'
                    }, {
                        label: 'County',
                        type: "input field",
                        placeholder: 'County'
                    }, {
                        label: 'State',
                        type: "dropdown",
                        placeholder: 'State'
                    }, {
                        label: 'ZIP Code',
                        type: "input field",
                        placeholder: 'ZIP Code'
                    }
                ]
            }, {
                reference: "Type of Disabled Person Parking Placard(S) or License Plates",
                blockName: "Type of Disabled Person Parking Placard(S) or License Plates",
                fields: [
                    {
                        label: 'Street',
                        type: "input field",
                        placeholder: 'Street'
                    }, {
                        label: 'APT./SPACE/STE.#',
                        type: "address",
                        placeholder: 'APT./SPACE/STE.#'
                    }, {
                        label: 'City',
                        type: "input field",
                        placeholder: 'City'
                    }, {
                        label: 'County',
                        type: "input field",
                        placeholder: 'County'
                    }, {
                        label: 'State',
                        type: "dropdown",
                        placeholder: 'State'
                    }, {
                        label: 'ZIP Code',
                        type: "input field",
                        placeholder: 'ZIP Code'
                    }
                ]
            },
            {
                reference: "DISABLED PERSON LICENSE PLATES APPLICANTS ONLY: VEHICLE INFORMATION",
                blockName: "DISABLED PERSON LICENSE PLATES APPLICANTS ONLY: VEHICLE INFORMATION",
                fields: [
                    { label: "License Plate", key: "plate", placeholder: "License plate" },
                    { label: "VEHICLE IDENTIFICATION NUMBER", key: "vin", placeholder: "VEHICLE IDENTIFICATION NUMBER" },
                    { label: "VEHICLE MAKE", key: "make", placeholder: "VEHICLE MAKE" },
                    { label: "VEHICLE YEAR", key: "year", placeholder: "VEHICLE YEAR" },
                ]
            }, {
                reference: "Documents Received",
                blockName: "Documents Received",
                fields: [
                    {
                        label: "Collect a copy of Applicant’s CA Driver’s License or ID",
                    }, {
                        label: "Collect Current Registration Card or Vehicle Information",
                    }, {
                        label: "Collect Proof of Insurance",
                    }
                ]
            }
        ]
    }, {
        form: "Change of Address",
        blocks: [{
            reference: "Transaction Details",
            blockName: "Transaction Details",
            fields: [{
                label: 'Leased Vehicle',
                type: "checkbox",
                placeholder: 'Leased Vehicle'
            }, {
                label: 'Not a United State Citizen',
                type: "checkbox",
                placeholder: 'Not a United State Citizen'
            }, {
                label: 'Do not Use My New Address For Voter Registration Purposes',
                type: "checkbox",
                placeholder: 'Do not Use My New Address For Voter Registration Purposes'
            },
            ]
        }, {
            reference: "PERSONAL OR BUSINESS INFORMATION",
            blockName: "PERSONAL OR BUSINESS INFORMATION",
            fields: [
                { label: "FIRST", type: "input field", placeholder: "FIRST NAME" },
                { label: "LAST NAME OR BUSINESS NAME", type: "input field", placeholder: "LAST NAME OR BUSINESS NAME" },
                { label: "INITIAL", type: "input field", placeholder: "Enter INITIAL" },
                { label: "BIRTH DATE (FOR DL/ID CHANGE OF ADDRESS ONLY)", type: "date", placeholder: "MM/DD/YYYY" },
                { label: "DRIVER LICENSE/ID (FOR DL/ID CHANGE OF ADDRESS ONLY)", type: "input field", placeholder: "DL/ID NUMBER" },
            ],
        }, {
            reference: "PREVIOUS RESIDENCE OR BUSINESS ADDRESS",
            blockName: "PREVIOUS RESIDENCE OR BUSINESS ADDRESS",
            fields: [
                { label: "STREET NUMBER", type: "input field", placeholder: "STREET NUMBER ONLY" },
                { label: "APT. NO.", type: "input field", placeholder: "APT. NUMBER" },
                { label: "STREET NAME", type: "input field", placeholder: "STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)" },
                { label: "CITY", type: "input field", placeholder: "CITY - DO NOT ABBREVIATE" },
                { label: "STATE", type: "dropdown", placeholder: "STATE" },
                { label: "ZIP CODE", type: "input field", placeholder: "ZIP CODE" },
            ],
        }, {
            reference: "NEW OR CORRECT RESIDENSE OR BUSINESS ADDRESS",
            blockName: "NEW OR CORRECT RESIDENSE OR BUSINESS ADDRESS",
            subOptions: [
                {
                    label: "If mailing address is different",
                    fieldName: "Mailing Address",
                    subFields: [
                        { label: "STREET NUMBER", type: "input field", placeholder: "STREET NUMBER ONLY" },
                        { label: "APT. NO.", type: "input field", placeholder: "APT. NUMBER" },
                        { label: "P.O. BOX OR STREET NAME OR STREET NAME AND PRIVATE MAIL BOX (PMB)", type: "input field", placeholder: "STREET/PO BOX" },
                        { label: "CITY", type: "input field", placeholder: "CITY - DO NOT ABBREVIATE" },
                        { label: "STATE", type: "dropdown", placeholder: "STATE" },
                        { label: "ZIP CODE", type: "input field", placeholder: "ZIP CODE" },
                    ]
                }, {
                    label: "Location of Trailer Coach or Vessel",
                    fieldName: "Location of Trailer Coach or Vessel",
                    subFields: [
                        { label: "STREET NUMBER", type: "input field", placeholder: "STREET NUMBER ONLY" },
                        { label: "STREET NAME", type: "input field", placeholder: "STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)" },
                        { label: "CITY", type: "input field", placeholder: "CITY - DO NOT ABBREVIATE - USE FIRST 16 CHARACTERS IN CITY NAME" },
                        { label: "COUNTY - DO NOT ABBREVIATE", type: "input field", placeholder: "COUNTY - DO NOT ABBREVIATE" },
                    ]
                }
            ],
            fields: [
                { label: "STREET NUMBER", type: "input field", placeholder: "STREET NUMBER ONLY" },
                { label: "APT. NO.", type: "input field", placeholder: "APT. NUMBER" },
                { label: "STREET NAME", type: "input field", placeholder: "STREET NAME (INCLUDE ST., AVE., RD., CT., ETC.)" },
                { label: "CITY", type: "input field", placeholder: "CITY - DO NOT ABBREVIATE" },
                { label: "DRIVER LICENSE/ID ", type: "input field", placeholder: "DL/ID NUMBER (FOR DL/ID CHANGE OF ADDRESS ONLY)" },
                { label: "STATE", type: "dropdown", placeholder: "STATE" },
                { label: "ZIP CODE", type: "input field", placeholder: "ZIP CODE" },
                { label: "COUNTY", type: "input field", placeholder: "COUNTY - DO NOT ABBREVIATE" },
            ],
        }, {
            reference: "Vehicles, Vessels, or Placards Owned By You",
            blockName: "Vehicles, Vessels, or Placards Owned By You",
            fields: [],
        }, {
            reference: "Documents Received",
            blockName: "Documents Received",
            fields: [
                {
                    label: "Collect a copy of Registered Owner’s Driver’s License or ID",
                }
            ]
        }
        ]
    },

]