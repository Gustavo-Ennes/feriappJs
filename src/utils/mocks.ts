import { mock } from "sinon";

import { Department } from "../routes/Department";
import { Worker } from "../routes/Worker";

const workerMock = mock(Worker);
const departmentMock = mock(Department);

export { workerMock, departmentMock };
