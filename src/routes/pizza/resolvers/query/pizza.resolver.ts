import { Model } from "sequelize";

import { PizzaModel } from "../../pizza.model";

const pizzaResolver = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
): Promise<Model | null> => {
  const { id } = args
  const pizzaInstance = await PizzaModel.findByPk(id);
  return pizzaInstance;
};

export { pizzaResolver };
