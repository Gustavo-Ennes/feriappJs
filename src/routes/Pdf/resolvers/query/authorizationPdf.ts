import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { render as authorizationRender } from "../../../../pdf/authorization/render";
import { Worker } from "../../../Worker";
import { PdfResolverArgsInterface } from "../../types";

const authorizationPdfResolver = async (
  _: unknown,
  { reference, workerId }: PdfResolverArgsInterface,
  context: { token?: string }
): Promise<string | void> => {
  try {
    await verifyToken(context.token || "");

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

    const logger = getLogger("authorizationPdfResolver");
    logger.error(
      { args: { reference, workerId } },
      `Error getting authorization pdf: ${message}`
    );
  }
};

export { authorizationPdfResolver };
