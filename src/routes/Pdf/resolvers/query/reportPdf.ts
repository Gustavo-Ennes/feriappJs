import { PDFDocument } from "pdf-lib";
import { getDaysInMonth, set } from "date-fns";

import { verifyToken } from "../../../../firebase/firebase";
import { PdfResolverArgsInterface } from "../../types";
import { render as reportRender } from "../../../../pdf/report/render";
import { Department } from "../../../Department";
import { ExtraHourModel } from "../../../ExtraHour";
import { ExtraHourInterface } from "../../../ExtraHour/types/extraHour";
import { DepartmentInterface } from "../../../Department/types/department";

const reportPdfResolver = async (
  _: unknown,
  { departmentId, reference }: PdfResolverArgsInterface,
  context: { token?: string }
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();
    const referenceDate = new Date(reference as string);
    const firstReferenceMonthDay = set(referenceDate, {
      date: 1,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0
    });
    const lastReferenceMonthDay = set(referenceDate, {
      date: getDaysInMonth(referenceDate),
      hours: 23,
      milliseconds: 999,
      minutes: 59,
      seconds: 59
    });

    const instance: DepartmentInterface | null =
      await Department.findById(departmentId);

    if (!instance) throw new Error("Department not found.");

    const extraHours = await ExtraHourModel.find({
      reference: { $gte: firstReferenceMonthDay, $lte: lastReferenceMonthDay }
    })
      .populate(["worker", "department"])
      .exec();
    const thisDepartmentExtraHours: ExtraHourInterface[] = extraHours.filter(
      ({
        department,
        worker: {
          department: { _id }
        }
      }) =>
        department?._id?.toString() === instance._id?.toString() ||
        _id.toString() == instance._id?.toString()
    );

    await reportRender({
      document: pdfDoc,
      extraHours: thisDepartmentExtraHours,
      instance,
      reference: referenceDate
    });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: unknown) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;
    console.log("Error in authorization pdf making: ", message);
    console.log("Error in report pdf making: ", message);
  }
};

export { reportPdfResolver };
