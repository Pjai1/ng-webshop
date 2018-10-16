import { Basket } from 'src/graphql-types';

export interface IBasket {
  totalPrice: number;
  items: [IBasketItem];
}

export interface IBasketItem {
  quantity: number;
  id: number;
  title: string;
  price: number;
  totalPrice: number;
}

export function ClearBasket() {
  const newBasket: IBasket = {
    totalPrice: 0,
    items: <any>[],
  };

  return newBasket;
}

export function CreateBasket(data: Basket) {
  console.log(data);
  const newBasket: IBasket = {
    totalPrice: 0,
    items: <any>[],
  };
  data.items.forEach((item) => {
    const newItem: IBasketItem = {
      id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      title: item.product.title,
      totalPrice: item.product.price * item.quantity,
    };
    newBasket.totalPrice += newItem.totalPrice;
    newBasket.items.push(newItem);
  });
  return newBasket;
}
