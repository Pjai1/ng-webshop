import { Action } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';

export const GET_PRODUCTS = 'Get Products';
export const GET_PRODUCTS_SUCCESS = 'Get Products Success';

export class GetProductsAction implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetProductsSuccessAction implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}

export type ProductActions = GetProductsAction | GetProductsSuccessAction;
