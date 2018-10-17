import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { productFragment } from '../fragments/product-fragment.graphql';
import { Observable } from 'rxjs';
import { Product, DeleteProductPayload } from 'src/graphql-types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeleteProductMutation extends Mutation<DeleteProductPayload> {
  document = gql`
    mutation deleteProduct($productId: Int!) {
      deleteProduct(id: $productId) {
        product {
          ...productFields
        }
      }
    }
    ${productFragment}
  `;

  public execute(productId: number): Observable<Product> {
    return this.mutate(
      {
        productId: productId,
      },
      { refetchQueries: ['allProducts', 'basket'] },
    ).pipe(map((result) => result.data.deleteProduct.product));
  }
}
