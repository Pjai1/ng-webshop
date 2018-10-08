import { IProductDto } from '../services/product.service';

export class Product {
  id: number;
  sku: string;
  title: string;
  price: number;
  basePrice: number;
  stocked: boolean;
  image: string;
  desc: string;
  quantity?: number;

  constructor(data?: IProductDto) {
    if (!data) {
      return;
    }
    Object.assign(this, data);
  }

  getDiscount(): number {
    return 1 - this.price / this.basePrice;
  }

  isNew() {
    return !this.id;
  }
}
