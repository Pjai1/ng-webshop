import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class RemoveItemFromBasketMutation extends Mutation {
  document = gql`
    mutation removeItemFromBasket($key: ID!, $productId: Int!) {
      removeItemFromBasket(input: { checkoutID: $key, productId: $item }) {
        basket {
          checkoutID
          items {
            id
            product {
              id
            }
            quantity
          }
        }
      }
    }
  `;
}
