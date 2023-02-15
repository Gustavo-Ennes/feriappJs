const departmentsQuery = `
query{
  departments{
    name
  }
} 
`;

const departmentQuery = `
query{
  department(id: 1){
    name
  }
}
`;
const createDepartmentMutation = `
mutation{
  createDepartment(departmentInput:{name: "department 1"}){
    name
    id
  }
}
`;

const deleteDepartmentMutation = `
mutation{
  deleteDepartment(id: 1)
}
`;

const updateDepartmentMutation = `
mutation{
  updateDepartment(departmentInput: { name: "new name to department", id: 1})
}
`;

export {
  departmentsQuery,
  departmentQuery,
  createDepartmentMutation,
  deleteDepartmentMutation,
  updateDepartmentMutation,
};
