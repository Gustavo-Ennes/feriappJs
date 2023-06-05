import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { PdfResolverArgsInterface } from "../../types";
import { Vacation } from "../../../Vacation/vacation.model";
import { render as vacationRender } from "../../../../pdf/vacation/render";

const vacationPdfResolver = async (
  _: any,
  { vacationId }: PdfResolverArgsInterface,
  context: { token?: string },
  ___: any
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();
    const instance = await Vacation.findById(vacationId);

    if (!instance) throw new Error("Vacation not found");
    await vacationRender({ document: pdfDoc, instance });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: any) {
    console.log("Error in vacation pdf making: ", err.message);
  }
};

export { vacationPdfResolver };
