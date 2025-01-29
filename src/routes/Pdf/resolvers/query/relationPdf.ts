import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { render as relationRender } from "../../../../pdf/relation/render";
import { Vacation } from "../../../Vacation";
import { buildOptions } from "../../../Vacation/resolvers/query/utils";
import { PdfResolverArgsInterface } from "../../types";

const relationPdfResolver = async (
  _: unknown,
  { period, type }: PdfResolverArgsInterface,
  context: { token?: string }
): Promise<string | void> => {
  try {
    await verifyToken(context.token || "");

    const options = buildOptions({
      period,
      type
    });

    const pdfDoc = await PDFDocument.create();
    const instances = await Vacation.find(options)
      .populate("worker")
      .populate("boss")
      .exec();

    if (!instances) throw new Error(`Instances of ${type} not found`);

    await relationRender({ document: pdfDoc, instances, period, type });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: unknown) {
    let message = "Unknown Error";

    if (err instanceof Error) message = err.message;

    const logger = getLogger("relationPdfResolver");
    logger.error(`Erro getting relation pdf: ${message}`);
    throw err;
  }
};

export { relationPdfResolver };
