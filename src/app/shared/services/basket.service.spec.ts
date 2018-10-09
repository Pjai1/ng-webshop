import { BasketService, BasketDto, BasketItemDto } from './basket.service';
import { Basket } from '../models/basket.model';
import { async } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../models/product.model';

describe('Basket Service', () => {
  let service: BasketService;
  let httpClientSpy: any;
  let expectedBasket: BasketItemDto[];
  let testProduct: Product;

  beforeEach(() => {
    httpClientSpy = { get: jest.fn(), post: jest.fn(), delete: jest.fn() };
    service = new BasketService(<any>httpClientSpy);
    expectedBasket = [new BasketItemDto()];
    testProduct = new Product();
  });

  it('should return a basket', async(() => {
    httpClientSpy.get.mockReturnValue(of(expectedBasket));

    service.getBasket().subscribe((basket) => {
      expect(basket).toBeInstanceOf(Basket);
    });
    expect(httpClientSpy.get.mock.calls.length).toBe(1);
  }));

  it('should add a product to the basket', async(() => {
    httpClientSpy.post.mockReturnValue(of(expectedBasket));

    service.addToBasket(testProduct, 2).subscribe((basket) => {
      expect(basket).toBeInstanceOf(Basket);
    });
    expect(httpClientSpy.post.mock.calls.length).toBe(1);
  }));

  it('should delete the basket', async(() => {
    httpClientSpy.delete.mockReturnValue(of(expectedBasket));

    service.deleteBasket().subscribe((basket) => {
      expect(basket).toBeInstanceOf(Basket);
    });
    expect(httpClientSpy.delete.mock.calls.length).toBe(1);
  }));

  it('should delete a product from the basket', async(() => {
    httpClientSpy.delete.mockReturnValue(of(expectedBasket));

    service.deleteProductFromBasket(testProduct).subscribe((basket) => {
      expect(basket).toBeInstanceOf(Basket);
    });
    expect(httpClientSpy.delete.mock.calls.length).toBe(1);
  }));
});
