import { Model } from "sequelize";

import { PizzaModel } from "../../pizza.model";

const createPizzaResolver = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
): Promise<Model> => {
  const { pizzaInput } = args;
  const pizzaInstance = await PizzaModel.create(pizzaInput);
  return pizzaInstance;
};

export { createPizzaResolver };
