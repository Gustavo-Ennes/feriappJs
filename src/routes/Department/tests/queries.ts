const departmentsQuery = `
query{
  departments{
    name
  }
} 
`;

const departmentQuery = `
query{
  department(_id: "1"){
    name
  }
}
`;
const createDepartmentMutation = `
mutation{
  createDepartment(departmentInput:{name: "department 1"}){
    name
    _id
  }
}
`;

const deleteDepartmentMutation = `
mutation{
  deleteDepartment(_id: "1")
}
`;

const updateDepartmentMutation = `
mutation{
  updateDepartment(departmentInput: { name: "new name to department", _id: "1"})
}
`;

export {
  departmentsQuery,
  departmentQuery,
  createDepartmentMutation,
  deleteDepartmentMutation,
  updateDepartmentMutation,
};
