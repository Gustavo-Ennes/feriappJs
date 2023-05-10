const extraHoursTableQuery = `
query ExtraHourById($_id: ID!){
  extraHoursTable(_id: $_id){
    _id
    reference
    days{
      number
      hours{
        workerId
        number
      }
    }
  }
}
`;

const extraHourTablesQuery = `
query{
  extraHoursTables{
    _id
    reference
    days{
      number
      hours{
        workerId
        number
      }
    }
  }
}
`;
const createExtraHourTableMutation = `
mutation CreateExtraHoursTable($extraHoursTableInput: ExtraHoursTableInput!){
  createExtraHoursTable(extraHoursTableInput: $extraHoursTableInput){
    _id
    reference
    days{
      number
      hours{
        workerId
        number
      }
    }
  }
}
`;
const updateExtraHourTableMutation = `
mutation UpdateExtraHoursTable($extraHoursTableInput: ExtraHoursTableInput!){
  updateExtraHoursTable(extraHoursTableInput: $extraHoursTableInput)
}
`;

const deleteExtrahourTableMutation = `
mutation DeleteExtraHoursTable($_id: ID!){
  deleteExtraHoursTable(_id: $_id)
}
`;

export {
  extraHoursTableQuery,
  extraHourTablesQuery,
  createExtraHourTableMutation,
  updateExtraHourTableMutation,
  deleteExtrahourTableMutation,
};
