import gql from 'graphql-tag';
import { productFragment } from './product-fragment.graphql';

export const basketFragment = gql`
  fragment basketFields on Basket {
    checkoutID
    items {
      product {
        ...productFields
      }
      quantity
      totalPrice @client
    }
  }
  ${productFragment}
`;
