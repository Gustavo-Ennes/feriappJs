const departmentDefinitions = {
  types: `
    type Department{
      id: ID!
      name: String!
    }

    input DepartmentInput{
      id: ID
      name: String!
    }
  `,
  queries: `
    department(id: ID!): Department
    departments: [Department]
  `,
  mutations: `
    createDepartment(departmentInput: DepartmentInput): Department
    deleteDepartment(id: ID!): Boolean
    updateDepartment(departmentInput: DepartmentInput): Boolean
  `,
};

export { departmentDefinitions };
