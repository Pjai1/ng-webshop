import { basketFragment } from './../fragments/basket-fragment.graphql';
import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBasket } from '../resolvers.graphql';
import { Product } from 'src/graphql-types';

@Injectable({
  providedIn: 'root',
})
export class AddItemToBasketMutation extends Mutation {
  document = gql`
    mutation addItemToBasket($key: ID!, $item: BasketItemInput!) {
      addItemToBasket(input: { checkoutID: $key, item: $item }) {
        basket {
          ...basketFields
        }
      }
    }
    ${basketFragment}
  `;

  public execute(product: Product, quantity: number): Observable<IBasket> {
    console.log(product);
    return this.mutate(
      {
        key: environment.basketKey,
        item: { quantity: quantity, productId: product.id },
      },
      { refetchQueries: ['basket'] },
    ).pipe(map((result) => result.data.basket));
  }
}
