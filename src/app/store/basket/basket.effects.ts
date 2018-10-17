import { Injectable } from '@angular/core';
import { BasketService, IBasketDto } from '@app/shared/services/basket.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  BasketTypes,
  GetBasketAction,
  DeleteBasketAction,
  SaveProductToBasketAction,
  DeleteProductFromBasketAction,
} from './basket.actions';

import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class BasketEffects {
  @Effect()
  getBasket$: Observable<Action> = this.actions$.pipe(
    ofType(BasketTypes.GET_BASKET),
    mergeMap((action: GetBasketAction) => {
      return this.basketService
        .getBasket()
        .pipe(map((basket: IBasketDto) => ({ type: BasketTypes.GET_BASKET_SUCCESS, payload: basket })));
    }),
  );

  @Effect()
  addProductToBasket$: Observable<Action> = this.actions$.pipe(
    ofType(BasketTypes.SAVE_PRODUCT_TO_BASKET),
    mergeMap((action: SaveProductToBasketAction) => {
      return this.basketService
        .addToBasket(action.payload.id, action.payload.quantity)
        .pipe(map((basket: IBasketDto) => ({ type: BasketTypes.SAVE_PRODUCT_TO_BASKET_SUCCESS, payload: basket })));
    }),
  );

  @Effect()
  deleteBasket$: Observable<Action> = this.actions$.pipe(
    ofType(BasketTypes.DELETE_BASKET),
    mergeMap((action: DeleteBasketAction) => {
      return this.basketService
        .deleteBasket()
        .pipe(map((basket: IBasketDto) => ({ type: BasketTypes.DELETE_BASKET_SUCCESS, payload: basket })));
    }),
  );

  @Effect()
  deleteProductFromBasket$: Observable<Action> = this.actions$.pipe(
    ofType(BasketTypes.DELETE_PRODUCT_FROM_BASKET),
    mergeMap((action: DeleteProductFromBasketAction) => {
      return this.basketService.deleteProductFromBasket(action.payload).pipe(
        map((basket: IBasketDto) => ({
          type: BasketTypes.DELETE_PRODUCT_FROM_BASKET_SUCCESS,
          payload: basket,
        })),
      );
    }),
  );
  constructor(private basketService: BasketService, private actions$: Actions) {}
}
