// import typedefs like defined in pizza.typedefs

import { departmentDefinitions } from "./Department";
import { workerDefinitions } from "./Worker";
import { vacationDefinitions } from "./Vacation";
import { searchDefinitions } from "./search";

const typeDefs = `
  type Query{
    ${departmentDefinitions.queries}
    ${workerDefinitions.queries}
    ${vacationDefinitions.queries}
    ${searchDefinitions.queries}
  }
  type Mutation{
    ${departmentDefinitions.mutations}
    ${workerDefinitions.mutations}
    ${vacationDefinitions.mutations}
  }
  
  ${departmentDefinitions.types}
  ${workerDefinitions.types}
  ${vacationDefinitions.types}
  ${searchDefinitions.types}
`;

export { typeDefs };
