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
          textColor: rgb(0, 0, 0),
          borderColor: rgb(1, 1, 1),
        });
      });
    }

    if (name === "CheckBox") continue;

    // --- Checkboxes ---
    if (type === "PDFCheckBox") {
      const f = cleanForm.createCheckBox(name);

      widgets.forEach((widget: any) => {
        const rect = widget.getRectangle();
        const refPage = widget.P();
        const pageIndex = originalPages.findIndex((p) => p.ref === refPage);
        if (pageIndex === -1) return;

        const page = pageMap[pageIndex];
        const size = Math.max(rect.width, rect.height) || 12;
        const x = rect.x || 50;
        const y = rect.y || 700;

        // Just add the checkbox field, no rectangle drawn
        f.addToPage(page, {
          x,
          y,
          width: size,
          height: size,
        });
      });

      f.uncheck();
    }
  }

  cleanForm.updateFieldAppearances();

  return await cleanPdf.save();
}

// Example usage
export const pdfTest2 = async () => {
  const res = await fetch(`/pdfs/title.pdf`);
  const pdfBytes = await res.arrayBuffer();

  const newPdfBytes = await stripContentButKeepFields(pdfBytes);

  const blob = new Blob([new Uint8Array(newPdfBytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url);
};
