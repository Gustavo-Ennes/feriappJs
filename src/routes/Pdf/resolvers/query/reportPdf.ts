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
  _: any,
  { departmentId, reference }: PdfResolverArgsInterface,
  context: { token?: string },
  ___: any
): Promise<string | void> => {
  await verifyToken(context.token || "");

  try {
    const pdfDoc = await PDFDocument.create();
    const referenceDate = new Date(reference as string);
    const firstReferenceMonthDay = set(referenceDate, {
      date: 1,
      minutes: 0,
      seconds: 0,
      hours: 0,
      milliseconds: 0
    });
    const lastReferenceMonthDay = set(referenceDate, {
      date: getDaysInMonth(referenceDate),
      minutes: 59,
      seconds: 59,
      hours: 23,
      milliseconds: 999
    });

    const instance: DepartmentInterface | null = await Department.findById(
      departmentId
    );

    if (!instance) throw new Error("Department not found.");

    const extraHours = await ExtraHourModel.find({
      reference: { $gte: firstReferenceMonthDay, $lte: lastReferenceMonthDay }
    })
      .populate(["worker", "department"])
      .exec();
    const thisDepartmentExtraHours: ExtraHourInterface[] = extraHours.filter(
      ({
        worker: {
          department: { _id }
        },
        department
      }) =>
        department?._id?.toString() === instance._id?.toString() ||
        _id.toString() == instance._id?.toString()
    );

    await reportRender({
      document: pdfDoc,
      instance,
      reference: referenceDate,
      extraHours: thisDepartmentExtraHours
    });
    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes).toString("base64");
  } catch (err: any) {
    console.log("Error in report pdf making: ", err.message);
  }
};

export { reportPdfResolver };
