// see index/typedefs
const pizzaDefinitions = {
  types: `
    type Pizza{
      id: ID!
      topping: String!
      extras: [Extra!]
      price: Float!
    }

    input PizzaInput{
      topping: String!
      extras: [ExtraInput!]
      price: Float!
    }

    input ExtraInput{
      edgeStuffing: String
      extraFlavours: [String!]
    }
  
    type Extra {
      edgeStuffing: String
      extraFlavours: [String!]
    }
  `,
  queries: `
    pizza(id: ID!): Pizza
  `,
  mutations: `
    createPizza(pizzaInput: PizzaInput): Pizza
  `,
};

export { pizzaDefinitions };
