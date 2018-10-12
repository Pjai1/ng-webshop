import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CreateProducts } from '../../shared/selectors/product.selector';
import { Query } from 'src/graphql-types';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  products: any;
  products$: Observable<Product[]>;
  subscription?: Subscription;

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
                  image
                  desc
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
}
