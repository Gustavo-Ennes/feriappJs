import { workerDefaultObjectId } from "../../Vacation/tests/queries";
import { WorkerInterface } from "../types/worker";

const workerExample: WorkerInterface = {
  _id: workerDefaultObjectId,
  admissionDate: new Date(),
  department: {
    name: "Saúde"
  },
  justification: "workando",
  matriculation: "15.263-6",
  name: "Joseph Climber",
  registry: "0152636",
  role: "Paperweight",
  status: "active",
};

export { workerExample };
