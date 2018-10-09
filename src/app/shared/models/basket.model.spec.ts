import { Basket, BasketItem } from './basket.model';
import { async } from '@angular/core/testing';
import { Product } from './product.model';

describe('Basket Model', () => {
  let basketDto: any;
  let testProduct: Product;

  beforeEach(() => {
    basketDto = {
      items: [
        {
          id: 1,
          quantity: 2,
          totalPrice: 5,
        },
        {
          id: 2,
          quantity: 5,
          totalPrice: 10,
        },
      ],
    };
    testProduct = new Product();
    testProduct.quantity = 2;
    testProduct.price = 6;
    testProduct.title = 'aproduct';
    testProduct.id = 123;
  });

  it('should set constructor properties', async(() => {
    const basket: Basket = new Basket(basketDto);

    expect(basket.totalPrice).toBe(0);
    expect(basket.items).toBe(basketDto.items);
  }));

  it('shouldn\'t set properties when object is empty', async(() => {
    const basket: Basket = new Basket();

    expect(basket.totalPrice).toEqual(0);
    expect(basket.items).toEqual([]);
  }));

  it('should calculate the total price', async(() => {
    const basket: Basket = new Basket(basketDto);
    basket.getTotalPrice();
    expect(basket.totalPrice).toEqual(15);
  }));

  describe('Basket Item Model', () => {
    it('should set constructor properties', async(() => {
      const basketItem: BasketItem = new BasketItem(testProduct);

      expect(basketItem.id).toBe(testProduct.id);
      expect(basketItem.title).toBe(testProduct.title);
      expect(basketItem.quantity).toBe(testProduct.quantity);
    }));

    it('shouldn\'t set properties when object is empty', async(() => {
      const basketItem: BasketItem = new BasketItem();

      expect(basketItem.id).toBe(undefined);
      expect(basketItem.title).toBe(undefined);
      expect(basketItem.quantity).toBe(undefined);
    }));

    it('should calculate the total price', async(() => {
      const basketItem: BasketItem = new BasketItem(testProduct);
      basketItem.getTotalPrice();
      expect(basketItem.totalPrice).toBe(12);
    }));
  });
});
