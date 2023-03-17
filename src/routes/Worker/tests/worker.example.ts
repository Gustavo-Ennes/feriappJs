import { workerDefaultObjectId } from "../../Vacation/tests/queries";

const workerExample: any = {
  _id: workerDefaultObjectId,
  name: "Joseph Climber",
  role: "Paperweight",
  status: "active",
  registry: "0152636",
  matriculation: "15.263-6",
  admissionDate: new Date(),
  department: {
    name: "Saúde",
  },
};

export { workerExample };
