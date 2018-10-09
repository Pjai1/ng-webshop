import { Product } from './product.model';
import { BasketDto } from '../services/basket.service';

export class Basket {
  totalPrice = 0;
  items?: BasketItem[] = [];

  constructor(data?: BasketDto) {
    if (!data) {
      return;
    }
    Object.assign(this, data);
  }

  getTotalPrice(): number {
    console.log('how many items ' + this.items.length);
    if (this.items) {
      this.totalPrice = 0;
      this.items.forEach((item) => {
        console.log('COUNTING TOTAL PRICE ' + JSON.stringify(item));
        this.totalPrice += item.totalPrice;
      });
      return this.totalPrice;
    }
  }
}

export class BasketItem {
  id: number;
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

  getTotalPrice(): number {
    return (this.totalPrice = this.price * this.quantity);
  }
}
