import { ProductService } from './product.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';

describe('Product Service', () => {
  let service: ProductService;
  const httpClientSpy = { get: jest.fn() };

  beforeEach(() => {
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProductService(<any>httpClientSpy);
  });

  it('should return products', async(() => {
    const expectedProducts: any = {
      selectedProducts: [
        {
          id: '123',
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

    httpClientSpy.get.mockReturnValue(of(expectedProducts));

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(expectedProducts.selectedProducts);
    });
    expect(httpClientSpy.get.mock.calls.length).toBe(1);
  }));

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    service
      .getProducts()
      .subscribe(
        (products) => fail('expected an error, not products'),
        (error) => expect(error).toEqual(errorResponse),
      );
  });
});
