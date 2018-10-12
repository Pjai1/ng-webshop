import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { SortEvent } from '../../shared/components/sortableColumn/sort.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query } from 'src/graphql-types';
import { CreateProducts } from 'src/app/shared/selectors/product.selector';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<Query>({
        query: gql`
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
                }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        this.products = CreateProducts(result.data.allProducts);
      });
  }

  deleteProduct(product: Product): void {
    this.apollo
      .mutate({
        mutation: gql`mutation {
        deleteProduct(id: ${product.id}) {
          product {
            id
          }
        }`,
      })
      .subscribe((result) => this.products.filter((item) => item.id !== product.id));
  }

  onSorted(event: SortEvent): void {}
}
