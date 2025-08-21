import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

type DrawInstruction = {
  page: number;
  x: number;
  y: number;
  text: string;
  fontSize?: number;
  width?: number;
  align?: "left" | "center" | "right";
};

/**
 * Draw text on an existing PDF at given coordinates
 *
 * @param {Uint8Array | ArrayBuffer} pdfBytes - The original PDF bytes
 * @param {Array<{page: number, x: number, y: number, text: string, fontSize?: number, width?: number}>} draws
 * @returns {Promise<Uint8Array>} - Modified PDF bytes
 */
const drawTextOnPdf = async (
  pdfBytes: Uint8Array | ArrayBuffer,
  draws: DrawInstruction[]
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  draws.forEach(
    ({ page, x, y, text, fontSize = 12, width, align = "left" }) => {
      const targetPage = pdfDoc.getPage(page);

      // Calculate raw text width
      let textWidth = font.widthOfTextAtSize(text, fontSize);
      let scale = 1;

      // If text too wide → shrink
      if (width && textWidth > width) {
        scale = width / textWidth;
        textWidth = width;
      }

      // Adjust X position based on alignment
      let adjustedX = x;
      if (width) {
        if (align === "center") {
          adjustedX = x + (width - textWidth * scale) / 2;
        } else if (align === "right") {
          adjustedX = x + (width - textWidth * scale);
        }
      }

      targetPage.drawText(text, {
        x: adjustedX,
        y,
        size: fontSize * scale,
        font,
        color: rgb(0, 0, 0),
      });
    }
  );

  return await pdfDoc.save();
};

export const pdftest = async () => {
  try {
    const pdfUrl = `/plain pdf/DMVREG262.pdf`;
    const res = await fetch(pdfUrl);
    const pdfBytes = await res.arrayBuffer();

    // const instructions = [
    //   {
    //     page: 0,
    //     x: 10,
    //     y: 668,
    //     text: "12345678111111111111111111111111111111111111111111",
    //     fontSize: 10,
    //     width: 190,
    //     align: "left",
    //   },
    //   {
    //     page: 0,
    //     x: 220,
    //     y: 668,
    //     text: "1234",
    //     fontSize: 10,
    //     width: 50,
    //     align: "left",
    //   },
    //   {
    //     page: 0,
    //     x: 289,
    //     y: 668,
    //     text: "NISSAN",
    //     fontSize: 10,
    //     width: 55,
    //     align: "left",
    //   },
    //   {
    //     page: 0,
    //     x: 344,
    //     y: 668,
    //     text: "123456789",
    //     fontSize: 10,
    //     width: 85,
    //     align: "left",
    //   },
    //   {
    //     page: 0,
    //     x: 450,
    //     y: 668,
    //     text: "123456789",
    //     fontSize: 10,
    //     width: 85,
    //     align: "left",
    //   },
    // ];
    const instructions: DrawInstruction[] = [
      {
        page: 0,
        x: 40,
        y: 668,
        text: "CENTER",
        fontSize: 10,
        width: 190,
        align: "center",
      },
      {
        page: 0,
        x: 236,
        y: 668,
        text: "RIGHT",
        fontSize: 10,
        width: 53,
        align: "center",
      },
      {
        page: 0,
        x: 290,
        y: 668,
        text: "RIGHT",
        fontSize: 10,
        width: 53,
        align: "center",
      },
      {
        page: 0,
        x: 345,
        y: 668,
        text: "RIGHT",
        fontSize: 10,
        width: 84,
        align: "center",
      },
      {
        page: 0,
        x: 430,
        y: 668,
        text: "RIGHT",
        fontSize: 10,
        width: 140,
        align: "center",
      },
      {
        page: 0,
        x: 59,
        y: 626,
        text: "RIGHT",
        fontSize: 10,
        width: 280,
        align: "center",
      },
      {
        page: 0,
        x: 49,
        y: 600,
        text: "RIGHT",
        fontSize: 10,
        width: 240,
        align: "center",
      },
      {
        page: 0,
        x: 307,
        y: 600,
        text: "08",
        fontSize: 10,
        width: 17,
        align: "center",
      },
      {
        page: 0,
        x: 327,
        y: 600,
        text: "23",
        fontSize: 10,
        width: 18,
        align: "center",
      },
      {
        page: 0,
        x: 347,
        y: 600,
        text: "2",
        fontSize: 10,
        width: 15,
        align: "center",
      },
      {
        page: 0,
        x: 360,
        y: 600,
        text: "0",
        fontSize: 10,
        width: 15,
        align: "center",
      },
      {
        page: 0,
        x: 373,
        y: 600,
        text: "0",
        fontSize: 10,
        width: 15,
        align: "center",
      },
      {
        page: 0,
        x: 387,
        y: 600,
        text: "1",
        fontSize: 10,
        width: 15,
        align: "center",
      },
      {
        page: 0,
        x: 387,
        y: 600,
        text: "1",
        fontSize: 10,
        width: 15,
        align: "center",
      },
      //relaetion to gifter
      {
        page: 0,
        x: 204,
        y: 567,
        text: "11111",
        fontSize: 10,
        width: 126,
        align: "center",
      },
      //selling price
      {
        page: 0,
        x: 503,
        y: 600,
        text: "11111",
        fontSize: 10,
        width: 70,
        align: "center",
      },
      //Gift value
      {
        page: 0,
        x: 503,
        y: 566,
        text: "11111",
        fontSize: 10,
        width: 70,
        align: "center",
      },
    ];

    const newPdfBytes = await drawTextOnPdf(pdfBytes, instructions);

    const blob = new Blob([newPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url);
  } catch (err) {
    console.error(err);
  }
};
