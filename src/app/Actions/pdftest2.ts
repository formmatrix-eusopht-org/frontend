// lib/stripPdfFields.ts
import { PDFDocument, rgb } from "pdf-lib";

export async function stripContentButKeepFields(pdfBytes: ArrayBuffer) {
  const originalPdf = await PDFDocument.load(pdfBytes);

  const form = originalPdf.getForm();
  const fields = form.getFields();

  const cleanPdf = await PDFDocument.create();
  const originalPages = originalPdf.getPages();

  const pageMap = originalPages.map((page) => {
    const { width, height } = page.getSize();
    return cleanPdf.addPage([width, height]);
  });

  const cleanForm = cleanPdf.getForm();

  // --- helper for extracting numbers safely ---
  const getNum = (val: any): number => {
    if (!val) return 0;
    if (typeof val.numberValue === "function") return val.numberValue();
    if (typeof val.asNumber === "function") return val.asNumber();
    if (typeof val === "number") return val;
    return 0;
  };

  for (const field of fields) {
    const name = field.getName();
    const type = field.constructor.name;
    const widgets = (field as any).acroField.getWidgets();

    // --- Text fields ---
    if (type === "PDFTextField") {
      const f = cleanForm.createTextField(name);
      f.enableMultiline();

      widgets.forEach((widget: any) => {
        const rect = widget.getRectangle();
        const refPage = widget.P();
        const pageIndex = originalPages.findIndex((p) => p.ref === refPage);
        if (pageIndex === -1) return;

        const page = pageMap[pageIndex];
        f.addToPage(page, {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        });
      });
    }

    if (name === "CheckBox") continue;
    // --- Checkboxes ---
    if (type === "PDFCheckBox") {
      const f = cleanForm.createCheckBox(name);
      widgets.forEach((widget: any) => {
        // use built-in helper instead of dict
        const rect = widget.getRectangle();

        const refPage = widget.P();
        const pageIndex = originalPages.findIndex((p) => p.ref === refPage);
        if (pageIndex === -1) return;

        const page = pageMap[pageIndex];

        const size = Math.max(rect.width, rect.height) || 12;
        const x = rect.x || 50;
        const y = rect.y || 700;

        // Debug outline
        page.drawRectangle({
          x, y,
          width: size,
          height: size,
          borderColor: rgb(1, 0, 0),
          borderWidth: 1,
        });
        console.log("Checkbox rect:", { x, y, width: size, height: size, name });

        f.addToPage(page, { x, y, width: size, height: size });
      });

      f.uncheck();
    }

  }

  cleanForm.updateFieldAppearances();

  return await cleanPdf.save();
}

// Example usage
export const pdfTest2 = async () => {
  const res = await fetch(`/pdfs/DMVREG262.pdf`);
  const pdfBytes = await res.arrayBuffer();

  const newPdfBytes = await stripContentButKeepFields(pdfBytes);

  const blob = new Blob([new Uint8Array(newPdfBytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url);
};
