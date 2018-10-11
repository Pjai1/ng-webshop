import { Action } from '@ngrx/store';
import { Basket } from 'src/app/shared/models/basket.model';
import { BasketItem } from './basket.reducers';
import { Product } from 'src/app/shared/models/product.model';

export const enum BasketTypes {
  GET_BASKET = 'Get Basket',
  GET_BASKET_SUCCESS = 'Get Basket Success',
  SAVE_PRODUCT_TO_BASKET = 'Save Product To Basket',
  SAVE_PRODUCT_TO_BASKET_SUCCESS = 'Save Product To Basket Success',
  DELETE_BASKET = 'Delete Basket',
  DELETE_BASKET_SUCCESS = 'Delete Basket Success',
  DELETE_PRODUCT_FROM_BASKET_SUCCESS = 'Delete Product From Basket Success',
  DELETE_PRODUCT_FROM_BASKET = 'Delete Product From Basket',
  BASKET_CLICKED = 'Basket Clicked',
}

export class BasketClickedAction implements Action {
  readonly type = BasketTypes.BASKET_CLICKED;
}

export class GetBasketAction implements Action {
  readonly type = BasketTypes.GET_BASKET;
}

export class GetBasketSuccessAction implements Action {
  readonly type = BasketTypes.GET_BASKET_SUCCESS;

  constructor(public payload: BasketItem[]) {}
}

export class SaveProductToBasketAction implements Action {
  readonly type = BasketTypes.SAVE_PRODUCT_TO_BASKET;

  constructor(public payload: BasketItem) {}
}

export class SaveProductToBasketSuccessAction implements Action {
  readonly type = BasketTypes.SAVE_PRODUCT_TO_BASKET_SUCCESS;

  constructor(public payload: Basket) {}
}

export class DeleteBasketAction implements Action {
  readonly type = BasketTypes.DELETE_BASKET;
}

export class DeleteBasketSuccessAction implements Action {
  readonly type = BasketTypes.DELETE_BASKET_SUCCESS;

  constructor(public payload: Basket) {}
}

export class DeleteProductFromBasketAction implements Action {
  readonly type = BasketTypes.DELETE_PRODUCT_FROM_BASKET;

  constructor(public payload: Product) {}
}

export class DeleteProductFromBasketSuccessAction implements Action {
  readonly type = BasketTypes.DELETE_PRODUCT_FROM_BASKET_SUCCESS;

  constructor(public payload: Basket) {}
}

export type BasketActions =
  | GetBasketAction
  | GetBasketSuccessAction
  | SaveProductToBasketAction
  | DeleteBasketAction
  | DeleteBasketSuccessAction
  | DeleteProductFromBasketAction
  | DeleteProductFromBasketSuccessAction
  | BasketClickedAction;
