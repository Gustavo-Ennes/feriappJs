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
const processExtraHourMutation = `
mutation ProcessExtraHour($extraHourInput: [ExtraHourInput]!){
  processExtraHours(extraHourInput: $extraHourInput){
    created
    updated
    deleted
  }
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
  processExtraHourMutation,
  deleteExtraHourMutation,
};
