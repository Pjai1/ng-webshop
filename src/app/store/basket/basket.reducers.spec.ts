import * as fromBasket from './basket.reducers';
import * as fromActions from './basket.actions';
import { IBasketDto } from '@app/shared/services/basket.service';
const deepfreeze = require('deep-freeze');

describe('Basket Reducer', () => {
  it('should return the default state', () => {
    const { initialState } = fromBasket;
    deepfreeze(initialState);
    const action: any = {};
    const state = fromBasket.basketReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should return the clicked state', () => {
    const { initialState } = fromBasket;
    deepfreeze(initialState);

    const basketClicked = true;

    const changedState = fromBasket.basketReducer(initialState, { type: fromActions.BasketTypes.BASKET_CLICKED });
    expect(changedState.basketOpen).toBe(basketClicked);
  });

  it('should return the basket', () => {
    const { initialState } = fromBasket;
    deepfreeze(initialState);

    const payload: fromBasket.IBasketItemDto[] = [
      {
        id: 1,
        quantity: 3,
      },
    ];

    const changedState = fromBasket.basketReducer(initialState, {
      type: fromActions.BasketTypes.GET_BASKET_SUCCESS,
      payload,
    });
    expect(changedState.items).toBe(payload);
  });

  it('should add the product to the basket', () => {
    const basket: fromBasket.IState = {
      items: [{ id: 2, quantity: 1 }],
      basketOpen: false,
    };
    const initialState = basket;
    deepfreeze(initialState);

    const payload: fromBasket.IBasketItemDto = {
      id: 1,
      quantity: 5,
    };

    const changedState = fromBasket.basketReducer(initialState, {
      type: fromActions.BasketTypes.SAVE_PRODUCT_TO_BASKET,
      payload,
    });
    expect(changedState.items[changedState.items.length - 1]).toBe(payload);
  });

  it('should save the product to the basket', () => {
    const basket: fromBasket.IState = {
      items: [{ id: 2, quantity: 1 }],
      basketOpen: false,
    };
    const initialState = basket;
    deepfreeze(initialState);

    const payload: fromBasket.IBasketItemDto = {
      id: 2,
      quantity: 5,
    };

    const changedState = fromBasket.basketReducer(initialState, {
      type: fromActions.BasketTypes.SAVE_PRODUCT_TO_BASKET,
      payload,
    });
    expect(changedState.items[0].id).toBe(payload.id);
    expect(changedState.items[0].quantity).toBe(payload.quantity + basket.items[0].quantity);
  });

  it('should delete the basket', () => {
    const basket: fromBasket.IState = {
      items: [{ id: 2, quantity: 1 }],
      basketOpen: false,
    };
    const initialState = basket;
    deepfreeze(initialState);

    const payload: IBasketDto = {
      items: [
        {
          id: 2,
          quantity: 1,
        },
      ],
    };

    const changedState = fromBasket.basketReducer(initialState, {
      type: fromActions.BasketTypes.DELETE_BASKET_SUCCESS,
      payload,
    });
    expect(changedState.items).toEqual([]);
  });
});
