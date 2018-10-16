import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';
import { Basket } from 'src/graphql-types';
import { ApolloQueryResult } from 'apollo-client';

interface IBasketQuery {
  basket: Basket;
}

@Injectable({
  providedIn: 'root',
})
export class GetBasketQuery extends Query<IBasketQuery> {
  document = gql`
  {
    basket(checkoutID: "${environment.basketKey}"){
      items {
        quantity
        product {id title price}
      }
    }
  }
  `;
}
