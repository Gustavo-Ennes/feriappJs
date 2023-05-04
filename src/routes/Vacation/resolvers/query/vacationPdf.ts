import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import {
  VacationInterface,
  VacationPdfResolverArgsInterface,
} from "../../types/vacation";
import { WorkerInterface } from "../../../Worker/types/worker";
import { Worker } from "../../../Worker";
import { Vacation } from "../../vacation.model";
import { render as vacationRender } from "../../../../pdf/vacation/render";
import { render as justificationRender } from "../../../../pdf/justification/render";

const getInstance = async ({
  _id,
  type,
}: VacationPdfResolverArgsInterface): Promise<
  WorkerInterface | VacationInterface | null
> => {
  return type === "justification"
    ? Worker.findById(_id)
    : Vacation.findById(_id);
};

const vacationPdfResolver = async (
  _: any,
  { _id, type }: VacationPdfResolverArgsInterface,
  context: { token?: string },
  ___: any
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();
    const instance = await getInstance({ _id, type });
    const drawFn =
      type === "justification" ? justificationRender : vacationRender;

    await drawFn({ document: pdfDoc, instance });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: any) {
    console.log("Error in pdf making: ", err.message);
  }
};

export { vacationPdfResolver };
