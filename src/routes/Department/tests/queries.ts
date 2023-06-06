const departmentsQuery = `
query{
  departments{
    _id
    name
    responsible
  }
} 
`;

const departmentQuery = `
query{
  department(_id: "1"){
    _id
    name
    responsible
  }
}
`;
const createDepartmentMutation = `
mutation{
  createDepartment(departmentInput:{name: "department 1", responsible: "owner"}){
    name
    responsible
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
  updateDepartment(departmentInput: { name: "new name to department", _id: "1", responsible: "new Owner"})
}
`;

export {
  departmentsQuery,
  departmentQuery,
  createDepartmentMutation,
  deleteDepartmentMutation,
  updateDepartmentMutation,
};
