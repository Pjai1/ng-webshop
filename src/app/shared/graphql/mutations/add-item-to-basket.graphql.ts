import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class AddItemToBasketMutation extends Mutation {
  document = gql`
    mutation addItemToBasket($key: ID!, $item: BasketItemInput!) {
      addItemToBasket(input: {checkoutID: $key, item: $item}) {
        basket {
          checkoutID
          items {
            product {
              id
            }
          }
        }
      }
    }
  `;
}
