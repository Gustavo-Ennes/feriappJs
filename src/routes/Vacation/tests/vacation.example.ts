import { vacationDefaultObjectId, workerDefaultObjectId } from "./queries";

const vacationExample = {
  _id: vacationDefaultObjectId,
  daysQtd: 15,
  startDate: "2023-02-23T17:35:31.308Z",
  type: "vacation",
  worker: {
    admissionDate: new Date().toISOString(),
    matriculation: "123123",
    name: "Elias Maluco",
    registry: "654.654-8",
    role: "Curador de AIDS"
  }
};

const vacationExamplePayload = {
  ...vacationExample,
  worker: workerDefaultObjectId
};

export { vacationExample, vacationExamplePayload };
