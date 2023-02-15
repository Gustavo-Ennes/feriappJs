interface Extra {
  edgeStuffing?: String[];
  extraTopping?: String[];
}

export interface Pizza {
  topping: String;
  extras?: Extra[];
  price: Number;
}
