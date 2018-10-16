import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class AllProductsQuery extends Query {
  document = gql`
    {
      allProducts {
        edges {
          node {
            id
            sku
            title
            price
            basePrice
            stocked
            image
            desc
          }
        }
      }
    }
  `;
}
