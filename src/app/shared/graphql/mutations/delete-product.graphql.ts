import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DeleteProductMutation extends Mutation {
  document = gql`
    mutation deleteProduct($key: Int!) {
      deleteProduct(id: $key) {
        product {
          id
        }
      }
    }
  `;
}
