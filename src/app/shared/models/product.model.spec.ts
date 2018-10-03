import { Product } from './product.model';
import { IProductDto } from '../../services/product.service';

describe('Product Model', () => {
  let productDto: IProductDto;

  beforeEach(() => {
    productDto = {
      total: 1,
      page: 2,
      pageSize: 50,
      selectedProducts: [
        {
          id: '1',
          sku: '234',
          title: 'fancy product title',
          price: 1.23,
          basePrice: 2.2,
          stocked: true,
          image: 'https://someimage.png',
          desc: 'I am a fancy image',
        },
      ],
    };
  });

  it('should set constructor properties', () => {
    const product: any = new Product(productDto);

    expect(product.selectedProducts['0'].id).toBe(productDto.selectedProducts['0'].id);
    expect(product.selectedProducts['0'].sku).toBe(productDto.selectedProducts['0'].sku);
    expect(product.selectedProducts['0'].title).toBe(productDto.selectedProducts['0'].title);
    expect(product.selectedProducts['0'].price).toBe(productDto.selectedProducts['0'].price);
    expect(product.selectedProducts['0'].basePrice).toBe(productDto.selectedProducts['0'].basePrice);
    expect(product.selectedProducts['0'].stocked).toBe(productDto.selectedProducts['0'].stocked);
    expect(product.selectedProducts['0'].image).toBe(productDto.selectedProducts['0'].image);
    expect(product.selectedProducts['0'].desc).toBe(productDto.selectedProducts['0'].desc);
  });

  it('should give a discount number', () => {
    const product: Product = new Product(productDto);
    const discountNumber: number = product.getDiscount();
    console.log(discountNumber);

    expect(discountNumber).toBeInstanceOf('number');
  });
});
