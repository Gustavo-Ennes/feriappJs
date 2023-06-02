import type { PdfFnParam } from "../types";
import type { WorkerInterface } from "../../routes/Worker/types/worker";
import { drawJustificationBlock } from "./block";
import { getHeightObject } from "../utils";

const render = async ({ document, instance }: PdfFnParam): Promise<void> => {
  if (document) {
    const page = document.addPage();
    const height = getHeightObject(page);
    
    await drawJustificationBlock({
      document,
      height,
      worker: instance as WorkerInterface,
    });
    await drawJustificationBlock({
      document,
      height,
      worker: instance as WorkerInterface,
    });
    await drawJustificationBlock({
      document,
      height,
      worker: instance as WorkerInterface,
    });
    await drawJustificationBlock({
      document,
      height,
      worker: instance as WorkerInterface,
    });
  }
};

export { render };
