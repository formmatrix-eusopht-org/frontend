export const sidebarSections = [
  {
    title: "Transfer",
    options: [
      {
        label: "Simple Transfer",
        disabledWhen: ["Multiple Transfer", "Duplicate Title", "Change of Address", "Name Change"]
      },
      {
        label: "Multiple Transfer",
        disabledWhen: ["Simple Transfer"]
      },
    ],
  },
  {
    title: "Duplicate & Replacement",
    options: [
      {
        label: "Duplicate Title",
        disabledWhen: ["Simple Transfer", "Duplicate Registration"]
      },
      {
        label: "Duplicate Registration",
        disabledWhen: ["Simple Transfer", "Multiple Transfer", "Duplicate Title"]
      },
      {
        label: "Duplicate Stickers",
        radio: false,
        disabledWhen: ["Duplicate Plates & Stickers", "Filing for Planned Non-Operation (PNO)"],
        subOptions: ["Monthly Sticker", "Yearly Sticker"], // Sub-checkboxes
      },
      {
        label: "Duplicate Plates & Stickers",
        disabledWhen: ["Personalized Plates", "Personalized Plates", "Duplicate Stickers", "Filing for Planned Non-Operation (PNO)", "Disabled Person Placards/Plates"]
      },
    ],
  },
  {
    title: "Lienholder",
    options: [
      {
        label: "Add Lienholder",
        disabledWhen: ["Remove Lienholder"],
      },
      {
        label: "Remove Lienholder",
        disabledWhen: ["Add Lienholder"],
      },
    ],
  },
  {
    title: "Address & Name Changes",
    options: [
      {
        label: "Name Change",
        radio: true,
        disabledWhen: ["Simple Transfer", "Multiple Transfer"],
        subOptions: ["Name Correction", "Legal Name Change", "Name Discrepancy"],
      },
      {
        label: "Change of Address",
        disabledWhen: ["Simple Transfer", "Multiple Transfer"]
      },
    ],
  },
  {
    title: "Planned Non-Operation",
    options: [
      {
        label: "Filing for Planned Non-Operation (PNO)",
        disabledWhen: ["Restoring PNO Vehicle to Operational", "Certificate of Non-Operation", "Duplicate Stickers", "Duplicate Plates & Stickers"],
      },
      {
        label: "Restoring PNO Vehicle to Operational",
        disabledWhen: ["Filing for Planned Non-Operation (PNO)"]
      },
      {
        label: "Certificate of Non-Operation",
        disabledWhen: ["Filing for Planned Non-Operation (PNO)"]
      },
    ],
  },
  {
    title: "Specialty Plates & Placards",
    options: [
      {
        label: "Personalized Plates",
        disabledWhen: ["Duplicate Plates & Stickers", "Disabled Person Placards/Plates"],
      },
      {
        label: "Disabled Person Placards/Plates",
        disabledWhen: ["Personalized Plates", "Duplicate Plates & Stickers"]
      },
    ],
  },
  {
    title: "Commercial and Salvage Title",
    options: [
      {
        label: "Commercial Vehicle",
        disabledWhen: ["Salvage"]
      },
      {
        label: "Salvage",
        disabledWhen: ["Commercial Vehicle"]
      },
    ],
  },
];
