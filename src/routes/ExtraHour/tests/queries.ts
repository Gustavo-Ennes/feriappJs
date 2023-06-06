const extraHourQuery = `
query ExtraHourById($extraHourInput: ExtraHourInput!){
  extraHour(extraHourInput: $extraHourInput) {
    _id
    reference
    worker{
      _id
      name
    }
    amount
    nightlyAmount
  }
}
`;

const extraHoursQuery = `
query ExtraHoursWithRange($extraHourInput: ExtraHourInput){
  extraHours(extraHourInput: $extraHourInput) {
    _id
    reference
    worker{
      _id
      name
    }
    amount
    nightlyAmount
  }
}
`;
const createExtraHourMutation = `
mutation CreateExtraHour($extraHourInput: ExtraHourInput!){
  createExtraHour(extraHourInput: $extraHourInput){
    _id
    reference
    worker{
      _id
      name
    }
    amount
    nightlyAmount
  }
}
`;
const updateExtraHourMutation = `
mutation UpdateExtraHour($extraHourInput: ExtraHourInput!){
  updateExtraHour(extraHourInput: $extraHourInput)
}
`;

const deleteExtraHourMutation = `
mutation DeleteExtraHour($_id: ID!){
  deleteExtraHour(_id: $_id)
}
`;

export {
  extraHourQuery,
  extraHoursQuery,
  createExtraHourMutation,
  updateExtraHourMutation,
  deleteExtraHourMutation,
};
