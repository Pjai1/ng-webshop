import { IProductDto } from '../services/product.service';

export class Product {
  id: string;
  sku: string;
  title: string;
  price: number;
  basePrice: number;
  stocked: boolean;
  image: string;
  desc: string;

  constructor(data?: IProductDto) {
    Object.assign(this, data);
  }

  getDiscount(): number {
    return Math.round((1 - this.price / this.basePrice) * 100);
  }
}
