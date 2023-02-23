import { mock } from "sinon";

import { Department } from "../routes/Department";
import { Worker } from "../routes/Worker";
import { Vacation } from "../routes/Vacation";

const workerMock = mock(Worker);
const departmentMock = mock(Department);
const vacationMock = mock(Vacation);

export { workerMock, departmentMock, vacationMock };
