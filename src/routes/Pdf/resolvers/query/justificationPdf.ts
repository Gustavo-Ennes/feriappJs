import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { render as justificationRender } from "../../../../pdf/justification/render";
import { Worker } from "../../../Worker";
import { PdfResolverArgsInterface } from "../../types";

const justificationPdfResolver = async (
  _: unknown,
  { workerId }: PdfResolverArgsInterface,
  context: { token?: string }
): Promise<string | void> => {
  try {
    await verifyToken(context.token || "");

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

    const logger = getLogger("justificationPdfResolver");
    logger.error(
      { args: { workerId } },
      `Error getting justification pdf: ${message}`
    );
    throw err;
  }
};

export { justificationPdfResolver };
