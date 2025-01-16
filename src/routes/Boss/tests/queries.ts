const bossesQuery = `
query{
  bosses{
    _id
    name
    role
    isDirector
  }
} 
`;

const bossQuery = `
query{
  boss(_id: "1"){
    _id
    name
    role
    isDirector
  }
}
`;

const createBossMutation = `
mutation{
  createBoss(bossInput:{name: "boss 1", role: "owner"}){
    name
    role
    _id
    isDirector
  }
}
`;

const deleteBossMutation = `
mutation{
  deleteBoss(_id: "1")
}
`;

const updateBossMutation = `
mutation{
  updateBoss(bossInput: { name: "new name to department", _id: "1", role: "new Owner"})
}
`;

export {
  bossesQuery,
  bossQuery,
  createBossMutation,
  deleteBossMutation,
  updateBossMutation
};
