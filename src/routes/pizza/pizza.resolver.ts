// export queries, mutations and subscriptions to index files import

import { pizzaResolver } from "./resolvers";
import { createPizzaResolver } from "./resolvers/mutation/createPizza.resolver";

const pizzaResolvers = {
  Query: { pizza: pizzaResolver },
  Mutation: { createPizza: createPizzaResolver },
};

export { pizzaResolvers };
