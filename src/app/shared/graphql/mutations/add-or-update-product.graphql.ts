import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { IProduct } from '../../selectors/product.selector';
import { FormGroup } from '@angular/forms';
import { productFragment } from '../fragments/product-fragment.graphql';
import { Observable } from 'rxjs';
import { Product, AddOrUpdateProductPayload } from 'src/graphql-types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddOrUpdateProductMutation extends Mutation<AddOrUpdateProductPayload> {
  document = gql`
    mutation addOrUpdateProduct($product: ProductInput!) {
      addOrUpdateProduct(input: $product) {
        product {
          ...productFields
        }
      }
    }
    ${productFragment}
  `;

  public execute(product: FormGroup): Observable<Product> {
    console.log(product);
    return this.mutate(
      {
        product: product,
      },
      { refetchQueries: ['allProducts'] },
    ).pipe(map((result) => result.data.product));
  }
}
