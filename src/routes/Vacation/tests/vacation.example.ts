import { vacationDefaultObjectId, workerDefaultObjectId } from "./queries";

const vacationExample = {
  _id: vacationDefaultObjectId,
  worker: {
    name: "Elias Maluco",
    role: "Curador de AIDS",
    admissionDate: new Date().toISOString(),
    matriculation: "123123",
    registry: "654.654-8",
  },
  daysQtd: 15,
  startDate: "2023-02-23T17:35:31.308Z",
  type: "vacation",
};

const vacationExamplePayload = {
  ...vacationExample,
  worker: workerDefaultObjectId
}

export { vacationExample, vacationExamplePayload };
