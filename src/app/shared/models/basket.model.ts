import { Product } from './product.model';

export class Basket {
  id: number;
  quantity: string;
  totalPrice: number;

  constructor(data?: Basket) {
    if (!data) {
      return;
    }
    Object.assign(this, data);
  }

  // getTotalPrice(basketItems: BasketItem[]): string {

  // }
}

export class BasketItem {
  title: string;
  price: number;
  quantity: string;

  constructor(data?: Product) {
    if (!data) {
      return;
    }
    Object.assign(this, data);
  }
}
