import { IBasketDto } from '@app/shared/services/basket.service';
import { cold } from 'jasmine-marbles';
import { BasketEffects } from './basket.effects';
import { BasketTypes } from './basket.actions';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';

let service: any;
let basket: IBasketDto;

beforeEach(() => {
  service = {
    getBasket: jest.fn(),
    addToBasket: jest.fn(),
    deleteProductFromBasket: jest.fn(),
    deleteBasket: jest.fn(),
  };
  basket = {
    items: [
      {
        id: 1,
        quantity: 2,
      },
    ],
  };
});

describe('Basket Effects', () => {
  it('should return a basket', () => {
    const source = cold('a', { a: { type: BasketTypes.GET_BASKET } });
    const effects = new BasketEffects(service, new Actions(source));

    const expected = cold('a', { a: { type: BasketTypes.GET_BASKET_SUCCESS, payload: basket } });

    service.getBasket.mockReturnValue(of(basket));
    expect(effects.getBasket$).toBeObservable(expected);
  });

  it('should delete a basket', () => {
    const source = cold('a', { a: { type: BasketTypes.DELETE_BASKET } });
    const effects = new BasketEffects(service, new Actions(source));

    const expected = cold('a', { a: { type: BasketTypes.DELETE_BASKET_SUCCESS, payload: basket } });

    service.deleteBasket.mockReturnValue(of(basket));
    expect(effects.deleteBasket$).toBeObservable(expected);
  });

  it('should delete the product from the basket', () => {
    const source = cold('a', { a: { type: BasketTypes.DELETE_PRODUCT_FROM_BASKET } });
    const effects = new BasketEffects(service, new Actions(source));

    const expected = cold('a', { a: { type: BasketTypes.DELETE_PRODUCT_FROM_BASKET_SUCCESS, payload: basket } });

    service.deleteProductFromBasket.mockReturnValue(of(basket));
    expect(effects.deleteProductFromBasket$).toBeObservable(expected);
  });

  it('should add a product to the basket', () => {
    const source = cold('a', { a: { type: BasketTypes.SAVE_PRODUCT_TO_BASKET, payload: basket.items[0] } });
    const effects = new BasketEffects(service, new Actions(source));
    console.log(basket.items[0]);
    const expected = cold('a', { a: { type: BasketTypes.SAVE_PRODUCT_TO_BASKET_SUCCESS, payload: basket } });

    service.addToBasket.mockReturnValue(of(basket));
    expect(effects.addProductToBasket$).toBeObservable(expected);
  });
});
