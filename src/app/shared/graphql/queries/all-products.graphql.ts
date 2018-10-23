import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { ProductConnection } from 'src/graphql-types';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { productFragment } from '../fragments/product-fragment.graphql';

const emptyProducts: ProductConnection = { pageInfo: { hasNextPage: false, hasPreviousPage: false }, edges: [] };

@Injectable({
  providedIn: 'root',
})
export class AllProductsQuery extends Query {
  document = gql`
    query allProducts($orderBy: String) {
      allProducts(orderBy: $orderBy) {
        edges {
          node {
            ...productFields
          }
        }
      }
    }
    ${productFragment}
  `;

  public execute(orderBy: string = ''): Observable<ProductConnection> {
    return this.watch({ orderBy: orderBy }).valueChanges.pipe(
      startWith({
        data: { allProducts: emptyProducts },
      }),
      map((result) => result.data.allProducts || emptyProducts),
    );
  }
}
