import { Basket, BasketItem } from 'src/graphql-types';

export interface IBasket extends Basket {
  totalPrice: number;
  items: IBasketItem[];
}

export interface IBasketItem extends BasketItem {
  totalPrice: number;
}

export const defaults = {};

export const resolvers = {
  Mutation: {},
  Basket: {
    totalPrice: (basket: Basket) => {
      return basket.items.reduce((acc, item) => {
        if (!item.product) {
          return acc;
        }
        const totalOfItem = item.product.price * item.quantity;
        return acc + totalOfItem;
      }, 0);
    },
  },
  BasketItem: {
    totalPrice: (basketItem: IBasketItem) => {
      if (!basketItem.product) {
        return 0;
      }

      if (!basketItem.product.price || !basketItem.quantity) {
        return 0;
      }
      return basketItem.product.price * basketItem.quantity;
    },
  },
};
