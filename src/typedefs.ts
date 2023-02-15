// import typedefs like defined in pizza.typedefs

import { departmentDefinitions } from "./routes/Department/department.typedefs";
const typeDefs = `
  type Query{
    ${departmentDefinitions.queries}
  }
  type Mutation{
    ${departmentDefinitions.mutations}
  }
  
  ${departmentDefinitions.types}
`;

export { typeDefs };
