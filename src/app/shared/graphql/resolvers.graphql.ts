import { Basket, BasketItem, Product } from 'src/graphql-types';

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
  Product: {
    discount: (product: Product) => {
      if (product.price && product.basePrice) {
        return 1 - product.price / product.basePrice;
      }
      return 0;
    },
  },
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
