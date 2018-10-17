import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';
import { basketFragment } from '../fragments/basket-fragment.graphql';
import { startWith, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBasket } from '../resolvers.graphql';

const emptyBasket: IBasket = { checkoutID: environment.basketKey, items: [], totalPrice: 0 };

@Injectable({
  providedIn: 'root',
})
export class GetBasketQuery extends Query<Query> {
  document = gql`
    query basket($checkoutID: String!) {
      basket(checkoutID: $checkoutID) {
        ...basketFields
        totalPrice @client
      }
    }
    ${basketFragment}
  `;

  public execute(): Observable<IBasket> {
    return this.watch({
      checkoutID: environment.basketKey,
    }).valueChanges.pipe(
      startWith({ data: { basket: emptyBasket } }),
      tap((result) => console.log(result)),
      map((result) => {
        return result.data.basket || emptyBasket;
      }),
    );
  }
}
