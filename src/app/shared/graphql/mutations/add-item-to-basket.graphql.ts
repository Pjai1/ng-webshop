import { basketFragment } from './../fragments/basket-fragment.graphql';
import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBasket } from '../resolvers.graphql';
import { Product } from 'src/graphql-types';

export interface IProduct extends Product {
  discount: number;
}

@Injectable({
  providedIn: 'root',
})
export class AddItemToBasketMutation extends Mutation {
  document = gql`
    mutation addItemToBasket($checkoutID: ID!, $item: BasketItemInput!) {
      addItemToBasket(input: { checkoutID: $checkoutID, item: $item }) {
        basket {
          ...basketFields
        }
      }
    }
    ${basketFragment}
  `;

  public execute(product: IProduct, quantity: number): Observable<IBasket> {
    return this.mutate(
      {
        checkoutID: environment.basketKey,
        item: { quantity: quantity, productId: product.id },
      },
      { refetchQueries: ['basket'] },
    ).pipe(map((result) => result.data.basket));
  }
}
