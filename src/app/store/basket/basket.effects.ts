import { Injectable } from '@angular/core';
import { BasketService } from 'src/app/shared/services/basket.service';
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
import { map, mergeMap, tap } from 'rxjs/operators';
import { Basket } from 'src/app/shared/models/basket.model';

@Injectable()
export class BasketEffects {
  @Effect()
  getBasket$: Observable<Action> = this.actions$.pipe(
    ofType(BasketTypes.GET_BASKET),
    mergeMap((action: GetBasketAction) => {
      return this.basketService
        .getBasket()
        .pipe(map((basket: Basket) => ({ type: BasketTypes.GET_BASKET_SUCCESS, payload: basket.items })));
    }),
  );

  @Effect()
  addProductToBasket$: Observable<Action> = this.actions$.pipe(
    ofType(BasketTypes.SAVE_PRODUCT_TO_BASKET),
    mergeMap((action: SaveProductToBasketAction) => {
      return this.basketService
        .addToBasket(action.payload.id, action.payload.quantity)
        .pipe(map((basket: Basket) => ({ type: BasketTypes.SAVE_PRODUCT_TO_BASKET_SUCCESS, payload: basket.items })));
    }),
  );

  @Effect()
  deleteBasket$: Observable<Action> = this.actions$.pipe(
    ofType(BasketTypes.DELETE_BASKET),
    mergeMap((action: DeleteBasketAction) => {
      return this.basketService
        .deleteBasket()
        .pipe(map((basket: Basket) => ({ type: BasketTypes.DELETE_BASKET_SUCCESS, payload: basket.items })));
    }),
  );

  deleteProductFromBasket$: Observable<Action> = this.actions$.pipe(
    tap((val) => console.log('wow', val)),
    ofType(BasketTypes.DELETE_PRODUCT_FROM_BASKET),
    mergeMap((action: DeleteProductFromBasketAction) => {
      return this.basketService
        .deleteProductFromBasket(action.payload)
        .pipe(
          map((basket: Basket) => ({ type: BasketTypes.DELETE_PRODUCT_FROM_BASKET_SUCCESS, payload: basket.items })),
        );
    }),
  );
  constructor(private basketService: BasketService, private actions$: Actions) {}
}
