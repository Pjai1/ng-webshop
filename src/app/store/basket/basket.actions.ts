import { Action } from '@ngrx/store';
import { IProductDto } from '@app/shared/services/product.service';
import { IBasketItemDto } from './basket.reducers';
import { IBasketDto } from '@app/shared/services/basket.service';

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

  constructor(public payload: IBasketItemDto[]) {}
}

export class SaveProductToBasketAction implements Action {
  readonly type = BasketTypes.SAVE_PRODUCT_TO_BASKET;

  constructor(public payload: IBasketItemDto) {}
}

export class SaveProductToBasketSuccessAction implements Action {
  readonly type = BasketTypes.SAVE_PRODUCT_TO_BASKET_SUCCESS;

  constructor(public payload: IBasketDto) {}
}

export class DeleteBasketAction implements Action {
  readonly type = BasketTypes.DELETE_BASKET;
}

export class DeleteBasketSuccessAction implements Action {
  readonly type = BasketTypes.DELETE_BASKET_SUCCESS;

  constructor(public payload: IBasketDto) {}
}

export class DeleteProductFromBasketAction implements Action {
  readonly type = BasketTypes.DELETE_PRODUCT_FROM_BASKET;

  constructor(public payload: IProductDto) {}
}

export class DeleteProductFromBasketSuccessAction implements Action {
  readonly type = BasketTypes.DELETE_PRODUCT_FROM_BASKET_SUCCESS;

  constructor(public payload: IBasketItemDto[]) {}
}

export type BasketActions =
  | GetBasketAction
  | GetBasketSuccessAction
  | SaveProductToBasketAction
  | DeleteBasketAction
  | DeleteBasketSuccessAction
  | DeleteProductFromBasketAction
  | DeleteProductFromBasketSuccessAction
  | BasketClickedAction
  | SaveProductToBasketSuccessAction;
