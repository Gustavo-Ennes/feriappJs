import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { render as authorizationRender } from "../../../../pdf/authorization/render";
import { Worker } from "../../../Worker";
import { PdfResolverArgsInterface } from "../../types";

const authorizationPdfResolver = async (
  _: unknown,
  { reference, workerId }: PdfResolverArgsInterface,
  context: { token?: string }
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();
    const instance = await Worker.findById(workerId)
      .populate("department")
      .exec();

    if (!instance) throw new Error("Worker not found");
    await authorizationRender({
      document: pdfDoc,
      instance,
      reference: new Date(reference as string)
    });
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: unknown) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;
    console.log("Error in authorization pdf making: ", message);
  }
};

export { authorizationPdfResolver };
