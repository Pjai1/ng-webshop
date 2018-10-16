import * as fromProducts from './product.reducers';
import * as fromRoot from '../index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { IProductDto } from 'src/app/shared/services/product.service';

export const getProductsState = createFeatureSelector<fromRoot.State, fromProducts.IState>('products');
export const getRouterState = createFeatureSelector<fromRoot.State, RouterReducerState>('router');

export const calculateDiscount = (price: number, basePrice: number): number => {
  return 1 - price / basePrice;
};

export const getProductsEntitiesState = createSelector(getProductsState, (products) => {
  if (products) {
    return products.items.map((item) => ({
      ...item,
      discount: item.price && item.basePrice ? calculateDiscount(item.price, item.basePrice) : 0,
    }));
  }
});
export const getProductEntitiesState = createSelector(getProductsEntitiesState, getRouterState, (products, router) => {
  if (products) {
    return products.find((product) => product.id === parseInt(router.state.root.firstChild.params.id, null));
  }
});
