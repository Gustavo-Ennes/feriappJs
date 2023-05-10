// import typedefs like defined in pizza.typedefs

import { departmentDefinitions } from "./Department";
import { workerDefinitions } from "./Worker";
import { vacationDefinitions } from "./Vacation";
import { searchDefinitions } from "./search";
import { extraHoursTableDefinitions } from "./ExtraHoursTable";

const typeDefs = `
  type Query{
    ${departmentDefinitions.queries}
    ${workerDefinitions.queries}
    ${vacationDefinitions.queries}
    ${searchDefinitions.queries}
    ${extraHoursTableDefinitions.queries}
  }
  type Mutation{
    ${departmentDefinitions.mutations}
    ${workerDefinitions.mutations}
    ${vacationDefinitions.mutations}
    ${extraHoursTableDefinitions.mutations}
  }
  
  ${departmentDefinitions.types}
  ${workerDefinitions.types}
  ${vacationDefinitions.types}
  ${searchDefinitions.types}
  ${extraHoursTableDefinitions.types}
`;

export { typeDefs };
