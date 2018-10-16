import * as fromBasket from './basket.reducers';
import * as fromRoot from '../index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getProductsEntitiesState } from '../product';

export const getBasketState = createFeatureSelector<fromRoot.State, fromBasket.IState>('basket');

export const getBasketClickedState = createSelector(getBasketState, (state) => state.basketOpen);

export const getBasketEntitiesState = createSelector(getBasketState, (state) => state.items);

export const getBasketWithProductsState = createSelector(
  getProductsEntitiesState,
  getBasketEntitiesState,
  (products, basket) => {
    if (products && basket && basket.length > 0) {
      console.log(products, basket);
      const basketItems = basket.map((item) => {
        const basketItem = products.find((product) => product.id === item.id);
        if (basketItem) {
          return {
            title: basketItem.title,
            price: basketItem.price,
            quantity: item.quantity,
            total: item.quantity * basketItem.price,
          };
        }
        return { total: 0 };
      });
      const totalPrice = basketItems.reduce((acc, item) => acc + item.total, 0);
      return { basketItems, totalPrice };
    }

    return {
      basketItems: [],
      totalPrice: 0,
    };
  },
);
