import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { basketFragment } from '../fragments/basket-fragment.graphql';
import { Observable } from 'rxjs';
import { Basket, ClearBasketPayload } from 'src/graphql-types';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClearBasketMutation extends Mutation<ClearBasketPayload> {
  document = gql`
    mutation clearBasket($checkoutID: ID!) {
      clearBasket(checkoutID: $checkoutID) {
        basket {
          ...basketFields
        }
      }
    }
    ${basketFragment}
  `;

  public execute(): Observable<Basket> {
    return this.mutate(
      {
        checkoutID: environment.basketKey,
      },
      { refetchQueries: ['basket'] },
    ).pipe(map((result) => result.data.clearBasket.basket));
  }
}
