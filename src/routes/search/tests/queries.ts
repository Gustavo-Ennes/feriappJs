const searchQuery = `
query SearchTerm($searchTerm: String!){
  search(searchTerm: $searchTerm){
    vacations{
      _id
      worker{
        _id
        name
      }
    }
    departments{
      _id
      name
    }
    workers{
      _id
      name
    }
  }
}
`;

export { searchQuery };
