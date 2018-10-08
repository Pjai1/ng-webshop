import { Product } from './product.model';

export class Basket {
  totalPrice?: number;
  items?: BasketItem[];

  constructor(data?: Basket) {
    if (!data) {
      return;
    }
    Object.assign(this, data);
  }

  getTotalPrice(): number {
    console.log('how many items ' + this.items.length);
    this.items.forEach((item) => {
      this.totalPrice += item.totalPrice;
    });
    return this.totalPrice;
  }
}

export class BasketItem {
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;

  constructor(data?: Product) {
    if (!data) {
      return;
    }
    Object.assign(this, data);
  }

  getTotalPrice() {
    return (this.totalPrice = this.price * this.quantity);
  }
}
