import gql from 'graphql-tag';

export const productFragment = gql`
  fragment productFields on Product {
    id
    sku
    image
    title
    price
    basePrice
    stocked
  }
`;
