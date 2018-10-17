import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';
import { Basket, Product } from 'src/graphql-types';
import { ApolloQueryResult } from 'apollo-client';
import { productFragment } from '../fragments/product-fragment.graphql';

interface IProductQuery {
  product: Product;
}

@Injectable({
  providedIn: 'root',
})
export class GetProductQuery extends Query<IProductQuery> {
  document = gql`
    query product($id: Int) {
      product(id: $id) {
        ...productFields
      }
    }
    ${productFragment}
  `;
}
