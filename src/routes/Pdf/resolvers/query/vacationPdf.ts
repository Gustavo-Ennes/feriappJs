import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { render as vacationRender } from "../../../../pdf/vacation/render";
import { Vacation } from "../../../Vacation/vacation.model";
import { PdfResolverArgsInterface } from "../../types";

const vacationPdfResolver = async (
  _: unknown,
  { vacationId }: PdfResolverArgsInterface,
  context: { token?: string }
): Promise<string | void> => {
  try {
    await verifyToken(context.token || "");

    const pdfDoc = await PDFDocument.create();
    const instance = await Vacation.findById(vacationId)
      .populate("worker")
      .populate("boss")
      .exec();

    if (!instance) throw new Error("Vacation not found");
    await vacationRender({ document: pdfDoc, instance });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: unknown) {
    let message = "Unknown Error";

    if (err instanceof Error) message = err.message;

    const logger = getLogger("vacationPdfResolver");
    logger.error(`Error vacation pdf: ${message}`);
    throw err;
  }
};

export { vacationPdfResolver };
