import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { PdfResolverArgsInterface } from "../../types";
import { Worker } from "../../../Worker";
import { render as authorizationRender } from "../../../../pdf/authorization/render";

const authorizationPdfResolver = async (
  _: any,
  { workerId, reference }: PdfResolverArgsInterface,
  context: { token?: string },
  ___: any
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();
    const instance = await Worker.findById(workerId);

    if (!instance) throw new Error("Worker not found");
    await authorizationRender({
      document: pdfDoc,
      instance,
      reference: new Date(reference as string),
    });
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: any) {
    console.log("Error in authorization pdf making: ", err.message);
  }
};

export { authorizationPdfResolver };
