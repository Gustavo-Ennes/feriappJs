import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { render as vehicleUsageReportRender } from "../../../../pdf/vehicleUsageReport/render";

const vehicleUsageReportResolver = async (
  _: unknown,
  __: unknown,
  context: { token?: string }
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();

    await vehicleUsageReportRender({ document: pdfDoc });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: unknown) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;
    console.log("Error in authorization pdf making: ", message);
    console.log("Error in vehicle usage report pdf making: ", message);
  }
};

export { vehicleUsageReportResolver };
