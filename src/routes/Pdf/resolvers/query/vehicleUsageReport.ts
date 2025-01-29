import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { render as vehicleUsageReportRender } from "../../../../pdf/vehicleUsageReport/render";

const vehicleUsageReportResolver = async (
  _: unknown,
  __: unknown,
  context: { token?: string }
): Promise<string | void> => {
  try {
    await verifyToken(context.token || "");

    const pdfDoc = await PDFDocument.create();

    await vehicleUsageReportRender({ document: pdfDoc });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: unknown) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;

    const logger = getLogger("vehicleUsageReportResolver");
    logger.error(`Error vehicle usage pdf: ${message}`);
  }
};

export { vehicleUsageReportResolver };
