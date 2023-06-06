const departmentDefinitions = {
  types: `
    type Department{
      _id: ID
      name: String
      responsible: String
      createdAt: Date
      updatedAt: Date
    }

    input DepartmentInput{
      _id: ID
      name: String!
      responsible: String!
    }
  `,
  queries: `
    department(_id: ID!): Department
    departments: [Department]
  `,
  mutations: `
    createDepartment(departmentInput: DepartmentInput): Department
    deleteDepartment(_id: ID!): Boolean
    updateDepartment(departmentInput: DepartmentInput): Boolean
  `,
};

export { departmentDefinitions };
