import { Product } from './product.model';
import { IProductDto } from '../services/product.service';

describe('Product Model', () => {
  let productDto: IProductDto;

  beforeEach(() => {
    productDto = {
      id: 1,
      sku: '234',
      title: 'fancy product title',
      price: 1.23,
      basePrice: 2.2,
      stocked: true,
      image: 'https://someimage.png',
      desc: 'I am a fancy image',
    };
  });

  it('should set constructor properties', () => {
    const product: any = new Product(productDto);

    expect(product.id).toBe(1);
    expect(product.sku).toBe(productDto.sku);
    expect(product.title).toBe(productDto.title);
    expect(product.price).toBe(productDto.price);
    expect(product.basePrice).toBe(productDto.basePrice);
    expect(product.stocked).toBe(productDto.stocked);
    expect(product.image).toBe(productDto.image);
    expect(product.desc).toBe(productDto.desc);
  });

  it('shouldn\'t set properties when object is empty', () => {
    const product: any = new Product();

    expect(product.id).toBe(undefined);
    expect(product.sku).toBe(undefined);
    expect(product.title).toBe(undefined);
    expect(product.price).toBe(undefined);
    expect(product.basePrice).toBe(undefined);
    expect(product.stocked).toBe(undefined);
    expect(product.image).toBe(undefined);
    expect(product.desc).toBe(undefined);
  });

  it('should give a discount number', () => {
    const product: Product = new Product(productDto);
    const discountNumber: number = product.getDiscount();
    console.log(discountNumber);

    expect(typeof discountNumber).toBe('number');
  });
});
