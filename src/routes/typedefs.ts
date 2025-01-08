// import typedefs like defined in pizza.typedefs

import { bossDefinitions } from "./Boss";
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
    ${bossDefinitions.queries}
  }
  type Mutation{
    ${departmentDefinitions.mutations}
    ${workerDefinitions.mutations}
    ${vacationDefinitions.mutations}
    ${extraHourDefinitions.mutations}
    ${bossDefinitions.mutations}
  }
  
  ${departmentDefinitions.types}
  ${workerDefinitions.types}
  ${vacationDefinitions.types}
  ${searchDefinitions.types}
  ${extraHourDefinitions.types}
  ${bossDefinitions.types}
`;

export { typeDefs };
