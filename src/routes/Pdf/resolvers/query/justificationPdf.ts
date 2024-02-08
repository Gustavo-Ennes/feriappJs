import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { PdfResolverArgsInterface } from "../../types";
import { Worker } from "../../../Worker";
import { render as justificationRender } from "../../../../pdf/justification/render";

const justificationPdfResolver = async (
  _: unknown,
  { workerId }: PdfResolverArgsInterface,
  context: { token?: string }
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();
    const instance = await Worker.findById(workerId)
      .populate("department")
      .exec();

    if (!instance) throw new Error("Worker not found");
    await justificationRender({ document: pdfDoc, instance });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: unknown) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;
    console.log("Error in authorization pdf making: ", message);
    console.log("Error in justification pdf making: ", message);
  }
};

export { justificationPdfResolver };
