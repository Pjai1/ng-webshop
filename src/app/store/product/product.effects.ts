import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GetProductAction,
  GetProductsAction,
  SAVE_PRODUCT,
  SAVE_PRODUCT_SUCCESS,
  SaveProductAction,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
} from './product.actions';

@Injectable()
export class ProductEffects {
  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType(GET_PRODUCTS),
    mergeMap((action: GetProductsAction) => {
      return this.productService
        .getProducts()
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
        .pipe(map((product: Product) => ({ type: SAVE_PRODUCT_SUCCESS, payload: product })));
    }),
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(DELETE_PRODUCT),
    mergeMap((action: SaveProductAction) => {
      console.log(action);
      return this.productService
        .deleteProduct(action.payload)
        .pipe(map((product: Product) => ({ type: DELETE_PRODUCT_SUCCESS, payload: product })));
    }),
  );

  constructor(private productService: ProductService, private actions$: Actions) {}
}
