import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { IProduct } from '../../selectors/product.selector';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddOrUpdateProductMutation extends Mutation {
  document = gql`
    mutation addOrUpdateProduct($product: ProductInput!) {
      addOrUpdateProduct(input: $product) {
        product {
          id
          title
          price
          sku
          image
          desc
          stocked
          basePrice
        }
      }
    }
  `;

  mutateProduct(product: FormGroup) {
    console.log(product);
    return this.mutate({
      product,
    });
  }
}
