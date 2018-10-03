import { ProductService } from './product.service';
import { Product } from '../shared/models/product.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';

describe('Product Service', () => {
  let service: ProductService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProductService(<any>httpClientSpy);
  });

  it('should return products', async(() => {
    const expectedProducts: any = [
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
    ];

    httpClientSpy.get.and.returnValue(of(expectedProducts));

    service
      .getProducts()
      .subscribe((products) => expect(products).toEqual(expectedProducts, 'Expected products'), fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'Called once');
  }));

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    service
      .getProducts()
      .subscribe(
        (products) => fail('expected an error, not products'),
        (error) => expect(error).toEqual(errorResponse),
      );
  });
});
