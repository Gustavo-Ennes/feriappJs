// import typedefs like defined in pizza.typedefs

import { departmentDefinitions } from "./Department";
import { extraHourDefinitions } from "./ExtraHour";
import { pdfDefinitions } from "./Pdf";
import { vacationDefinitions } from "./Vacation";
import { workerDefinitions } from "./Worker";
import { searchDefinitions } from "./search";

const typeDefs = `
  type Query{
    ${departmentDefinitions.queries}
    ${workerDefinitions.queries}
    ${vacationDefinitions.queries}
    ${searchDefinitions.queries}
    ${extraHourDefinitions.queries}
    ${pdfDefinitions.queries}
  }
  type Mutation{
    ${departmentDefinitions.mutations}
    ${workerDefinitions.mutations}
    ${vacationDefinitions.mutations}
    ${extraHourDefinitions.mutations}
  }
  
  ${departmentDefinitions.types}
  ${workerDefinitions.types}
  ${vacationDefinitions.types}
  ${searchDefinitions.types}
  ${extraHourDefinitions.types}
`;

export { typeDefs };
