import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { productFragment } from '../fragments/product-fragment.graphql';
import { Product } from 'src/graphql-types';

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
