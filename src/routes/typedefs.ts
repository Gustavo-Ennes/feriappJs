// import typedefs like defined in pizza.typedefs

import { departmentDefinitions } from "./Department";
import { workerDefinitions } from "./Worker";

const typeDefs = `
  type Query{
    ${departmentDefinitions.queries}
    ${workerDefinitions.queries}
  }
  type Mutation{
    ${departmentDefinitions.mutations}
    ${workerDefinitions.mutations}
  }
  
  ${departmentDefinitions.types}
  ${workerDefinitions.types}
`;

export { typeDefs };
