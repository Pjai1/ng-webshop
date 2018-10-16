import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ClearBasketMutation extends Mutation {
  document = gql`
    mutation clearBasket($key: ID!) {
      clearBasket(checkoutID: $key) {
        basket {
          items {
            quantity
            product {
              id
              title
            }
          }
        }
      }
    }
  `;
}
