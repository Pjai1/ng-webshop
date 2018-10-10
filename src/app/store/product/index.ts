import * as fromProducts from './product.reducers';
import * as fromRoot from '../index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export const getProductsState = createFeatureSelector<fromRoot.State, fromProducts.State>('products');
export const getRouterState = createFeatureSelector<fromRoot.State, RouterReducerState>('router');

export const getProductsEntitiesState = createSelector(getProductsState, (state) => state.items);
export const getProductEntitiesState = createSelector(getProductsEntitiesState, getRouterState, (products, router) => {
  if (products) {
    return products.find((product) => product.id === parseInt(router.state.root.firstChild.params.id, null));
  }
});
