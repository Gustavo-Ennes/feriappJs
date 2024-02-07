import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { PdfResolverArgsInterface } from "../../types";
import { Worker } from "../../../Worker";
import { render as justificationRender } from "../../../../pdf/justification/render";

const justificationPdfResolver = async (
  _: any,
  { workerId }: PdfResolverArgsInterface,
  context: { token?: string },
  ___: any
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();
    const instance = await Worker.findById(workerId).populate("department").exec();

    if (!instance) throw new Error("Worker not found");
    await justificationRender({ document: pdfDoc, instance });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: any) {
    console.log("Error in justification pdf making: ", err.message);
  }
};

export { justificationPdfResolver };
