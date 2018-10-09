import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { GET_PRODUCTS } from './product.actions';

@Injectable()
export class ProductEffects {
  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType(GET_PRODUCTS),
    mergeMap((action) => {
      console.log(action);
      return this.productService
        .getProducts()
        .pipe(map((products: Product[]) => ({ type: 'GET_PRODUCTS_SUCCESS', payload: products })));
    }),
  );

  constructor(private productService: ProductService, private actions$: Actions) {}
}
