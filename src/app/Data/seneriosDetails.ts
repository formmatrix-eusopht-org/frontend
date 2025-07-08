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
                { label: 'First Name', type: 'text', placeholder: 'First Name' },
                { label: 'Middle Name', type: 'text', placeholder: 'Middle Name' },
                { label: 'Last Name', type: 'text', placeholder: 'Last Name' },
                { label: 'Driver License Number', type: 'text', placeholder: 'Driver License Number' },
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
                    type: "input field",
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
                            type: "input field",
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
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "input field",
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
                            type: "input field",
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
                            type: "input field",
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
                            type: "input field",
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
                }
            ],
            fields: [
                {
                    label: 'Street',
                    type: "input field",
                    placeholder: 'Street'
                }, {
                    label: 'APT./SPACE/STE.#',
                    type: "input field",
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
                },
                {
                    label: "The parent, grandparent, child, grandchild, brother, sister, spouse, or domestic partner (as defined in Family Code §297) of the transferee.*",
                    type: "checkbox",
                    placeholder: "The parent, grandparent, child, grandchild, brother, sister, spouse, or domestic partner (as defined in Family Code §297) of the transferee.*",
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
        }
        ]
    }, {
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
                    type: "input field",
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
                { label: 'First Name', type: 'text', placeholder: 'First Name' },
                { label: 'Middle Name', type: 'text', placeholder: 'Middle Name' },
                { label: 'Last Name', type: 'text', placeholder: 'Last Name' },
                { label: 'Driver License Number', type: 'text', placeholder: 'Driver License Number' },
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
                    type: "input field",
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
                    type: "input field",
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
                            type: "input field",
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
                    type: "input field",
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
                    type: "input field",
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
                        { label: 'APT./SPACE/STE.#', type: "input field", placeholder: 'APT./SPACE/STE.#' },
                        { label: 'City', type: "input field", placeholder: 'City' },
                        { label: 'State', type: "dropdown", placeholder: 'State' },
                        { label: 'ZIP Code', type: "input field", placeholder: 'ZIP Code' },]
                }
            ],
            fields: [
                { label: 'Name of bank, finance company, or individual(s) having a lien on this vehicle', type: "input field", placeholder: 'Name of bank, finance company, or individual(s) having a lien on this vehicle' },
                { label: 'Street', type: "input field", placeholder: 'Street' },
                { label: 'APT./SPACE/STE.#', type: "input field", placeholder: 'APT./SPACE/STE.#' },
                { label: 'City', type: "input field", placeholder: 'City' },
                { label: 'State', type: "dropdown", placeholder: 'State' },
                { label: 'ZIP Code', type: "input field", placeholder: 'ZIP Code' },
                { label: 'Date of Sale', type: 'date', placeholder: 'MM/DD/YYYY' },
                { label: 'Phone number', type: 'phone', placeholder: 'Phone number' },
                { label: 'Printed name of authorized agent', type: 'input field', placeholder: 'Full name' },
                { label: 'Title of authorized agent signing for company', type: 'input field', placeholder: 'Title of authorized agent signing for company' },
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
                    type: "input field",
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
        },]
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

]