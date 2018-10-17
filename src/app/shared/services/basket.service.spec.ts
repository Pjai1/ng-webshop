import { BasketService, BasketItemDto } from './basket.service';
import { async } from '@angular/core/testing';
import { of } from 'rxjs';
import { IProductItemDto } from 'src/app/store/product/product.reducers';

describe('Basket Service', () => {
  let service: BasketService;
  let httpClientSpy: any;
  let expectedBasket: BasketItemDto[];
  let testProduct: IProductItemDto;

  beforeEach(() => {
    httpClientSpy = { get: jest.fn(), post: jest.fn(), delete: jest.fn() };
    service = new BasketService(<any>httpClientSpy);
    expectedBasket = [{}];
    testProduct = {};
  });

  it('should return a basket', async(() => {
    httpClientSpy.get.mockReturnValue(of(expectedBasket));

    service.getBasket().subscribe((basket) => {});
    expect(httpClientSpy.get.mock.calls.length).toBe(1);
  }));

  it('should add a product to the basket', async(() => {
    httpClientSpy.post.mockReturnValue(of(expectedBasket));

    service.addToBasket(1, 2).subscribe((basket) => {});
    expect(httpClientSpy.post.mock.calls.length).toBe(1);
  }));

  it('should delete the basket', async(() => {
    httpClientSpy.delete.mockReturnValue(of(expectedBasket));

    service.deleteBasket().subscribe((basket) => {});
    expect(httpClientSpy.delete.mock.calls.length).toBe(1);
  }));

  it('should delete a product from the basket', async(() => {
    httpClientSpy.delete.mockReturnValue(of(expectedBasket));

    service.deleteProductFromBasket(testProduct).subscribe((basket) => {});
    expect(httpClientSpy.delete.mock.calls.length).toBe(1);
  }));
});
