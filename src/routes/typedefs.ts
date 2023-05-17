// import typedefs like defined in pizza.typedefs

import { departmentDefinitions } from "./Department";
import { workerDefinitions } from "./Worker";
import { vacationDefinitions } from "./Vacation";
import { searchDefinitions } from "./search";
import { extraHourDefinitions } from "./ExtraHour";

const typeDefs = `
  type Query{
    ${departmentDefinitions.queries}
    ${workerDefinitions.queries}
    ${vacationDefinitions.queries}
    ${searchDefinitions.queries}
    ${extraHourDefinitions.queries}
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
