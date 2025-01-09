import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { render as vacationRender } from "../../../../pdf/vacation/render";
import { Vacation } from "../../../Vacation/vacation.model";
import { PdfResolverArgsInterface } from "../../types";

const vacationPdfResolver = async (
  _: unknown,
  { vacationId }: PdfResolverArgsInterface,
  context: { token?: string }
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
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
    console.log("Error in authorization pdf making: ", message);
    console.log("Error in vacation pdf making: ", message);
  }
};

export { vacationPdfResolver };
