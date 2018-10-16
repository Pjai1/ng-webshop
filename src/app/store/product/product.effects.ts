import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import * as fromBasket from '../../store/basket/basket.reducers';
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GetProductAction,
  GetProductsAction,
  SAVE_PRODUCT,
  SaveProductAction,
  DELETE_PRODUCT,
  DeleteProductSuccessAction,
  SaveProductSuccessAction,
  SaveProductToItemsAction,
} from './product.actions';
import { ServiceBus } from 'src/app/serviceBus';
import { DeleteProductFromBasketAction } from '../basket/basket.actions';

@Injectable()
export class ProductEffects {
  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType(GET_PRODUCTS),
    mergeMap((action: GetProductsAction) => {
      return this.productService
        .getProducts(action.payload)
        .pipe(map((products: Product[]) => ({ type: GET_PRODUCTS_SUCCESS, payload: products })));
    }),
  );

  @Effect()
  getProduct$: Observable<Action> = this.actions$.pipe(
    ofType(GET_PRODUCT),
    mergeMap((action: GetProductAction) => {
      console.log(action);
      return this.productService
        .getProduct(action.payload)
        .pipe(map((product: Product) => ({ type: GET_PRODUCT_SUCCESS, payload: product })));
    }),
  );

  @Effect()
  saveProduct$: Observable<Action> = this.actions$.pipe(
    ofType(SAVE_PRODUCT),
    mergeMap((action: SaveProductAction) => {
      console.log(action);
      return this.productService
        .saveProduct(action.payload)
        .pipe(switchMap((product) => [new SaveProductSuccessAction(product), new SaveProductToItemsAction(product)]));
    }),
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(DELETE_PRODUCT),
    mergeMap((action: SaveProductAction) => {
      console.log(action);
      return this.productService.deleteProduct(action.payload).pipe(
        tap((product) => this.store.dispatch(new DeleteProductFromBasketAction(<any>product))),
        switchMap((product) => [new DeleteProductSuccessAction(product)]),
      );
    }),
  );

  constructor(
    private productService: ProductService,
    private actions$: Actions,
    private store: Store<fromBasket.State>,
  ) {}
}
