import { Action } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';

export const GET_PRODUCTS = 'Get Products';
export const GET_PRODUCTS_SUCCESS = 'Get Products Success';
export const GET_PRODUCT = 'Get Product';
export const GET_PRODUCT_SUCCESS = 'Get Product Success';
export const SAVE_PRODUCT = 'Save Product';
export const SAVE_PRODUCT_SUCCESS = 'Save Product Success';
export const DELETE_PRODUCT = 'Delete Product';
export const DELETE_PRODUCT_SUCCESS = 'Delete Product Success';

export class GetProductsAction implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetProductsSuccessAction implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}

export class GetProductAction implements Action {
  readonly type = GET_PRODUCT;

  constructor(public payload: number) {}
}

export class GetProductSuccessAction implements Action {
  readonly type = GET_PRODUCT_SUCCESS;

  constructor(public payload: Product) {}
}

export class SaveProductAction implements Action {
  readonly type = SAVE_PRODUCT;

  constructor(public payload: Product) {}
}

export class SaveProductSuccessAction implements Action {
  readonly type = SAVE_PRODUCT_SUCCESS;

  constructor(public payload: Product) {}
}

export class DeleteProductAction implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: Product) {}
}

export class DeleteProductSuccessAction implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;

  constructor(public payload: Product) {}
}

export type ProductActions =
  | GetProductsAction
  | GetProductsSuccessAction
  | GetProductAction
  | GetProductSuccessAction
  | SaveProductAction
  | SaveProductSuccessAction
  | DeleteProductAction
  | DeleteProductSuccessAction;
