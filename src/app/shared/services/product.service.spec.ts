import { ProductService } from './product.service';
import { of } from 'rxjs';
import { async } from '@angular/core/testing';

describe('Product Service', () => {
  let service: ProductService;
  let httpClientSpy: any;
  let expectedProduct: any;
  let expectedProducts: any;

  beforeEach(() => {
    httpClientSpy = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() };
    service = new ProductService(<any>httpClientSpy);

    expectedProduct = {
      id: 123,
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
      isNew() {
        return !this.id;
      },
    };

    expectedProducts = {
      selectedProducts: [
        {
          id: 123,
          sku: '4789',
          stocked: true,
          desc: 'Our best product!',
          title: 'Truly the best lawn-mower',
          price: 12.9,
          basePrice: 10,
          image: 'https://bestimageever.png',
        },
      ],
    };
  });

  it('should return products', async(() => {
    httpClientSpy.get.mockReturnValue(of(expectedProducts));

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(expectedProducts.selectedProducts);
    });
    expect(httpClientSpy.get.mock.calls.length).toBe(1);
  }));

  it('should return a product', async(() => {
    httpClientSpy.get.mockReturnValue(of(expectedProduct));

    service.getProduct(expectedProduct.id).subscribe((product) => {
      expect(product).toEqual(expectedProduct);
    });
    expect(httpClientSpy.get.mock.calls.length).toBe(1);
  }));

  it('should create a product', async(() => {
    httpClientSpy.post.mockReturnValue(of(expectedProduct));

    service.createProduct(expectedProduct).subscribe((createdProduct) => {
      expect(createdProduct).toEqual(expectedProduct);
    });
    expect(httpClientSpy.post.mock.calls.length).toBe(1);
  }));

  it('should change a product', async(() => {
    httpClientSpy.put.mockReturnValue(of(expectedProduct));

    service.updateProduct(expectedProduct).subscribe((updatedProduct) => {
      expect(updatedProduct).toEqual(expectedProduct);
    });
    expect(httpClientSpy.put.mock.calls.length).toBe(1);
  }));

  it('should delete a product', async(() => {
    httpClientSpy.delete.mockReturnValue(of(expectedProduct));

    service.deleteProduct(expectedProduct).subscribe((deletedProduct) => {
      expect(deletedProduct).toEqual(expectedProduct);
    });
    expect(httpClientSpy.delete.mock.calls.length).toBe(1);
  }));

  it('should save a product when an id is given', async(() => {
    httpClientSpy.put.mockReturnValue(of(expectedProduct));

    service.saveProduct(expectedProduct).subscribe((savedProduct) => {
      expect(savedProduct).toEqual(expectedProduct);
    });
    expect(httpClientSpy.put.mock.calls.length).toBe(1);
  }));
});
