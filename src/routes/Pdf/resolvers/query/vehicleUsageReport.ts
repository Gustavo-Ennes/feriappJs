import { PDFDocument } from "pdf-lib";

import { verifyToken } from "../../../../firebase/firebase";
import { render as vehicleUsageReportRender } from "../../../../pdf/vehicleUsageReport/render";

const vehicleUsageReportResolver = async (
  _: any,
  __: any,
  context: { token?: string },
  ___: any
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();

    await vehicleUsageReportRender({ document: pdfDoc });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: any) {
    console.log("Error in vehicle usage report pdf making: ", err.message);
  }
};

export { vehicleUsageReportResolver };
